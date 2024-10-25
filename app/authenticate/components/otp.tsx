import { OtpForm } from "./otp-form"

export default function Otp() {
  return (
    <div className="mx-auto flex w-full h-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Enter Otp
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your otp below to authenticate yourself
        </p>
      </div>
      <OtpForm />
    </div>
  )
}