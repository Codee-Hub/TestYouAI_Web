"use client";

import { LoginResponse, LoginRequest, ApiError } from "@/types/TestYouAITypes";
import { AxiosError } from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, registerUser } from "@/service/TestYouAIAPI";
import { ToastContainer, toast } from "react-toastify";

export default function AuthForm() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<Partial<LoginRequest>>({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      try {
        const request: LoginRequest = {
          email: formData.email!,
          password: formData.password!,
        };

        const response: LoginResponse = await login(request);

        localStorage.setItem("token", response.accessToken);

        toast.success("Login realizado com sucesso!");
        router.push("/UserPage");
      } catch (error: unknown) {
        const err = error as AxiosError<ApiError>;
        console.log(err.message);
        const backendMessage = err.response?.data?.message;

        if (
          backendMessage?.toLowerCase().includes("invalid") ||
          backendMessage?.toLowerCase().includes("senha")
        ) {
          toast.error("E-mail ou senha inválidos");
        } else {
          toast.error(backendMessage || "Erro ao realizar login");
        }
      }
    } else {
      try {
        const request: LoginRequest = {
          name: formData.name!,
          email: formData.email!,
          password: formData.password!,
          phoneNumber: formData.phoneNumber!,
        };

        await registerUser(request);

        toast.success("Usuário cadastrado com sucesso!");

        const loginResponse = await login({
          email: request.email,
          password: request.password,
        });
        localStorage.setItem("token", loginResponse.accessToken);
        router.push("/UserPage");
      } catch (error: unknown) {
        const err = error as AxiosError<ApiError>;
        const responseData = err.response?.data;

        toast.error(responseData?.message, { autoClose: 5000 });

        if (responseData?.fieldWithErrors) {
          toast.error(
            <div>
              {responseData.fieldWithErrors.map((fe) => (
                <div key={fe.field}>
                  <strong>{fe.field}:</strong> {fe.message}
                </div>
              ))}
            </div>,
            { autoClose: 5000 }
          );
          // toast.error(responseData.message);

          // const allErrors = responseData.fieldWithErrors
          //   .map((fe) => `${fe.field}: ${fe.message}`)
          //   .join("\n");

          // toast.error(allErrors, { autoClose: 5000 });
        }
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 px-6 py-8 bg-white shadow-md rounded-lg border border-[#ff5202]">
      <ToastContainer position="top-right" autoClose={3000} />

      <h1 className="text-3xl font-bold text-center text-[#ff5202] mb-6">
        {isLogin ? "Entrar" : "Criar Conta"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {!isLogin && (
          <>
            <div>
              <label className="block font-semibold mb-1 text-[#ff5202]">
                Nome
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-[#ff5202] px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#ff5202]"
                required={!isLogin}
                minLength={3}
                maxLength={20}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-[#ff5202]">
                Telefone
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full border border-[#ff5202] px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#ff5202]"
              />
            </div>
          </>
        )}

        <div>
          <label className="block font-semibold mb-1 text-[#ff5202]">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-[#ff5202] px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#ff5202]"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1 text-[#ff5202]">
            Senha
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-[#ff5202] px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#ff5202]"
            required
            minLength={3}
            maxLength={20}
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full text-lg font-semibold bg-[#ff5202] text-white px-6 py-3 rounded hover:bg-[#e04800] transition"
          >
            {isLogin ? "Entrar" : "Cadastrar"}
          </button>
        </div>
      </form>

      <p className="text-center text-gray-600 mt-6">
        {isLogin ? "Não tem uma conta?" : "Já possui uma conta?"}{" "}
        <span
          className="text-[#ff5202] font-semibold cursor-pointer hover:underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Cadastre-se" : "Entrar"}
        </span>
      </p>
    </div>
  );
}
