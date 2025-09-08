"use client";

import { useEffect, useState } from "react";
import { fetchUserById } from "@/service/TestYouAIAPI";
import { LoginRequest } from "@/types/TestYouAITypes";
import { ToastContainer, toast } from "react-toastify";

import { useAuth } from "@/utils/auth";

export default function UserPage() {
  const [user, setUser] = useState<LoginRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const { validateToken } = useAuth();

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
      })
      .finally(() => setLoading(false));
  }, [validateToken]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Carregando...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-md mx-auto mt-16 px-6 py-8 bg-white shadow-md rounded-lg border border-[#ff5202]">
      <ToastContainer position="top-right" autoClose={5000} />

      <h1 className="text-3xl font-bold text-center text-[#ff5202] mb-6">
        Dados do Usuário
      </h1>

      <div className="space-y-4">
        <p>
          <strong>Nome:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Telefone:</strong> {user.phoneNumber}
        </p>
      </div>
    </div>
  );
}
