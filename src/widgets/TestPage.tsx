"use client";

import { useState } from "react";
import { Test } from "@/types/TestYouAITypes";
import TestForm from "@/components/TestForm";
import TestView from "@/components/TestView";

export default function TestPage() {
  const [test, setTest] = useState<Test | null>(null);

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      {<TestForm onTestGenerated={setTest} />}
      {test && <TestView test={test} />}
    </div>
  );
}
