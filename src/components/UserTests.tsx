"use client";

import { useEffect, useState } from "react";
import { fetchTestsByUser } from "@/service/TestYouAIAPI";
import { Test } from "@/types/TestYouAITypes";
import { useAuth } from "@/utils/auth";

type UserTestsProps = {
  tests: Test[];
  setTests: React.Dispatch<React.SetStateAction<Test[]>>;
};

export default function UserTests({ tests, setTests }: UserTestsProps) {
  const { validateToken } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = validateToken();
    if (!decoded) return;

    fetchTestsByUser(token)
      .then((data) => {
        setTests(data.reverse());
      })
      .catch((err) => console.error("Erro ao buscar testes:", err))
      .finally(() => setLoading(false));
  }, [validateToken, setTests]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500">Carregando testes...</p>
      </div>
    );
  }

  if (tests.length === 0) {
    return (
      <div className="p-6 text-center text-gray-600">
        Nenhum teste encontrado.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tests.map((test, index) => (
        <div
          key={index}
          className={`flex items-center justify-between p-4 rounded-lg shadow-md border transition-transform transform hover:scale-[1.02] hover:shadow-lg cursor-pointer ${
            test.wasAnswered
              ? "bg-green-100 border-green-500"
              : "bg-white border-[#ff5202]"
          }`}
        >
          {/* Tema */}
          <h3 className="text-lg font-bold text-[#ff5202] w-1/4 truncate">
            {test.theme}
          </h3>

          {/* Nível */}
          <p className="text-gray-700 w-1/4 text-center">
            <span className="font-bold text-[#ff5202]">Nível:</span>{" "}
            {test.level}
          </p>

          {/* Questões */}
          <p className="text-gray-700 w-1/4 text-center">
            <span className="font-bold text-[#ff5202]">Questões:</span>{" "}
            {test.numberOfQuestions}
          </p>

          {/* Status */}
          <p
            className={`w-1/4 text-center font-semibold ${
              test.wasAnswered ? "text-green-700" : "text-gray-500"
            }`}
          >
            {test.wasAnswered ? "✅ Respondido" : "⏳ Pendente"}
          </p>
        </div>
      ))}
    </div>
  );
}
