'use client'

import Image from "next/image"

import {IconHome, IconUser} from "@/assets/icons"

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

            <IconHome
             size={70}
            color="#ff5202"
            className="hover:scale-110 transition-transform"/> 

           <Image 
            src="/imgs/logo.png"
            alt="Logo Com Nome do TestYouAI"
            width={300}
            height={0} />

            <IconUser
            size={70}
            color="#ff5202"
            className="hover:scale-110 transition-transform"/> 
        </header>
    )
}