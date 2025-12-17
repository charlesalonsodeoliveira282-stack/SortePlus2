"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Download, Smartphone } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent
  }
}

export function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showBanner, setShowBanner] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    const checkIfInstalled = () => {
      if (window.matchMedia("(display-mode: standalone)").matches) {
        setIsInstalled(true)
        return true
      }
      // Verificar iOS standalone mode
      if ((window.navigator as any).standalone === true) {
        setIsInstalled(true)
        return true
      }
      return false
    }

    if (checkIfInstalled()) return

    // Check if dismissed previously
    const wasDismissed = localStorage.getItem("pwa-banner-dismissed")
    if (wasDismissed) {
      setDismissed(true)
      return
    }

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      console.log("[v0] beforeinstallprompt event fired")
      e.preventDefault()
      setDeferredPrompt(e)
      setShowBanner(true)
    }

    const handleAppInstalled = () => {
      console.log("[v0] App was installed")
      setShowBanner(false)
      setIsInstalled(true)
      setDeferredPrompt(null)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    window.addEventListener("appinstalled", handleAppInstalled)

    const timer = setTimeout(() => {
      if (!isInstalled && !dismissed) {
        // Em iOS/Safari nao tem beforeinstallprompt, mas podemos mostrar instrucoes
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
        const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)

        if (isIOS || isSafari) {
          setShowBanner(true)
        }
      }
    }, 2000)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
      window.removeEventListener("appinstalled", handleAppInstalled)
      clearTimeout(timer)
    }
  }, [isInstalled, dismissed])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice
        console.log("[v0] Install prompt outcome:", outcome)

        if (outcome === "accepted") {
          setShowBanner(false)
          setIsInstalled(true)
        }
      } catch (error) {
        console.error("[v0] Install prompt error:", error)
      }
      setDeferredPrompt(null)
    } else {
      alert("Para instalar:\n1. Toque no botao de compartilhar\n2. Selecione 'Adicionar a Tela de Inicio'")
    }
  }

  const handleDismiss = () => {
    setShowBanner(false)
    setDismissed(true)
    localStorage.setItem("pwa-banner-dismissed", "true")
  }

  if (!showBanner || dismissed || isInstalled) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600 to-violet-700 px-4 py-3 shadow-lg animate-in slide-in-from-top duration-300">
      <div className="container mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <span className="text-white text-sm font-medium truncate">Instale o app Sorte+ no seu dispositivo</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button
            onClick={handleInstallClick}
            size="sm"
            className="bg-white text-purple-700 hover:bg-white/90 font-bold text-xs px-3"
          >
            <Download className="w-4 h-4 mr-1" />
            Instalar
          </Button>
          <Button onClick={handleDismiss} size="icon" variant="ghost" className="text-white hover:bg-white/20 w-8 h-8">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
