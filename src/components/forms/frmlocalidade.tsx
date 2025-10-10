import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { api } from '@/lib/axios';
import { ILocalidade } from '@/lib/interface';
import { AxiosRequestConfig } from 'axios';

const esquemaLocalidade = z.object({
  descricao: z.string().min(3, 'É necessário informar no mínimo 3 caracteres'),
})
type TLocalidade = z.infer<typeof esquemaLocalidade>
type Props = {  isModalOpen: (isOpen:boolean) => void }

export default function FrmLocalidade({isModalOpen}: Props) {
  const form = useForm<TLocalidade>({
    resolver: zodResolver(esquemaLocalidade)
  })

  async function onSubmit(values: TLocalidade) {
    // console.log(values)
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    await api.post('localidades', values, config)
    alert(`Nova Localidade incluída com sucesso!`)
  }
  
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="descricao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descricao</FormLabel>
                <FormControl>
                  <Input placeholder="Descrição" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex flex-row gap-4'>
            <Button type="submit">Salvar</Button>
            <Button onClick={() => isModalOpen(false)}>Fechar</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}