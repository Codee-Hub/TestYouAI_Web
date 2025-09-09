"use client";

import { useState, useEffect } from "react";
import { IconUser } from "@/assets/icons";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { fetchUserById, updateUser } from "@/service/TestYouAIAPI";
import { LoginRequest, ApiError } from "@/types/TestYouAITypes";
import Link from "next/link";
import { useAuth } from "@/utils/auth";
import { AxiosError } from "axios";

export function UserIcon() {
  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState<LoginRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { validateToken, getToken } = useAuth();

  const [tokenAvailable, setTokenAvailable] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    const decoded = validateToken();
    if (!decoded) {
      router.replace("/AuthPage");
      return;
    }

    setTokenAvailable(true);
    const userId = Number(decoded.sub);

    fetchUserById(userId, token)
      .then(setUser)
      .catch((err) => {
        console.error(err);
        toast.error("Erro ao buscar dados do usuário");
      })
      .finally(() => setLoading(false));
  }, [getToken, validateToken, router]);

  if (!tokenAvailable) {
    return (
      <Link href="/AuthPage" className="hover:scale-110 transition-transform">
        <IconUser size={70} color="#ff5202" />
      </Link>
    );
  }

  const handleUpdate = async () => {
    if (!user) return;
    const token = getToken();
    if (!token) return;

    try {
      const updatedUser = await updateUser(user.id!, user, token);
      setUser(updatedUser);
      toast.success("Usuário atualizado!");
      setShowPopup(false);
    } catch (error: unknown) {
      const err = error as AxiosError<ApiError>;
      toast.error(err.response?.data?.message || "Erro ao atualizar usuário");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/AuthPage");
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowPopup(!showPopup)}
        className="hover:scale-110 transition-transform"
      >
        <IconUser size={70} color="#ff5202" />
      </button>

      {showPopup && (
        <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg p-6 border border-[#ff5202] z-50">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <p className="text-gray-500">Carregando...</p>
            </div>
          ) : (
            user && (
              <>
                <h3 className="text-xl font-bold text-center text-[#ff5202] mb-4">
                  Atualizar Usuário
                </h3>

                {/* Nome */}
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={user.name || ""}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    placeholder="Nome"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#ff5202] focus:outline-none"
                  />
                </div>

                {/* Email */}
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={user.email || ""}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    placeholder="Email"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#ff5202] focus:outline-none"
                  />
                </div>

                {/* Telefone */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={user.phoneNumber || ""}
                    onChange={(e) =>
                      setUser({ ...user, phoneNumber: e.target.value })
                    }
                    placeholder="Telefone"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#ff5202] focus:outline-none"
                  />
                </div>

                <div className="flex justify-between gap-2">
                  <button
                    onClick={handleUpdate}
                    className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Update
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Log Out
                  </button>
                </div>
              </>
            )
          )}
        </div>
      )}
    </div>
  );
}
