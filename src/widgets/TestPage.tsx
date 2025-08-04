'use client';

import { useState } from 'react';
import { fetchTest } from '../service/TestYouAIAPI';
import { Test, Question, Option, TestParams } from '@/types/TestYouAITypes';
import classNames from 'classnames';

export default function TestPage() {
  const [test, setTest] = useState<Test | null>(null);
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
      setTest(response);
    } catch (error) {
      console.error('Erro ao buscar teste:', error);
      setTest(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    if (!test || test.wasAnswered) return;

    const updatedQuestions = test.questionList.map((question, qIdx) => {
      if (qIdx !== questionIndex) return question;

      return {
        ...question,
        optionList: question.optionList.map((opt, oIdx) => ({
          ...opt,
          wasSelect: oIdx === optionIndex,
        })),
      };
    });

    setTest(prev => prev ? { ...prev, questionList: updatedQuestions } : prev);
  };

  const handleSubmitAnswers = () => {
    if (!test) return;

    const correctedTest = {
      ...test,
      wasAnswered: true,
      questionList: test.questionList.map(question => ({
        ...question,
        optionList: question.optionList.map(option => ({
          ...option,
          wasSelect: option.wasSelect, // já marcado
        })),
      })),
    };

    setTest(correctedTest);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block font-medium mb-1">Tema</label>
          <input
            type="text"
            name="theme"
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
            name="numberOfQuestions"
            value={params.numberOfQuestions}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            min={1}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Dificuldade</label>
          <select
            name="level"
            value={params.level}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Selecione a dificuldade</option>
            <option value="fácil">Fácil</option>
            <option value="médio">Médio</option>
            <option value="difícil">Difícil</option>
            <option value="impossível">Impossível</option>
            <option value="nível universitário">Nível Universitário</option>
          </select>
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

          {test.questionList.map((question: Question, qIdx: number) => (
            <div key={qIdx} className="mb-8 p-4 border rounded-lg shadow">
              <h2 className="font-semibold mb-2">Pergunta {qIdx + 1}:</h2>
              <p className="mb-3">{question.textQuestion}</p>

              <ul className="space-y-2">
                {question.optionList.map((option: Option, oIdx: number) => {
                  const isSelected = option.wasSelect;
                  const isCorrect = option.isCorrect;
                  const showResults = test.wasAnswered;

                  return (
                    <li
                      key={oIdx}
                      onClick={() => handleSelectOption(qIdx, oIdx)}
                      className={classNames(
                        'p-3 border rounded cursor-pointer transition',
                        {
                          'bg-green-100 border-green-500': showResults && isCorrect,
                          'bg-red-100 border-red-500': showResults && isSelected && !isCorrect,
                          'bg-gray-300 text-gray-900': isSelected && !showResults,
                          'hover:bg-gray-200': !showResults,
                          'cursor-not-allowed': showResults,
                        }
                      )}
                    >
                      <div className="font-medium">{option.textOption}</div>
                      {showResults && (
                        <p className="text-sm text-gray-600 mt-1">{option.justification}</p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div className="text-center mt-8">
            <button
              onClick={handleSubmitAnswers}
              disabled={test.wasAnswered}
              className={classNames(
                'px-6 py-3 text-white rounded transition',
                {
                  'bg-gray-400 cursor-not-allowed': test.wasAnswered,
                  'bg-green-600 hover:bg-green-700': !test.wasAnswered,
                }
              )}
            >
              {test.wasAnswered ? 'Teste Corrigido' : 'Corrigir Teste'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
