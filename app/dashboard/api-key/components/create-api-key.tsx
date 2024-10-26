'use client'

import { createApiKey } from "@/actions/keys"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { User } from "@prisma/client"
import { ToastAction } from "@radix-ui/react-toast"
import { revalidatePath } from "next/cache"
import { useRouter } from "next/navigation"
import { SyntheticEvent, useState } from "react"

export default function CreateApiKey({ user }: { user: User }) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()
  const router = useRouter()
  const handleClick = async (e: SyntheticEvent) => {
    try {
      console.log('here')
      setIsLoading(true);
      await createApiKey({ email: user.email })
      router.refresh()
    } catch (error) {
      setIsLoading(false);
      toast({
        title: "Api Key Creation Failed",
        description: (error as Error).message,
        variant: "destructive",
        action: <ToastAction altText="Try Again" onClick={handleClick}> Try Again</ToastAction>
      })
    }
  }
  return (
    <Button disabled={isLoading} onClick={handleClick}>
      {isLoading && (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      )}
      Create Api Key
    </Button>
  )
}