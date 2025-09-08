"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "@/types/TestYouAITypes";

export function useAuth() {
  const router = useRouter();

  const getToken = (): string | null => localStorage.getItem("token");

  const validateToken = (): DecodedToken | null => {
    const token = getToken();

    if (!token) {
      toast.error("Usuário não autenticado", { autoClose: 5000 });
      router.replace("/login");
      return null;
    }

    if (token.split(".").length !== 3) {
      toast.error("Token inválido", { autoClose: 5000 });
      router.replace("/login");
      return null;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded;
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      toast.error("Token inválido", { autoClose: 5000 });
      router.replace("/login");
      return null;
    }
  };

  return { getToken, validateToken };
}
