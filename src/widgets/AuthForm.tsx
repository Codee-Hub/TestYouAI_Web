'use client';

import { User } from '@/types/TestYouAITypes';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<Partial<User>>({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (isLogin) {
      try {
        const response = await fetch('http://localhost:8080/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        if (!response.ok) {
          throw new Error('Credenciais inválidas');
        }

        const data = await response.json();
        // data = { token: "...", expiresIn: 300 }

        // guardar token no localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('expiresIn', String(data.expiresIn));

        // redirecionar
        router.push('/UserPage');
      } catch (error: any) {
        setErrorMessage(error.message || 'Erro ao realizar login');
      }
    } else {
      console.log('Cadastro com:', formData);
      // TODO: call register API
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 px-6 py-8 bg-white shadow-md rounded-lg border border-[#ff5202]">
      <h1 className="text-3xl font-bold text-center text-[#ff5202] mb-6">
        {isLogin ? 'Entrar' : 'Criar Conta'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {!isLogin && (
          <>
            <div>
              <label className="block font-semibold mb-1 text-[#ff5202]">Nome</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-[#ff5202] px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#ff5202]"
                required={!isLogin}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-[#ff5202]">Telefone</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full border border-[#ff5202] px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#ff5202]"
              />
            </div>
          </>
        )}

        <div>
          <label className="block font-semibold mb-1 text-[#ff5202]">E-mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-[#ff5202] px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#ff5202]"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-[#ff5202]">Senha</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-[#ff5202] px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#ff5202]"
            required
          />
        </div>

        {errorMessage && (
          <p className="text-red-600 font-semibold text-center">{errorMessage}</p>
        )}

        <div className="text-center">
          <button
            type="submit"
            className="w-full text-lg font-semibold bg-[#ff5202] text-white px-6 py-3 rounded hover:bg-[#e04800] transition"
          >
            {isLogin ? 'Entrar' : 'Cadastrar'}
          </button>
        </div>
      </form>

      <p className="text-center text-gray-600 mt-6">
        {isLogin ? "Não tem uma conta?" : "Já possui uma conta?"}{' '}
        <span
          className="text-[#ff5202] font-semibold cursor-pointer hover:underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Cadastre-se' : 'Entrar'}
        </span>
      </p>
    </div>
  );
}
