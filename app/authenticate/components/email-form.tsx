"use client"

import * as React from "react"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth"
import { sendOtp } from "@/actions/authenticate"
import { Message } from "@/components/message"
import { userAuthSchema } from "@/schemas/authenticate"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function EmailForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | null>(null)
  const { setAuthState, setTemp, temp } = useAuth()
  async function onSubmit(event: React.SyntheticEvent) {
    try {
      event.preventDefault()
      setIsLoading(true)
      setError(null)
      const formData = new FormData(event.target as HTMLFormElement)
      const email = formData.get("email")?.toString() || ""
      // Validate using Zod schema
      const validation = userAuthSchema.safeParse({ email })
      if (!validation.success) {
        setError(validation.error.errors[0].message)
        setIsLoading(false)
        return
      }
      const res = await sendOtp({ email })
      setTemp({ email: validation.data.email, resendId: res.resendId! })
      setAuthState('otp')
    } catch (error) {
      setError((error as Error).message)
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />
            {error && (
              <Message variant={'error'} message={error} />
            )}
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Send Otp
          </Button>
        </div>
      </form>
    </div>
  )
}
