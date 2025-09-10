"use client";

import TestForm from "@/components/TestForm";
import UserTests from "@/components/UserTests";

export default function MyTestPage() {
  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      <TestForm />
      <UserTests />
    </div>
  );
}
