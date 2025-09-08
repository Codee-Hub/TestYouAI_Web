"use client";

import { useEffect, useState } from "react";
import { fetchUserById } from "@/service/TestYouAIAPI";
import { LoginRequest, DecodedToken } from "@/types/TestYouAITypes";
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode"; // Import correto

export default function UserPage() {
  const [user, setUser] = useState<LoginRequest | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Usuário não autenticado", { autoClose: 5000 });
      return;
    }

    // Verifica se o token tem três partes (JWT válido)
    if (token.split(".").length !== 3) {
      toast.error("Token inválido", { autoClose: 5000 });
      return;
    }

    // Decodifica o token
    let decoded: DecodedToken;
    try {
      decoded = jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      toast.error("Token inválido", { autoClose: 5000 });
      return;
    }

    const userId = decoded.sub;

    // Busca os dados do usuário
    fetchUserById(Number(userId), token)
      .then((data) => setUser(data))
      .catch((err) => {
        console.error(err);
        toast.error("Erro ao buscar os dados do usuário", { autoClose: 5000 });
      });
  }, []);

  if (!user) {
    return <div>Carregando...</div>;
  }

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
