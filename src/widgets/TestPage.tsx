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
          wasSelect: option.wasSelect,
        })),
      })),
    };

    setTest(correctedTest);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <form onSubmit={handleSubmit} className="space-y-6 mb-10 p-6 bg-white shadow-md rounded-lg border border-[#ff5202]">
        <h1 className="text-4xl font-bold text-[#ff5202] mb-2 text-center">Gerar Novo Teste</h1>

        <div>
          <label className="block font-semibold mb-1 text-[#ff5202]">Tema</label>
          <input
            type="text"
            name="theme"
            value={params.theme}
            onChange={handleChange}
            className="w-full border border-[#ff5202] px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#ff5202]"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-[#ff5202]">Número de Perguntas</label>
          <input
            type="number"
            name="numberOfQuestions"
            value={params.numberOfQuestions}
            onChange={handleChange}
            className="w-full border border-[#ff5202] px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#ff5202]"
            min={1}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-[#ff5202]">Dificuldade</label>
          <select
            name="level"
            value={params.level}
            onChange={handleChange}
            className="w-full border border-[#ff5202] px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#ff5202]"
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

        <div className="text-center">
        <button 
          type="submit"
          className="text-xl font-semibold bg-[#ff5202] text-white px-6 py-3 rounded hover:bg-[#e04800] transition"
        >
          Gerar Teste
        </button>
        </div>
      </form>

      {loading && <p className="text-center font-bold text-[#ff5202] text-2xl">Carregando teste...</p>}

      {!loading && test && (
        <>

          <div className="text-center">
            <h1 className="text-4xl font-bold text-[#ff5202] mb-6"> Teste de  
              <span className="text-gray-700 font-normal text-4xl "> {test.theme} </span>
            </h1>
            <div className='flex justify-around'>
              <h2 className="text-2xl font-bold text-[#ff5202] mb-6">Nível :
                              <span className="text-gray-700 font-normal text-2xl "> {test.level} </span>
              </h2>
              <p className="text-2xl font-bold text-[#ff5202] mb-6">Número de perguntas:
                              <span className="text-gray-700 font-normal text-2xl "> {test.numberOfQuestions} </span>
              </p>
            </div>
          </div>

          {test.questionList.map((question: Question, qIdx: number) => (
            <div key={qIdx} className="mb-8 p-5 border border-[#ff5202] rounded-lg bg-white shadow-md">
              <h2 className="font-semibold text-lg mb-2 text-[#ff5202]">Pergunta {qIdx + 1}:</h2>
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
                          'bg-orange-200 border-orange-400 text-black': isSelected && !showResults,
                          'hover:bg-orange-100': !showResults,
                          'cursor-not-allowed': showResults,
                        }
                      )}
                    >
                      <div className="font-medium">{option.textOption}</div>
                      {showResults && (
                        <p className="text-sm text-gray-600 mt-1 italic">{option.justification}</p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div className="text-center my-8">
            <button
              onClick={handleSubmitAnswers}
              disabled={test.wasAnswered}
              className={classNames(
                'px-6 py-3 text-xl font-semibold text-white  rounded transition',
                {
                  'bg-gray-400 cursor-not-allowed': test.wasAnswered,
                  'bg-[#00a35c] hover:bg-green-700': !test.wasAnswered,
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
