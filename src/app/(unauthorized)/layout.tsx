import { Metadata } from "next"
import Image from "next/image"

import BgImage from "@/../public/DevFest-Medan-2024.jpeg";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function UnauthorizedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
      <div className="container relative h-[800px] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0 max-sm:px-10">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900 object-cover z-10">
            <div className="h-[20%] w-full bg-gradient-to-b from-zinc-900 to-transparent z-30 absolute top-0" />
            <Image
              src={BgImage}
              alt="Authentication"
              className="absolute inset-0"
            />
            <div className="h-[30%] w-full bg-gradient-to-t from-zinc-900 via-zinc-800 to-transparent z-30 absolute bottom-0" />
          </div>
          <div className="relative z-20 flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Aqillix Inc.
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;If you know!, You know. If you don&apos;t know, You don&apos;t know. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat &rdquo;
              </p>
              <footer className="text-sm">Dolly Aswin</footer>
            </blockquote>
          </div>
        </div>
        
        {children}
      </div>
  )
}