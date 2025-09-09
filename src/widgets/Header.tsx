"use client";

import Image from "next/image";
import { UserIcon } from "@/components/UserIcon";
import { HomeIcon } from "@/components/HomeIcon";

export function Header() {
  return (
    <header
      className="
                            flex 
                            justify-between
                            items-center 
                            py-[15px]
                            px-[50px] 
                            border-b-[5px] 
                            border-[#ff5202] 
                            text-center
                        "
    >
      {/* Home button */}
      <HomeIcon />

      {/* Logo */}
      <Image
        src="/imgs/logo.png"
        alt="Logo Com Nome do TestYouAI"
        width={300}
        height={0}
      />

      {/* Auth button */}
      <UserIcon />
    </header>
  );
}
