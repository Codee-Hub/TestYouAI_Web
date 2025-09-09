"use client";

import { useState } from "react";
import { Test, Question, Option } from "@/types/TestYouAITypes";
import classNames from "classnames";

type TestViewProps = {
  test: Test;
};

export default function TestView({ test: initialTest }: TestViewProps) {
  const [test, setTest] = useState<Test>(initialTest);

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    if (test.wasAnswered) return;

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

    setTest({ ...test, questionList: updatedQuestions });
  };

  const handleSubmitAnswers = () => {
    const correctedTest = {
      ...test,
      wasAnswered: true,
    };
    setTest(correctedTest);
  };

  return (
    <div>
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#ff5202] mb-6">
          Teste de
          <span className="text-gray-700 font-normal text-4xl">
            {" "}
            {test.theme}{" "}
          </span>
        </h1>
        <div className="flex justify-around">
          <h2 className="text-2xl font-bold text-[#ff5202] mb-6">
            Nível :
            <span className="text-gray-700 font-normal text-2xl">
              {" "}
              {test.level}{" "}
            </span>
          </h2>
          <p className="text-2xl font-bold text-[#ff5202] mb-6">
            Número de perguntas:
            <span className="text-gray-700 font-normal text-2xl">
              {" "}
              {test.numberOfQuestions}{" "}
            </span>
          </p>
        </div>
      </div>

      {test.questionList.map((question: Question, qIdx: number) => (
        <div
          key={qIdx}
          className="mb-8 p-5 border border-[#ff5202] rounded-lg bg-white shadow-md"
        >
          <h2 className="font-semibold text-lg mb-2 text-[#ff5202]">
            Pergunta {qIdx + 1}:
          </h2>
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
                    "p-3 border rounded cursor-pointer transition",
                    {
                      "bg-green-100 border-green-500": showResults && isCorrect,
                      "bg-red-100 border-red-500":
                        showResults && isSelected && !isCorrect,
                      "bg-orange-200 border-orange-400 text-black":
                        isSelected && !showResults,
                      "hover:bg-orange-100": !showResults,
                      "cursor-not-allowed": showResults,
                    }
                  )}
                >
                  <div className="font-medium">{option.textOption}</div>
                  {showResults && (
                    <p className="text-sm text-gray-600 mt-1 italic">
                      {option.justification}
                    </p>
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
            "px-6 py-3 text-xl font-semibold text-white rounded transition",
            {
              "bg-gray-400 cursor-not-allowed": test.wasAnswered,
              "bg-[#00a35c] hover:bg-green-700": !test.wasAnswered,
            }
          )}
        >
          {test.wasAnswered ? "Teste Corrigido" : "Corrigir Teste"}
        </button>
      </div>
    </div>
  );
}
