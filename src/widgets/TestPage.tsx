'use client';

import { useEffect, useState } from 'react';
import { fetchTest } from '../service/TestYouAIAPI';
import { Test, Question, Option, TestParams } from '@/types/TestYouAITypes';

export default function TestPage() {
  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTest() {
      try {
        const params: TestParams = {
        tema: 'neurologia',
        numeroDePerguntas: 5,
        dificuldade: 'impossível, bacharel em medicina',
        };
        const response = await fetchTest(params);
        setTest(response);
      } catch (error) {
        console.error('Erro ao buscar teste:', error);
      } finally {
        setLoading(false);
      }
    }

    loadTest();
  }, []);

  if (loading) return <p className="text-center mt-10">Carregando teste...</p>;
  if (!test) return <p className="text-center mt-10 text-red-500">Falha ao carregar o teste.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Teste nível {test.level}</h1>
      <p className="mb-4 text-gray-600">Total de perguntas: {test.numberOfQuestions}</p>

      {test.questionList.map((question: Question, index: number) => (
        <div key={index} className="mb-8 p-4 border rounded-lg shadow">
          <h2 className="font-semibold mb-2">Pergunta {index + 1}:</h2>
          <p className="mb-3">{question.textQuestion}</p>

          <ul className="space-y-2">
            {question.optionList.map((option: Option, i: number) => (
              <li key={i} className="p-2 border rounded hover:bg-gray-50">
                <span className="font-medium">{option.textOption}</span>
                {/* Aqui você pode exibir a justificativa e indicar se é correta (para debug ou modo resposta) */}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
