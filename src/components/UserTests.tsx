"use client";

import { useEffect, useState } from "react";
import { fetchTestsByUser } from "@/service/TestYouAIAPI";
import { Test } from "@/types/TestYouAITypes";
import { useAuth } from "@/utils/auth";

export default function UserTests() {
  const { validateToken } = useAuth();
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = validateToken();
    if (!decoded) return;

    fetchTestsByUser(token)
      .then((data) => setTests(data))
      .catch((err) => console.error("Erro ao buscar testes:", err))
      .finally(() => setLoading(false));
  }, [validateToken]);

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
          className={`p-4 rounded-lg shadow-md border ${
            test.wasAnswered
              ? "bg-green-100 border-green-500"
              : "bg-white border-[#ff5202]"
          }`}
        >
          <h3 className="text-lg font-semibold text-[#ff5202] mb-2">
            {test.theme}
          </h3>
          <p className="text-gray-700">
            <span className="font-medium">Nível:</span> {test.level}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Questões:</span>{" "}
            {test.numberOfQuestions}
          </p>
          <p
            className={`mt-2 font-semibold ${
              test.wasAnswered ? "text-green-700" : "text-gray-500"
            }`}
          >
            {test.wasAnswered ? "✅ Já Respondido" : "⏳ Não Respondido"}
          </p>
        </div>
      ))}
    </div>
  );
}
