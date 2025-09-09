"use client";

import { useEffect, useState } from "react";
import { fetchUserById } from "@/service/TestYouAIAPI";
import { LoginRequest } from "@/types/TestYouAITypes";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { useAuth } from "@/utils/auth";
import { Footer } from "@/widgets/Footer";
import MyTestPage from "@/widgets/MyTestsPage";
import { Header } from "@/widgets/Header";

export default function UserPage() {
  const [user, setUser] = useState<LoginRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const { validateToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const decoded = validateToken();
    if (!decoded) return;

    const userId = Number(decoded.sub);
    const token = localStorage.getItem("token")!;

    fetchUserById(userId, token)
      .then((data) => setUser(data))
      .catch((err) => {
        console.error(err);
        toast.error("Erro ao buscar os dados do usuário", {
          autoClose: 5000,
        });
        router.replace("/AuthPage");
      })
      .finally(() => setLoading(false));
  }, [validateToken, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen bg-orange-50">
      {/* Header + Conteúdo */}
      <Header />
      <div className="flex-1 max-w-[1200px] mx-auto w-full">
        <MyTestPage />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
