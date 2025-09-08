'use client'

import Image from "next/image"

import {IconHome, IconUser} from "@/assets/icons"
import Link from "next/link"

export function Header(){
    return (
        <header className="
                            flex 
                            justify-between
                            items-center 
                            py-[15px]
                            px-[50px] 
                            border-b-[5px] 
                            border-[#ff5202] 
                            text-center
                        " >

      {/* Home button */}
      <Link href="/" className="hover:scale-110 transition-transform">
        <IconHome size={70} color="#ff5202" />
      </Link>

      {/* Logo */}
      <Image
        src="/imgs/logo.png"
        alt="Logo Com Nome do TestYouAI"
        width={300}
        height={0}
      />

      {/* Auth button */}
      <Link href="/AuthPage" className="hover:scale-110 transition-transform">
        <IconUser size={70} color="#ff5202" />
      </Link>
        </header>
    )
}