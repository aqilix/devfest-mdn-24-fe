import { Metadata } from "next"
import Image from "next/image"

import BgImage from "@/../public/DevFest-Medan-2024-2.png";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function UnauthorizedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="container mx-auto relative h-[800px] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0 max-sm:px-10">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900 object-cover z-10">
          <div className="h-[20%] w-full bg-gradient-to-b from-zinc-500 to-transparent z-30 absolute top-0" />
          <Image
            src={BgImage}
            alt="Authentication"
            className="absolute inset-0 top-auto bottom-auto"
            sizes="(min-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
          <div className="h-[25%] w-full bg-gradient-to-t from-zinc-700 via-zinc-800 to-transparent z-30 absolute bottom-0" />
        </div>
        <div className="relative z-20 flex items-center text-lg font-medium" />
        <div className="relative z-20 mt-auto mb-2">
          <blockquote className="space-y-2">
            <p className="text-lg">
              AI will have a bigger impact on the world than some of the biggest innovations of the past.
            </p>
            <footer className="text-sm"><strong>Sundar Pichai</strong>, CEO of Google</footer>
          </blockquote>
        </div>
      </div>

      {children}
    </div>
  )
}