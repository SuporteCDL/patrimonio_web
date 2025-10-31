import { api } from "@/lib/axios";
import { Currency } from "lucide-react";
import { useEffect, useState } from "react";
import { 
  VictoryAxis, 
  VictoryBar, 
  VictoryChart, 
  VictoryLabel, 
  VictoryPie, 
  VictoryTheme, 
  VictoryTooltip 
} from "victory";

interface TGrafico {
  x: string;
  y: number;
}

interface TTotalAtivos {
  total: number;
}

type TAtivosPorGrupo = {
  grupo: string;
  total: number
}

type TAtivosConferidosBaixados = {
  encontrados: string;
  nao_encontrados: string;
  baixados: string;
}

type TAtivosValoresTotais = {
  total_aquisicao: number;
  total_depreciacao: number;
  total_atual: number
}

type TQuantidadeAtivosPorAnoAquisicao = {
  ano: number;
  total: number;
}

export default function Home() {
  const [totalAtivos, setTotalAtivos] = useState<TTotalAtivos>({ total: 0 })
  const [ativosPorGrupo, setAtivosPorGrupo] = useState<TAtivosPorGrupo[]>([])
  const [ativosConferidosBaixados, setAtivosConferidosBaixados] = useState<TGrafico[]>([])
  const [ativosValoresTotais, setAtivosValoresTotais] = useState<TAtivosValoresTotais>({
    total_aquisicao: 0,
    total_atual: 0,
    total_depreciacao: 0
  })
  const [quantidadeAtivosPorAnoAquisicao, setQuantidadeAtivosPorAnoAquisicao] = useState<TQuantidadeAtivosPorAnoAquisicao[]>([])
  const [ativosCentroCustoQtd, setAtivosCentroCustoQtd] = useState<TGrafico[]>([])

  async function TotalAtivos() {
    const response = await api.get('ativos/totalativos')
    if (response) {
      setTotalAtivos(response.data)
    }
  }

  async function AtivosPorGrupo() {
    const response = await api.get('ativos/ativosporgrupo')
    if (response) {
      setAtivosPorGrupo(response.data)
    }
  }

  async function AtivosConferidosBaixados() {
    const response = await api.get('ativos/ativosconferidosbaixados')
    if (response.data) {
      const dadosTransformados = Object.entries(response.data).map(
        ([x, y]) => ({
          x,
          y: Number(y),
        })
      );
      setAtivosConferidosBaixados(dadosTransformados)
    }
  }

  async function AtivosValoresTotais() {
    const response = await api.get('ativos/ativosvalorestotais')
    if (response) {
      setAtivosValoresTotais(response.data)
    }
  }

  async function QuantidadeAtivosPorAnoAquisicao() {
    const response = await api.get('ativos/quantidadeativosporanoaquisicao')
    if (response) {
      setQuantidadeAtivosPorAnoAquisicao(response.data)
    }
  }

  async function buscarQtdCentroCusto() {
    const response = await api.get('ativos/ativoscentrocustoqtd')
    if (response.data) {
      const dadosOrdenados = [...response.data].sort((b, a) => b.quantidade - a.quantidade);
      setAtivosCentroCustoQtd(dadosOrdenados)
    }
  }

  useEffect(() => {
    TotalAtivos()
    AtivosPorGrupo()
    AtivosConferidosBaixados()
    AtivosValoresTotais()
    QuantidadeAtivosPorAnoAquisicao()
    buscarQtdCentroCusto()
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center w-full h-12">
        <h3 className="text-lg text-gray-900 font-semibold">Patrimônio CDL Anápolis</h3>
        <select className="w-48 h-10 p-2 border-[1px] border-gray-500 rounded-md">
          <option>Todas</option>
        </select>
      </div>

      <div className="flex flex-col md:flex-row justify-evenly items-center gap-2 md:gap-4">
        <div className="flex flex-col justify-normal items-center w-full p-2 gap-2 border-[1px] border-gray-200 shadow-lg rounded-md">
          <span className="text-3xl">{totalAtivos.total}</span>
          <span className="text-sm">Total de ativos</span>
        </div>

        <div className="flex flex-col justify-normal items-center w-full p-2 gap-2 border-[1px] border-gray-200 shadow-lg rounded-md">
          <span className="text-3xl">
            {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(ativosValoresTotais?.total_aquisicao)}
          </span>
          <span className="text-sm">Valor total contabilizado</span>
        </div>

        <div className="flex flex-col justify-normal items-center w-full p-2 gap-2 border-[1px] border-gray-200 shadow-lg rounded-md">
          <span className="text-3xl">
            {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(ativosValoresTotais?.total_depreciacao)}
          </span>
          <span className="text-sm">Valor deprecidado total</span>
        </div>

        <div className="flex flex-col justify-normal items-center w-full p-2 gap-2 border-[1px] border-gray-200 shadow-lg rounded-md">
          <span className="text-3xl">
            {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(ativosValoresTotais.total_aquisicao - ativosValoresTotais.total_depreciacao)}
          </span>
          <span className="text-sm">Valor líquido total</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-evenly items-center gap-2 md:gap-4">
        <div className="flex flex-col gap-2 w-2/3 pt-4 pl-4 border-[1px] border-gray-200 shadow-lg rounded-md">
          <span className="font-semibold">Ativos por centro de custo</span>
            <div className="h-96">
              <VictoryChart
                theme={VictoryTheme.clean}
                domainPadding={{ x: 10 }}
                padding={{ top: 10, bottom: 40 }}
              >
                <VictoryAxis
                  tickFormat={(t) => t}
                  style={{
                    tickLabels: { fontSize: 8, padding: 1 },
                  }}
                />
                <VictoryBar
                  horizontal
                  data={ativosCentroCustoQtd}
                  x="centrocusto"
                  y="quantidade"
                  labels={({ datum }) => `${datum.centrocusto}: ${datum.quantidade}`}
                  labelComponent={<VictoryTooltip />}
                  style={{
                    data: { fill: "#46b3e5", width: 5 },
                    labels: { fontSize: 10 },
                  }}
                />
              </VictoryChart>
            </div>
        </div>

        <div className="flex flex-col gap-2 w-1/3 p-2 border-[1px] border-gray-200 shadow-lg rounded-md">
          <span className="font-semibold">Distribuição de ativos por Grupo</span>
          <div className="w-full">
            <VictoryPie
              startAngle={90}
              endAngle={450}
              data={ativosPorGrupo}
              x="grupo"
              y="total"
              theme={VictoryTheme.clean}
              labels={({ datum }) => `${datum.grupo}: ${datum.total}`}
              labelComponent={<VictoryTooltip />}
              style={{
                data: { width: 8 },
                labels: { fontSize: 10 },
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-evenly items-center gap-2 md:gap-4">
        <div className="flex flex-col gap-2 w-2/3 p-2 border-[1px] border-gray-200 shadow-lg rounded-md">
          <span className="font-semibold">Evolução da quantidade de ativos por ano de aquisição</span>
          <div className="h-48">
            <VictoryChart
              theme={VictoryTheme.material}
              domainPadding={10}
              padding={{ top: 10, bottom: 80, left: -250, right: -100 }}
            >
              <VictoryAxis
                tickFormat={(t) => t}
                style={{
                  tickLabels: { fontSize: 20, padding:5, angle: 50, margin: 4, textAnchor: "start" },
                }}
              />
              <VictoryAxis
                dependentAxis
                tickFormat={(x) => `${x}`}
                style={{
                  tickLabels: { fontSize: 20 },
                }}
              />
              <VictoryBar
                data={quantidadeAtivosPorAnoAquisicao}
                x="ano"
                y="total"
                labels={({ datum }) => `${datum.ano}: ${datum.total}`}
                labelComponent={<VictoryTooltip />}
                style={{
                  data: { fill: "#46b3e5", width: 15 },
                  labels: { fontSize: 25 },
                }}
              />
            </VictoryChart>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-1/3 p-2 border-[1px] border-gray-200 shadow-lg rounded-md">
          <span className="font-semibold">Conferencia fisica vs cadastro</span>
          <div className="h-48">
            <VictoryChart
              theme={VictoryTheme.clean}
              domainPadding={{ x: 10 }}
              padding={{ top: 20, bottom: 50 }}
            >
              <VictoryAxis
                tickFormat={(t) => t}
                style={{
                  tickLabels: { fontSize: 20, padding: 10 },
                }}
              />
              <VictoryBar
                horizontal
                data={ativosConferidosBaixados}
                labels={({ datum }) => `${datum.x}: ${datum.y}`}
                labelComponent={<VictoryTooltip />}
                style={{
                  data: { width: 35 },
                  labels: { fontSize: 20 },
                }}
              />
            </VictoryChart>
          </div>
        </div>
      </div>
    </div>
  )
}