import * as React from "react"

import { cn } from "@/lib/utils"

export interface CountDownProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  from: number;
  to?: number;
  onFinish?: () => void;
}

const CountDown = React.forwardRef<HTMLDivElement, CountDownProps>(function CountDown({
  from,
  to = 0,
  onFinish = () => { },
  className
}, ref) {
  const [time, setTime] = React.useState(from)
  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setTime(prevTime => Math.max(prevTime - 1, to))
    }, 1000)
    if (time === to) {
      clearInterval(timeout)
      onFinish()
    }
    return () => clearInterval(timeout)
  })
  return (
    <div
      className={cn("text-sm", className)}
      ref={ref}
    >
      {time}
    </div>
  )

})

CountDown.displayName = 'CountDown'

export { CountDown }