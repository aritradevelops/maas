import { Resend } from "resend";

const resendClientSingleton = () => {
  return new Resend(process.env.RESEND_API_KEY)
}

declare const globalThis: {
  resendGlobal: ReturnType<typeof resendClientSingleton>;
} & typeof global;

const resend = globalThis.resendGlobal ?? resendClientSingleton()

export default resend

if (process.env.NODE_ENV !== 'production') globalThis.resendGlobal = resend