"use client";

import { useState, useEffect } from "react";
import { fetchTest } from "../service/TestYouAIAPI";
import { Test, TestParams } from "@/types/TestYouAITypes";
import { useAuth } from "@/utils/auth";

type TestFormProps = {
  onTestGenerated?: (test: Test) => void;
};

export default function TestForm({ onTestGenerated }: TestFormProps) {
  const { validateToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState<TestParams>({
    theme: "",
    numberOfQuestions: 5,
    level: "",
    userId: undefined,
  });

  //   // 🔑 Buscar userId do token no localStorage
  //   useEffect(() => {
  //     const token = localStorage.getItem("token");
  //     if (token) {
  //       try {
  //         const payloadBase64 = token.split(".")[1]; // pega a parte payload do JWT
  //         const decoded: DecodedToken = JSON.parse(atob(payloadBase64));

  //         // no seu backend o `sub` é o id do usuário
  //         if (decoded?.sub) {
  //           setParams((prev) => ({
  //             ...prev,
  //             userId: Number(decoded.sub),
  //           }));
  //         }
  //       } catch (err) {
  //         console.error("Erro ao decodificar token:", err);
  //       }
  //     }
  //   }, []);

  // 🔑 Preenche userId do token válido
  useEffect(() => {
    const decoded = validateToken();
    if (decoded?.sub) {
      setParams((prev) => ({
        ...prev,
        userId: Number(decoded.sub),
      }));
    }
  }, [validateToken]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setParams((prev) => ({
      ...prev,
      [name]:
        name === "numberOfQuestions"
          ? value === ""
            ? 0
            : parseInt(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetchTest(params);

      if (onTestGenerated) {
        onTestGenerated(response);
      }
    } catch (error) {
      console.error("Erro ao buscar teste:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 mb-10 p-6 bg-white shadow-md rounded-lg border border-[#ff5202]"
    >
      <h2 className="text-2xl font-bold text-center text-[#ff5202] mb-4">
        Gerar Teste
      </h2>

      {/* Tema */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tema
        </label>
        <input
          type="text"
          name="theme"
          value={params.theme}
          onChange={handleChange}
          placeholder="Ex: Matemática, História..."
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#ff5202] focus:outline-none"
        />
      </div>

      {/* Número de questões */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Número de Questões
        </label>
        <input
          type="number"
          name="numberOfQuestions"
          min="1"
          max="50"
          value={params.numberOfQuestions}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#ff5202] focus:outline-none"
        />
      </div>

      {/* Nível */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nível
        </label>
        <select
          name="level"
          value={params.level}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#ff5202] focus:outline-none"
        >
          <option value="">Selecione um nível</option>
          <option value="easy">Fácil</option>
          <option value="medium">Médio</option>
          <option value="hard">Difícil</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#ff5202] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#e44902] transition-colors disabled:opacity-50"
      >
        {loading ? "Gerando..." : "Gerar Teste"}
      </button>
    </form>
  );
}
