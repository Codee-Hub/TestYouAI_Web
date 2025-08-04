'use client';

import { useState } from 'react';
import { fetchTest } from '../service/TestYouAIAPI';
import { Test, TestParams } from '@/types/TestYouAITypes';

export default function MyTestPage() {
  const [test, setTest] = useState<Test [] | null>(null);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState<TestParams>({
    theme: '',
    numberOfQuestions: 5,
    level: '',
  });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setParams(prev => ({
        ...prev,
        [name]: name === 'numberOfQuestions'
        ? value === '' ? 0 : parseInt(value)
        : value,
    }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetchTest(params);
      setTest(prev => prev ? [...prev, response] : [response]);
    } catch (error) {
      console.error('Erro ao buscar teste:', error);
      setTest(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block font-medium mb-1">Tema</label>
          <input
            type="text"
            name="tema"
            value={params.theme}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Número de Perguntas</label>
          <input
            type="number"
            name="numeroDePerguntas"
            value={params.numberOfQuestions}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            min={1}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Dificuldade</label>
          <input
            type="text"
            name="dificuldade"
            value={params.level}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Gerar Teste
        </button>
      </form>

      {loading && <p className="text-center">Carregando teste...</p>}
      {!loading && test && (
        <>  
          {test.map((test: Test, index: number) => (
            <div key={index} className="mb-8 p-4 border rounded-lg shadow">
                <h1 className="text-3xl font-bold mb-6">Tema {test.theme}</h1>
                <h1 className="text-3xl font-bold mb-6">Teste nível {test.level}</h1>
                <p className="mb-4 text-gray-600">Total de perguntas: {test.numberOfQuestions}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
