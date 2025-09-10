"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchTestById } from "@/service/TestYouAIAPI";
import { Test } from "@/types/TestYouAITypes";
import { useAuth } from "@/utils/auth";
import TestView from "@/components/TestView";
import { Header } from "@/widgets/Header";
import { Footer } from "@/widgets/Footer";

export default function TestPage() {
  const { id } = useParams();
  const { validateToken } = useAuth();
  const router = useRouter();
  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/AuthPage");
      return;
    }

    const decoded = validateToken();
    if (!decoded) {
      router.replace("/AuthPage");
      return;
    }

    fetchTestById(Number(id), token)
      .then((data) => setTest(data))
      .catch((err) => {
        console.error("Erro ao carregar teste:", err);
        router.replace("/");
      })
      .finally(() => setLoading(false));
  }, [id, validateToken, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-500">Carregando teste...</p>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="p-6 text-center text-gray-600">Teste não encontrado.</div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-orange-50">
      {/* Header + Conteúdo */}
      <Header />
      <div className="flex-1 max-w-[1200px] mx-auto w-full">
        <TestView test={test} />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
