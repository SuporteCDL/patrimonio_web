import { api } from "@/lib/axios"
import ReactModal from 'react-modal'
import { ILocalidade } from "@/lib/interface"
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

import { Link } from "react-router-dom"
import { AxiosRequestConfig } from "axios"
import FrmLocalidade from "@/components/forms/frmlocalidade"

export default function Localidades() {
  const [localidades, setLocalidades] = useState<ILocalidade[]>([])
  const [isOpenAddNew, setIsOpenAddNew] = useState(false)

  async function listaLocalidades() {
    const response = await api.get('localidades')
    setLocalidades(response.data)
  }

  async function excluiLocalidade(localidade: ILocalidade) {
    const config: AxiosRequestConfig = {
      data: localidade,
    };
    if (window.confirm("Tem certeza que deseja excluír este registro?")) {
       await api.delete('localidades', config)
       alert(`Registro de ${localidade.descricao} excluido com sucesso!`)
       listaLocalidades()
    }
  }

  async function incluiLocalidade() {
    const novaLocalidade: ILocalidade = { id: 456, descricao: 'New Location' };
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    await api.post('localidades', novaLocalidade, config)
    alert(`Nova Localidade incluída com sucesso!`)
    listaLocalidades()
  }

  useEffect(() => {
    listaLocalidades()
  }, [])

  return (
    <div>
      <div className="flex flex-row justify-between mb-2">
        <h1 className="text-2xl font-bold">Localidades</h1>
        <Button variant="outline" onClick={() => setIsOpenAddNew(true)}>+ Novo</Button>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead className="flex-1">Descrição</TableHead>
              <TableHead className="text-center w-32" colSpan={2}>Opções</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {localidades.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.id}</TableCell>
                <TableCell className="flex-1">{item.descricao}</TableCell>
                <TableCell className="w-14">Alterar</TableCell>
                <TableCell className="w-14"><Link to='#' onClick={()=>excluiLocalidade(item)}>Excluir</Link></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <ReactModal 
          isOpen={isOpenAddNew}
          onAfterClose={listaLocalidades}
          style={{
            overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(255, 255, 255, 0.75)'
            },
            content: {
              position: 'absolute',
              top: '40px',
              left: '40px',
              right: '40px',
              bottom: '40px',
              border: '1px solid #ccc',
              background: '#fff',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
              borderRadius: '4px',
              outline: 'none',
              padding: '20px'
            }  
          }}
        >
          <FrmLocalidade isModalOpen={setIsOpenAddNew} />
        </ReactModal>
      </div>
    </div>
  )
}