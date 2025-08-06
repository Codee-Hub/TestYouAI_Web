import MyTestPage from "@/widgets/MyTestsPage"
import TestPage from "@/widgets/TestPage"
import { Header } from "@/widgets/Header";
import { Footer } from "@/widgets/Footer";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-orange-50">
      {/* Header + Conteúdo */}
      <div className="flex-1 max-w-[1200px] mx-auto w-full">
        <Header />
        <TestPage />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

