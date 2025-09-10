"use client";

import { useState } from "react";
import TestForm from "@/components/TestForm";
import UserTests from "@/components/UserTests";
import { Test } from "@/types/TestYouAITypes";

export default function MyTestPage() {
  const [tests, setTests] = useState<Test[]>([]);

  // callback para adicionar novo teste
  const handleTestGenerated = (newTest: Test) => {
    setTests((prevTests) => [newTest, ...prevTests]); // adiciona no início
  };

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      <TestForm onTestGenerated={handleTestGenerated} />
      <UserTests tests={tests} setTests={setTests} />
    </div>
  );
}
