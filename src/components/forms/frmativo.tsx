import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { api } from '@/lib/axios';
import { IAtivo, ICentroCusto, ILocalidade, IMarca } from '@/lib/interface';
import { AxiosRequestConfig } from 'axios';
import { Label } from '../ui/label';
import { useEffect, useState } from 'react';

interface ISubGrupo {
  id: number;
  grupo: string;
  descricao: string;
}

const esquemaAtivo = z.object({
  codigo: z.string().min(1, 'Favor informar no mínimo 1 caracter'),
  status: z.string().min(3, 'Informe pelo menos 3 caracteres do Status'),
  descricao: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  aquisicao: z.string(),
  valor_aquisicao: z.string(),
  valor_atual: z.string(),
  depreciacao: z.string(),
  codsubgrupo: z.string(),
  codcentrocusto: z.string(),
  codmarca: z.string(),
  encontrado: z.boolean(),
  codlocalidade: z.string(),
})
type TAtivo = z.infer<typeof esquemaAtivo>
type Props = {  
  isModalOpen: (isOpen:boolean) => void 
  isEditting: boolean
  ativo: IAtivo | undefined
}

export default function FrmAtivo({ isModalOpen, isEditting, ativo }: Props) {
  const [statusEncontrado, setStatusEncontrado] = useState('Não')
  const [localidades, setLocalidades] = useState<ILocalidade[]>([])
  const [subGrupos, setSubGrupos] = useState<ISubGrupo[]>([])
  const [centroCusto, setCentroCusto] = useState<ICentroCusto[]>([])
  const [marcas, setMarcas] = useState<IMarca[]>([])
  const tituloPagina = isEditting ? 'Alteração no ' : 'Inclusão no '
  const form = useForm<TAtivo>({
    resolver: zodResolver(esquemaAtivo),
    defaultValues: {
      codigo: isEditting ? ativo?.codigo : '', 
      status: isEditting ? ativo?.status : '', 
      descricao: isEditting ? ativo?.descricao : '', 
      aquisicao: isEditting ? ativo?.aquisicao : '', 
      valor_aquisicao: isEditting ? ativo?.valor_aquisicao : '', 
      valor_atual: isEditting ? ativo?.valor_atual : '', 
      depreciacao: isEditting ? ativo?.depreciacao : '',
      codsubgrupo: isEditting ? String(ativo?.codsubgrupo) : '0',
      codcentrocusto: isEditting ? String(ativo?.codcentrocusto) : '0',
      codmarca: isEditting ? String(ativo?.codmarca) : '0',
      codlocalidade: isEditting ? String(ativo?.codlocalidade) : '0',
      encontrado: isEditting ? ativo?.encontrado : false,
    }
  })

  async function listaLocalidades() {
    const response = await api.get('localidades')
    if (response.data) {
      setLocalidades(response.data)
    }
  }

  async function listaSubGrupos() {
    const response = await api.get('subgrupos')
    if (response.data) {
      setSubGrupos(response.data)
    }
  }

  async function listaCentroCustos() {
    const response = await api.get('centrocusto')
    if (response.data) {
      setCentroCusto(response.data)
    }
  }

  async function listaMarcas() {
    const response = await api.get('marcas')
    if (response.data) {
      setMarcas(response.data)
    }
  }

  async function onSubmit(values: TAtivo) {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    // if (isEditting) {
    //   await api.put(`ativos/${ativo?.id}`, values, config)
    //   alert(`Ativo alterado com sucesso!`)
    //   isModalOpen(false)
      
    // } else {
    //   await api.post('ativos', values, config)
    //   alert(`Novo Ativo incluído com sucesso!`)
    //   isModalOpen(false)
    // }
  }
  
  useEffect(() => {
    listaLocalidades()
    listaSubGrupos()
    listaCentroCustos()
    listaMarcas()
  }, [])

  return (
    <div className='flex flex-col h-full items-start'>
      <h1 className='flex w-full h-10 font-bold text-lg justify-center items-center mb-4 bg-gray-200'>{tituloPagina} Cadastro de Ativos</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-between w-full h-full flex-1">
          
          <div className='flex md:flex-row flex-col gap-4 w-full'>
            <FormField
              control={form.control}
              name="codlocalidade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localidade:</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={String(field.value)}
                      defaultValue={String(field.value)}
                    >
                      <SelectTrigger className="w-96">
                        <SelectValue placeholder="Selecione a localidade" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          localidades.map(item => (
                            <SelectItem key={item.id} value={String(item.id)}>{item.descricao}</SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="codigo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Codigo:</FormLabel>
                  <FormControl>
                    <Input placeholder="999999" className='w-96' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex md:flex-row flex-col gap-4 w-full'>
            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descricao:</FormLabel>
                  <FormControl>
                    <Input placeholder="Descrição" className='w-96' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status:</FormLabel>
                  <FormControl>
                    <Input placeholder="Status" className='w-96' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex md:flex-row flex-col gap-4 w-full'>
            <FormField
              control={form.control}
              name="codsubgrupo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub-Grupo:</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={String(field.value)}
                      defaultValue={String(field.value)}
                    >
                      <SelectTrigger className="w-96">
                        <SelectValue placeholder="Selecione o Subgrupo" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          subGrupos.map(item => (
                            <SelectItem key={item.id} value={String(item.id)}>{item.grupo} - {item.descricao}</SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="codcentrocusto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Centro de Custo:</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={String(field.value)}
                      defaultValue={String(field.value)}
                    >
                      <SelectTrigger className="w-96">
                        <SelectValue placeholder="Selecione o Centro de Custo" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          centroCusto.map(item => (
                            <SelectItem key={item.id} value={String(item.id)}>{item.descricao}</SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex md:flex-row flex-col gap-4 w-full'>
            <FormField
              control={form.control}
              name="codmarca"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca:</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={String(field.value)}
                      defaultValue={String(field.value)}
                    >
                      <SelectTrigger className="w-96">
                        <SelectValue placeholder="Selecione a Marca" />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          marcas.map(item => (
                            <SelectItem key={item.id} value={String(item.id)}>{item.descricao}</SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Controller
              name="encontrado"
              control={form.control}
              render={({ field }) => (
                <div className='flex flex-col gap-4 w-full pt-2'>
                  <Label htmlFor="encontrado">
                    Encontrado? 
                  </Label>
                  <div className='flex flex-row gap-2'>
                    <Switch
                      id="encontrado"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      onClick={() => setStatusEncontrado(statusEncontrado==='Não' ? "Sim" : "Não")}
                    />
                    <span>{statusEncontrado}</span>
                  </div>
                </div>
              )}
            />
          </div>
          <div className='flex flex-row gap-4'>
            <Button type="submit">Salvar</Button>
            <Button className='bg-red-500' onClick={() => isModalOpen(false)}>Fechar</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}