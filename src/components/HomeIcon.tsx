"use client";

import { IconHome } from "@/assets/icons";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/auth";

export function HomeIcon() {
  const router = useRouter();
  const { validateToken } = useAuth();

  const handleClick = () => {
    const decoded = validateToken();
    if (decoded) {
      router.push("/UserPage");
    } else {
      router.push("/");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="hover:scale-110 transition-transform"
    >
      <IconHome size={70} color="#ff5202" />
    </button>
  );
}
