import { api } from "@/lib/axios"
import ReactModal from 'react-modal'
import { IAtivo, ICentroCusto, ILocalidade, IMarca, ISubGrupo } from "@/lib/interface"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Link } from "react-router-dom"
import { AxiosRequestConfig } from "axios"
import FrmAtivo from "@/components/forms/frmativo"
import { Input } from "@/components/ui/input"

interface IAtivoJoin {
  id: number
  codigo: string
  status: string
  descricao: string
  aquisicao: string
  valor_aquisicao: string
  valor_atual: string
  depreciacao: string
  codsubgrupo: number
  codcentrocusto: number
  codmarca: number
  codlocalidade: number
  encontrado: boolean
  localidade: string
  subgrupo: string
  centrocusto: string
  marca: string
}
export default function Ativos() {
  const [localidades, setLocalidades] = useState<ILocalidade[]>([])
  const [centroCusto, setCentroCusto] = useState<ICentroCusto[]>([])
  const [subgrupos, setSubgrupos] = useState<any[]>([])
  const [marcas, setMarcas] = useState<IMarca[]>([])
  const [filtros, setFiltros] = useState({
    codlocalidade: "",
    codcentrocusto: "",
    codsubgrupo: "",
    codmarca: "",
    codigo: "",
  })
  const [ativos, setAtivos] = useState<IAtivoJoin[]>([])
  const [ativo, setAtivo] = useState<IAtivo>()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isEditting, setIsEditting] = useState(false)
  
  function handleOpenModal(tipo: string, objAtivo: IAtivo) {
    if (tipo==='add') {
      setIsOpenModal(true)
      setIsEditting(false)
    } 
    if (tipo==='edit') {
      setIsOpenModal(true)
      setIsEditting(true)
      setAtivo(objAtivo)
    }
  }

  async function listaAtivos() {
    const response = await api.get('ativos')
    setAtivos(response.data)
  }

  async function excluIAtivo(ativo: IAtivo) {
    const config: AxiosRequestConfig = {
      data: ativo,
    };
    if (window.confirm(`Tem certeza que deseja excluír ativo ${ativo.descricao}?`)) {
       await api.delete(`ativos/${ativo.id}`, config)
       alert(`Registro de ${ativo.descricao} excluido com sucesso!`)
       listaAtivos()
    }
  }

  async function carregarDados() {
    const [localidades, centrocusto, subgrupos, marcas] = await Promise.all([
      api.get("localidades"),
      api.get("centrocusto"),
      api.get("subgrupos"),
      api.get("marcas"),
    ])
    setLocalidades(localidades.data)
    setCentroCusto(centrocusto.data)
    setSubgrupos(subgrupos.data)
    setMarcas(marcas.data)
  }
  
  useEffect(() => {
    listaAtivos()
    carregarDados()
  }, [])

  // Buscar os ativos filtrados
  async function buscarAtivos() {
    if (!filtros.codlocalidade) {
      alert("Selecione uma localidade (obrigatório)")
      return
    }

    const params = new URLSearchParams(
      Object.entries(filtros).filter(([_, v]) => v !== "")
    )

    // const { data } = await api.get(`http://localhost:3333/ativos?${params}`)
    const { data } = await api.get(`ativos?${params}`)
    setAtivos(data)
  }

  return (
    <div>
      <div className="flex flex-row justify-between mb-2">
        <div className="flex flex-row gap-8">
          <h1 className="text-2xl font-bold mr-12">Ativos</h1>

          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <Select
                onValueChange={(v) => setFiltros({ ...filtros, codlocalidade: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Localidade" />
                </SelectTrigger>
                <SelectContent>
                  {localidades.map((loc) => (
                    <SelectItem key={loc.id} value={String(loc.id)}>
                      {loc.descricao}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                onValueChange={(v) => setFiltros({ ...filtros, codcentrocusto: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Centro de Custo" />
                </SelectTrigger>
                <SelectContent>
                  {centroCusto.map((cc) => (
                    <SelectItem key={cc.id} value={String(cc.id)}>
                      {cc.descricao}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                onValueChange={(v) => setFiltros({ ...filtros, codsubgrupo: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Subgrupo" />
                </SelectTrigger>
                <SelectContent>
                  {subgrupos.map((sg) => (
                    <SelectItem key={sg.id} value={String(sg.id)}>
                      {sg.grupo} - {sg.descricao}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                onValueChange={(v) => setFiltros({ ...filtros, codmarca: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Marca" />
                </SelectTrigger>
                <SelectContent>
                  {marcas.map((m) => (
                    <SelectItem key={m.id} value={String(m.id)}>
                      {m.descricao}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                placeholder="Código / texto"
                value={filtros.codigo}
                onChange={(e) => setFiltros({ ...filtros, codigo: e.target.value })}
              />
              <Button className="w-20" onClick={buscarAtivos}>Buscar</Button>
            </div>
          </div>

        </div>
        <Button variant="outline" onClick={ () => handleOpenModal('add', {} as IAtivo) }>+ Novo</Button>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="flex-1 bg-gray-100 border-b-2 border-gray-300">Localidade</TableHead>
              <TableHead className="flex-1 bg-gray-100 border-b-2 border-gray-300">Centro de Custo</TableHead>
              <TableHead className="flex-1 bg-gray-100 border-b-2 border-gray-300">Sub-Grupo</TableHead>
              <TableHead className="flex-1 bg-gray-100 border-b-2 border-gray-300">Codigo</TableHead>
              <TableHead className="flex-1 bg-gray-100 border-b-2 border-gray-300">Descrição</TableHead>
              <TableHead className="flex-1 bg-gray-100 border-b-2 border-gray-300">Marca</TableHead>
              <TableHead className="text-center w-32 bg-gray-100 border-b-2 border-gray-300" colSpan={2}>Opções</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ativos.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="w-28">{item.localidade}</TableCell>
                <TableCell className="w-44">{item.centrocusto}</TableCell>
                <TableCell className="w-48">{item.subgrupo}</TableCell>
                <TableCell className="w-10">{item.codigo}</TableCell>
                <TableCell className="flex-1">{item.descricao}</TableCell>
                <TableCell className="w-10">{item.marca}</TableCell>
                <TableCell className="w-14">
                  <Link to='#' onClick={() => handleOpenModal('edit', {
                    id: Number(item.id),
                    codigo: item.codigo,
                    status: item.status,
                    descricao: item.descricao,
                    aquisicao: item.aquisicao,
                    valor_aquisicao: item.valor_aquisicao,
                    valor_atual: item.valor_atual,
                    depreciacao: item.depreciacao,
                    codsubgrupo: Number(item.codsubgrupo),
                    codcentrocusto: Number(item.codcentrocusto),
                    codmarca: Number(item.codmarca),
                    encontrado: item.encontrado,
                    codlocalidade: Number(item.codlocalidade)
                  })}>
                    Alterar
                  </Link>
                </TableCell>
                <TableCell className="w-14"><Link to='#' onClick={()=>excluIAtivo(item)}>Excluir</Link></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <ReactModal 
          isOpen={isOpenModal}
          onAfterClose={listaAtivos}
          style={{
            overlay: {
              position: 'fixed',
              backgroundColor: 'rgba(255, 255, 255, 0.75)'
            },
            content: {
              position: 'absolute',
              top: '10%',
              left: '20%',
              right: '20%',
              bottom: '20%',
              border: '1px solid #ccc',
              background: '#fff',
              overflow: 'auto',
              width: 'auto',
              height: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              padding: '10px'
            }  
          }}
        >
          <FrmAtivo isModalOpen={setIsOpenModal} isEditting={isEditting} ativo={ativo} />
        </ReactModal>
      </div>
    </div>
  )
}