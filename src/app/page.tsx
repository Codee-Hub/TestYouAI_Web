import MyTestPage from "@/widgets/MyTestsPage"
import TestPage from "@/widgets/TestPage"
import { Header } from "@/widgets/Header";


export default function Home() {
  return (
  <div>
    <div className="max-w-[1200px] mx-auto  bg-orange-50">
      <Header/>
      <TestPage/>
    </div>
  </div>
  );
}
