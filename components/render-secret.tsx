'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Copy, Check } from 'lucide-react'

export default function RenderSecret({ secret, title, description, secretName }: { secret: string, title: string, description: string, secretName: string }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const copyToClipboard = () => {
    if (inputRef.current) {
      inputRef.current.select()
      navigator.clipboard.writeText(secret)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 max-w-md">
        <div className="relative">
          <Input
            type={isVisible ? "text" : "password"}
            value={secret}
            readOnly
            ref={inputRef}
            className="pr-20"
            aria-label={secretName}
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3"
            onClick={toggleVisibility}
            aria-label={isVisible ? `Hide ${secretName}` : `Show ${secretName}`}
          >
            {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        <Button
          onClick={copyToClipboard}
          className="w-full"
          disabled={isCopied}
          aria-label={`Copy ${secretName} to clipboard`}
        >
          {isCopied ? (
            <>
              <Check className="mr-2 h-4 w-4" /> Copied!
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" /> Copy {secretName}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}