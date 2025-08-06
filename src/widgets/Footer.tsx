'use client'

import Image from "next/image"
import Link from "next/link"
import {IconBrandLinkedin,IconBrandGithub} from '@/assets/icons'

export function Footer() {
    return (
        <footer className="
            border-t-[5px]
            border-[#ff5202]
            px-6
            py-4
            bg-gray-100
            text-[#ff5202]
            text-2xl
            mt-auto
        ">
            <div className="flex flex-col items-center gap-3">
                <Image 
                    src="/imgs/logo.png" 
                    alt="Logo do TestYouAI" 
                    width={300} 
                    height={0} 
                    style={{ height: 'auto' }} 
                />

                <div className="flex flex-col md:flex-row items-center justify-center gap-10">
                    {/* Cauã */}
                    <div className="flex flex-col items-center">
                        <span className="font-semibold">Cauã Farias</span>
                        <div className="flex gap-4 mt-1">
                            <Link href="https://github.com/CauZy-Goes" target="_blank">
                                <IconBrandGithub size={35} className=" hover:scale-110 transition-transform" />
                            </Link>
                            <Link href="https://www.linkedin.com/in/cauã-farias-739013288" target="_blank">
                                <IconBrandLinkedin size={35} className="hover:scale-110 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Brian */}
                    <div className="flex flex-col items-center">
                        <span className="font-semibold">Brian Schultz</span>
                        <div className="flex gap-4 mt-1">
                            <Link href="https://github.com/BrianSchultz1" target="_blank">
                                <IconBrandGithub size={35} className="hover:scale-110 transition-transform" />
                            </Link>
                            <Link href="https://www.linkedin.com/in/brian-schultz-/" target="_blank">
                                <IconBrandLinkedin size={35} className="hover:scale-110 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>

                <p className="text-sm text-gray-600 mt-2">
                    © {new Date().getFullYear()} TestYouAI. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    )
}
