import { Footer } from "@/widgets/Footer";
import { Header } from "@/widgets/Header";
import AuthForm from "@/widgets/AuthForm";



export default function AuthPage() {
  return (

        <div className="flex flex-col min-h-screen ">
          {/* Header + Conteúdo */}
          <Header />
          <div className="flex-1 max-w-[1200px] mx-auto w-full mb-15">
            <AuthForm/>
          </div>
    
          {/* Footer */}
          <Footer />
        </div>
  );
}

