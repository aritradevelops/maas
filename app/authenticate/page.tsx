import { ModeToggle } from "@/components/mode-toggle"
import { Metadata } from "next"
import Image from "next/image"
import Stages from "./components/stages"
import { AuthContextProvider } from "@/contexts/auth"
import { getUser } from "@/actions/session"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Authentication Page",
  description: "User Authentication page.",
}

export default async function AuthenticationPage() {
  const user = await getUser()
  if (user) redirect('dashboard')
  return (
    <>
      <div className="container relative grid h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 text-center font-medium pt-10">
            <h1 className="text-5xl p-3">Meowwwww!</h1>
            <h2 className="text-2xl p-2">Welcome Back!</h2>
          </div>
        </div>
        <div className="lg:p-8 p-4 h-screen flex flex-col justify-center">
          <div className="flex justify-between w-full">
            <a
              rel="noreferrer noopener"
              href="/"
              className="ml-2 font-bold text-xl flex items-center text-center gap-x-2"
            >
              <Image
                src="/logo.png"
                height={40}
                width={40}
                alt="logo"
              />
              MasS
            </a>
            <ModeToggle />
          </div>
          <AuthContextProvider>
            <Stages />
          </AuthContextProvider>
        </div>
      </div>
    </>
  )
}