import { resendOtp } from "@/actions/authenticate";
import { CountDown } from "@/components/count-down";
import { Message, MessageProps } from "@/components/message";
import { useAuth } from "@/contexts/auth";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { forwardRef, HtmlHTMLAttributes, useState } from "react";

export interface ResendEmailProps extends HtmlHTMLAttributes<HTMLDivElement> {
  enableAfter: number;
  email: string;
}

const ResendEmail = forwardRef<HTMLDivElement, ResendEmailProps>(
  ({ enableAfter, className, email, ...props }, ref) => {
    const [linkEnabled, setLinkEnabled] = useState(false)
    const [message, setMessage] = useState<MessageProps | null>(null)
    const [pending, setIsPending] = useState(false)
    return (
      <div className="flex w-full flex-col gap-1" {...props}>
        <span
          ref={ref}
          className={cn('flex gap-1 px-1 align-middle text-sm justify-center', className)}
        >
          <span>Didn&apos;t receive the email?</span>
          <Link href="#" className={cn("underline", linkEnabled ? 'cursor-pointer' : 'cursor-not-allowed')} onClick={async () => {
            setIsPending(true)
            setMessage(null)
            const resp = await resendOtp({ email: email! })
            if (resp) {
              setIsPending(false)
              setMessage({ variant: 'success', message: 'Email has been resent.' })
              setLinkEnabled(false)
            } else {
              setIsPending(false)
              setMessage({ variant: 'error', message: 'Failed to resend email.' })
            }
          }}>{pending ? 'Resending...' : 'Resend'}</Link>
          {(!linkEnabled) && (<div className="flex gap-x-0.5">
            in <CountDown className="font-semibold" from={enableAfter} onFinish={() => setLinkEnabled(true)} />
            second(s).

          </div>)}
        </span>
        {message && <Message variant={message.variant} message={message.message} />}
      </div>
    )

  })

ResendEmail.displayName = 'ResendEmail'

export { ResendEmail };
