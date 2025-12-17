"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, Sparkles, PartyPopper, Crown, ExternalLink, X } from "lucide-react"

interface UnlockDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUnlock: () => void
}

export function UnlockDialog({ open, onOpenChange, onUnlock }: UnlockDialogProps) {
  const [code, setCode] = useState("")
  const [error, setError] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [showCodeInput, setShowCodeInput] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (code.toUpperCase() === "BOASORTE20") {
      setShowSuccess(true)
      setCode("")
      setError("")

      setTimeout(() => {
        onUnlock()
        setShowSuccess(false)
        onOpenChange(false)
      }, 3000)
    } else {
      setError("Codigo invalido. Verifique e tente novamente.")
    }
  }

  const handleBuyClick = () => {
    window.open("https://pay.kiwify.com.br/YqjpXxI", "_blank")
  }

  const handleCloseApp = () => {
    // Tenta fechar a janela/aba
    window.close()
    // Fallback: redireciona para uma pagina em branco ou Google
    setTimeout(() => {
      window.location.href = "about:blank"
    }, 100)
  }

  if (showSuccess) {
    return (
      <Dialog open={open} onOpenChange={() => {}}>
        <DialogContent
          className="w-[calc(100%-2rem)] max-w-md mx-auto fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center animate-pulse">
                <PartyPopper className="w-10 h-10 text-white" />
              </div>
            </div>
            <DialogTitle className="text-center text-3xl bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent">
              Parabens!
            </DialogTitle>
            <DialogDescription className="text-center text-lg space-y-3 pt-4">
              <p className="font-semibold text-foreground">Seu acesso vitalicio foi liberado com sucesso!</p>
              <p className="text-muted-foreground">Agora voce pode gerar numeros ilimitados para todas as loterias.</p>
              <div className="flex items-center justify-center gap-2 pt-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <span className="font-bold text-yellow-600">Premium Ativado</span>
                <Sparkles className="w-5 h-5 text-yellow-500" />
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className="w-[calc(100%-2rem)] max-w-md mx-auto fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <button
          onClick={handleCloseApp}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          aria-label="Fechar aplicativo"
        >
          <X className="h-5 w-5" />
        </button>

        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl">Limite gratuito atingido</DialogTitle>
          <DialogDescription className="text-center space-y-2 pt-2">
            <p>Voce ja utilizou as 4 combinacoes gratuitas.</p>
            <p>Para continuar usando o Sorte+, desbloqueie o acesso vitalicio.</p>
          </DialogDescription>
        </DialogHeader>

        <div className="my-4 p-4 sm:p-6 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 rounded-xl border-2 border-yellow-400/50">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Crown className="w-5 h-5 text-yellow-600" />
            <p className="text-xs sm:text-sm font-semibold text-yellow-700 dark:text-yellow-500 uppercase tracking-wide">
              Acesso Vitalicio Premium
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Investimento unico de</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                R$ 39,90
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-3 font-medium">
              Pagamento unico - Sem mensalidades - Acesso para sempre
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Button
            type="button"
            onClick={handleBuyClick}
            size="lg"
            className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-base"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Desbloquear acesso vitalicio
          </Button>

          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => setShowCodeInput(!showCodeInput)}
            className="w-full text-base"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Ja tenho o codigo
          </Button>
        </div>

        {showCodeInput && (
          <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t mt-4">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Digite seu codigo premium"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value)
                  setError("")
                }}
                className="text-center text-lg tracking-wider uppercase"
                autoFocus
              />
              {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              Validar Codigo
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
