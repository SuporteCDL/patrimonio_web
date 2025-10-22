import logosis from '@/assets/logosistema.png'
import logocdl from '@/assets/logotipo.png'
import { useAuth } from '@/context/AuthContext'

export default function Header() {
  const user = useAuth()

  return (
    <div className="flex flex-col md:flex-row w-full md:h-20 h-26 p-4 justify-start items-center">
      <div className='flex flex-row justify-center md:justify-start items-center w-full md:w-60 gap-4'>
        <img src={logocdl} width={90} height={60} />
        <img src={logosis} width={50} height={40} />
      </div>
      <h3 className="text-center text-lg text-gray-700 font-bold">
        CONTROLE PATRIMONIAL - CDL
      </h3>
    </div>
  )
}

