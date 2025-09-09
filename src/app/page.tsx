import { Header } from "@/widgets/Header";
import { Footer } from "@/widgets/Footer";
import TestPage from "@/widgets/TestPage";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-orange-50">
      {/* Header + Conteúdo */}
      <Header />
      <div className="flex-1 max-w-[1200px] mx-auto w-full">
        <TestPage />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
