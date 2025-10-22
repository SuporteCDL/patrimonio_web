import { useAuth } from '@/context/AuthContext';
import { useForm } from 'react-hook-form'
import logotipo from '@/assets/logocdl.png'
import logosistema from '@/assets/logosistema.png'
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface ILogin {
  email: string;
  password: string;
}

export function Login() {
  const { login } = useAuth();
  const [erroSenha, setErroSenha] = useState('')
  const { register, handleSubmit, formState:{errors} } = useForm<ILogin>({
    defaultValues: { email: '', password: '' }
  })

  async function handleLogin(formData: ILogin) {
    const {email, password} = formData
    const response = await fetch('http://192.168.2.106:3333/usuarios/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (response.ok) {
      login(data.usuario); 
    } else {
      setErroSenha(data.message)
      alert(data.message);
    }
  }

  return (
    <div className="flex flex-col gap-6 flex-1 h-screen justify-center items-center">
      <div className='p-10 rounded-lg shadow-lg border-2 border-gray-200 flex flex-col justify-between'>
        <div className="flex flex-col justify-center items-center gap-3 mb-8">
          <div className="flex flex-row justify-center items-center gap-12">
            <img src={logotipo} alt="Controle Patrimonial" width={70} />
            <img src={logosistema} alt="Controle Patrimonial" width={80} />
          </div>
          <h3 className="font-bold text-cyan-800 text-xl">CONTROLE PATRIONIAL</h3>
        </div>
        
        <form className="flex flex-col flex-1 gap-4 mb-10 items-center" onSubmit={handleSubmit(handleLogin)}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className='font-semibold text-sm'>Email:</label>
            <input 
              {...register('email')}
              className="h-10 border-[1px] border-gray-400 rounded p-2 w-80"
              id="email" 
              name="email" 
              type="email" 
              placeholder="Email" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className='font-semibold text-sm'>Senha:</label>
            <input 
              {...register('password')}
              className="h-10 border-[1px] border-gray-400 rounded p-2 w-80"
              id="password" 
              name="password" 
              type="password" 
              placeholder='*****'
            />
            {erroSenha && <span className="text-red-400 italic">{erroSenha}</span>}
          </div>

          <div className="flex justify-center items-center gap-2 mt-2">
            <Link to='/signup' className="font-semibold hover:text-cyan-600">Não tenho cadastro</Link> | 
            <Link to='/forgot' className="font-semibold hover:text-cyan-600">Esqueci a senha</Link> 
          </div>
          
          <button 
            type="submit"
            className="flex flex-row justify-center items-center gap-4 mt-4 p-2 rounded text-white w-80 bg-cyan-600 hover:bg-cyan-500"
          >
            <FiLogIn size={20} />
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}