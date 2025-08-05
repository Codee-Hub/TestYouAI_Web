'use client'

import Image from "next/image"

export function Header(){
    return (
        <header className="
                            flex 
                            justify-center 
                            items-center 
                            py-[20px]
                            px-[20px] 
                            border-b-[10px] 
                            border-[#ff5202] 
                            text-center
                        " >
           <Image 
            src="/imgs/logo.png"
            alt="Logo Com Nome do TestYouAI"
            width={300}
            height={0} />
        </header>
    )
}