"use client"

import { Sparkles, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const handlePremiumClick = () => {
    window.open("https://pay.kiwify.com.br/YqjpXxI", "_blank")
  }

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 blur-2xl rounded-full animate-pulse" />
              <div className="relative bg-gradient-to-br from-primary to-secondary text-primary-foreground p-3 rounded-2xl shadow-lg">
                <Sparkles className="w-7 h-7" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Sorte+
              </h1>
              <p className="text-xs text-muted-foreground font-medium">Gerador de Numeros</p>
            </div>
          </div>

          <Button
            onClick={handlePremiumClick}
            size="sm"
            className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white font-semibold shadow-lg"
          >
            <Crown className="w-4 h-4 mr-1" />
            Premium
          </Button>
        </div>
      </div>
    </header>
  )
}
