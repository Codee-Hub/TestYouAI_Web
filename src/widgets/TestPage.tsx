'use client';

import { useState } from 'react';
import { fetchTest } from '../service/TestYouAIAPI';
import { Test, Question, Option, TestParams } from '@/types/TestYouAITypes';

export default function TestPage() {
  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState<TestParams>({
    tema: '',
    numeroDePerguntas: 5,
    dificuldade: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setParams(prev => ({
      ...prev,
      [name]: name === 'numeroDePerguntas' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetchTest(params);
      setTest(response);
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
            value={params.tema}
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
            value={params.numeroDePerguntas}
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
            value={params.dificuldade}
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
          <h1 className="text-3xl font-bold mb-6">Teste de nível {test.level}</h1>
          <p className="mb-4 text-gray-600">Número de perguntas: {test.numberOfQuestions}</p>

          {test.questionList.map((question: Question, index: number) => (
            <div key={index} className="mb-8 p-4 border rounded-lg shadow">
              <h2 className="font-semibold mb-2">Pergunta {index + 1}:</h2>
              <p className="mb-3">{question.textQuestion}</p>

              <ul className="space-y-2">
                {question.optionList.map((option: Option, i: number) => (
                  <li key={i} className="p-2 border rounded hover:bg-gray-50">
                    <span className="font-medium">{option.textOption}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
