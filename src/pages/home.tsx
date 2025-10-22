import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme, VictoryTooltip } from "victory";

interface TAtivosCentroCustoQtd {
  x: string;
  y: number;
}

export default function Home() {
  const [ativosCentroCustoQtd, setAtivosCentroCustoQtd] = useState<TAtivosCentroCustoQtd[]>([])

  async function buscarQtdCentroCusto() {
    const response = await api.get('ativos/ativoscentrocustoqtd')
    if (response.data) {
      const dadosOrdenados = [...response.data].sort((b, a) => b.quantidade - a.quantidade);
      setAtivosCentroCustoQtd(dadosOrdenados)
    }
  }

  useEffect(() => {
    buscarQtdCentroCusto()
  }, [])

  return (
    <div>
      <div className="flex flex-col w-full mb-2">
        <span className="text-sm font-semibold my-2">Quantidade de ativos por Centro de Custo:</span>
        <div className="md:w-2/5 w-full border-[1px] border-blue-200">
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={10}
            padding={{ top: 20, bottom: 80, left: 50, right: 20 }}
          >
            <VictoryAxis
              tickFormat={(t) => t}
              style={{
                tickLabels: { fontSize: 5, padding:5, angle: 50, margin: 4, textAnchor: "start" },
              }}
            />
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => `${x}`}
              style={{
                tickLabels: { fontSize: 8 },
              }}

            />
            <VictoryBar
              data={ativosCentroCustoQtd}
              x="centrocusto"
              y="quantidade"
              labels={({ datum }) => `${datum.centrocusto}: ${datum.quantidade}`}
              labelComponent={<VictoryTooltip />}
              style={{
                data: { fill: "#46b3e5", width: 8 },
                labels: { fontSize: 5 },
              }}
            />
          </VictoryChart>
        </div>
      </div>
    </div>
  )
}