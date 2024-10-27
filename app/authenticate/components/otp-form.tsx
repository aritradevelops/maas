"use client"

import { verifyOtp } from "@/actions/authenticate"
import { Icons } from "@/components/icons"
import { Message } from "@/components/message"
import { ResendEmail } from "@/components/resend"
import { Button } from "@/components/ui/button"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useAuth } from "@/contexts/auth"
import { cn } from "@/lib/utils"
import { verifyOtpSchema } from "@/schemas/authenticate"
import Link from "next/link"
import * as React from "react"



interface OtpFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function OtpForm({ className, ...props }: OtpFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isSending, setIsSending] = React.useState<boolean>(false)
  const [error, setError] = React.useState<string | null>(null)
  const { temp, setAuthState } = useAuth()
  const [otp, setOtp] = React.useState("")
  if (!temp) setAuthState('email')
  async function onSubmit(event: React.SyntheticEvent) {
    try {
      event.preventDefault()
      setIsLoading(true)
      setError(null)
      const otpVal = parseInt(otp)
      // Validate using Zod schema
      const validation = verifyOtpSchema.safeParse({ email: temp?.email, otp: otpVal })
      if (!validation.success) {
        setError(validation.error.flatten().fieldErrors.otp?.[0]!)
        setIsLoading(false)
        return
      }
      await verifyOtp({ email: validation.data.email, otp: validation.data.otp })
      setAuthState('authenticated')
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
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            {error && (
              <Message variant={'error'} message={error} />
            )}
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Verify
          </Button>
          <ResendEmail enableAfter={30} email={temp?.email!} />
        </div>
      </form>
    </div>
  )
}