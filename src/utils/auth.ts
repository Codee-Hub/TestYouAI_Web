"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { DecodedToken } from "@/types/TestYouAITypes";
import { useCallback } from "react";
import { jwtDecode } from "jwt-decode"; 

export function useAuth() {
  const router = useRouter();

  const getToken = useCallback((): string | null => {
    return localStorage.getItem("token");
  }, []);

  const validateToken = useCallback((): DecodedToken | null => {
    const token = getToken();

    if (!token) {
      toast.error("Usuário não autenticado", { autoClose: 5000 });
      router.replace("/AuthPage");
      return null;
    }

    if (token.split(".").length !== 3) {
      toast.error("Token inválido", { autoClose: 5000 });
      router.replace("/AuthPage");
      return null;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded;
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      toast.error("Token inválido", { autoClose: 5000 });
      router.replace("/AuthPage");
      return null;
    }
  }, [getToken, router]);

  const validate = useCallback((): DecodedToken | null => {
    const token = getToken();

    if (!token) {
      return null;
    }

    if (token.split(".").length !== 3) {
      return null;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded;
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      return null;
    }
  }, [getToken]);

  return { getToken, validateToken, validate };
}
