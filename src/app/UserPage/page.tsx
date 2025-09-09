"use client";

import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import MyTestPage from "@/widgets/MyTestsPage";

export default function UserPage() {
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
