import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import { SessionProvider } from "next-auth/react"
import { cn } from "@/lib/utils"
import { auth } from "@/auth"



const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dashboard CJ Shipping APP',
  description: 'Dashboard by create next app',
}

async function RootLayout({
    children
}: {
    children: React.ReactNode,
}) {

  const session = await auth();

  return (
      <SessionProvider session={session}>
        <div className={cn(
          'relative flex w-full h-full min-h-screen',
          inter.className,
        )}>
        
          {children}
      </div>
      </SessionProvider>
  )
}

export default RootLayout
