"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, RefreshCw, Lock, Flame, Copy, Check, Loader2 } from "lucide-react"
import Link from "next/link"
import { generateLotofacil, generateMegaSena, generateMaisMilionaria, generateMegaDaVirada } from "@/lib/lottery-utils"
import { UnlockDialog } from "@/components/unlock-dialog"

type LotteryType = "lotofacil" | "megasena" | "maismilionaria" | "megadavirada"

interface MultiLotteryGeneratorProps {
  type: LotteryType
}

interface Combination {
  id: number
  numbers: number[]
  clovers?: number[]
}

const lotteryConfig = {
  lotofacil: {
    title: "Lotofácil",
    description: "15 números de 1 a 25",
    color: "primary",
    generate: generateLotofacil,
  },
  megasena: {
    title: "Mega Sena",
    description: "6 números de 1 a 60",
    color: "secondary",
    generate: generateMegaSena,
  },
  maismilionaria: {
    title: "+Milionária",
    description: "6 números de 1 a 50 + 2 trevos de 1 a 6",
    color: "accent",
    generate: generateMaisMilionaria,
  },
  megadavirada: {
    title: "Mega da Virada",
    description: "Concurso especial • Maior premiação do ano",
    color: "virada",
    generate: generateMegaDaVirada,
  },
}

const statusMessages = [
  "Analisando jogos anteriores…",
  "Realizando combinações exatas…",
  "Combinação criada com sucesso!",
]

export function MultiLotteryGenerator({ type }: MultiLotteryGeneratorProps) {
  const [combinations, setCombinations] = useState<Combination[]>([])
  const [numCombinations, setNumCombinations] = useState(1)
  const [generationCount, setGenerationCount] = useState(0)
  const [isPremium, setIsPremium] = useState(false)
  const [showUnlockDialog, setShowUnlockDialog] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentStatus, setCurrentStatus] = useState("")
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [totalGamesGenerated, setTotalGamesGenerated] = useState(0)
  const config = lotteryConfig[type]

  useEffect(() => {
    const count = Number.parseInt(localStorage.getItem("sorte-plus-generations") || "0")
    const premium = localStorage.getItem("sorte-plus-premium") === "true"
    const totalGames = Number.parseInt(localStorage.getItem("sorte-plus-total-games") || "0")
    setGenerationCount(count)
    setIsPremium(premium)
    setTotalGamesGenerated(totalGames)

    if (totalGames >= 4 && !premium) {
      setShowUnlockDialog(true)
    }
  }, [])

  const handleGenerate = async () => {
    if (!isPremium && totalGamesGenerated >= 4) {
      setShowUnlockDialog(true)
      return
    }

    if (!isPremium && totalGamesGenerated + numCombinations > 4) {
      setShowUnlockDialog(true)
      return
    }

    setIsGenerating(true)
    setCombinations([])

    for (let i = 0; i < statusMessages.length; i++) {
      setCurrentStatus(statusMessages[i])
      await new Promise((resolve) => setTimeout(resolve, 800))
    }

    const newCombinations: Combination[] = []

    for (let i = 0; i < numCombinations; i++) {
      const result = config.generate()

      if (type === "maismilionaria" && typeof result === "object" && "numbers" in result) {
        newCombinations.push({
          id: i + 1,
          numbers: result.numbers,
          clovers: result.clovers,
        })
      } else {
        newCombinations.push({
          id: i + 1,
          numbers: result as number[],
        })
      }
    }

    setCombinations(newCombinations)
    setIsGenerating(false)
    setCurrentStatus("")

    if (!isPremium) {
      const newTotalGames = totalGamesGenerated + numCombinations
      setTotalGamesGenerated(newTotalGames)
      localStorage.setItem("sorte-plus-total-games", newTotalGames.toString())

      const newCount = generationCount + 1
      setGenerationCount(newCount)
      localStorage.setItem("sorte-plus-generations", newCount.toString())

      if (newTotalGames >= 4) {
        setTimeout(() => {
          setShowUnlockDialog(true)
        }, 1500)
      }
    }
  }

  const handleCopyGame = (combo: Combination) => {
    if (!isPremium) {
      setShowUnlockDialog(true)
      return
    }

    let text = combo.numbers.map((n) => n.toString().padStart(2, "0")).join(" - ")
    if (combo.clovers && combo.clovers.length > 0) {
      text += ` | Trevos: ${combo.clovers.join(" - ")}`
    }

    navigator.clipboard.writeText(text)
    setCopiedId(combo.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleUnlock = () => {
    setIsPremium(true)
    localStorage.setItem("sorte-plus-premium", "true")
    setShowUnlockDialog(false)
  }

  const getColorClasses = (color: string) => {
    const colors = {
      primary: {
        bg: "bg-primary",
        text: "text-primary",
        border: "border-primary",
        ring: "ring-primary",
      },
      secondary: {
        bg: "bg-secondary",
        text: "text-secondary",
        border: "border-secondary",
        ring: "ring-secondary",
      },
      accent: {
        bg: "bg-accent",
        text: "text-accent",
        border: "border-accent",
        ring: "ring-accent",
      },
      virada: {
        bg: "bg-gradient-to-r from-yellow-500 to-amber-600",
        text: "text-yellow-600",
        border: "border-yellow-500",
        ring: "ring-yellow-500",
      },
    }
    return colors[color as keyof typeof colors] || colors.primary
  }

  const colorClasses = getColorClasses(config.color)

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex-1">
              {type === "megadavirada" && (
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold animate-pulse">
                    <Flame className="w-3 h-3" />
                    Prêmio acumulado
                  </span>
                </div>
              )}
              <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${colorClasses.text}`}>{config.title}</h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1 sm:mt-2">{config.description}</p>
            </div>
          </div>
          <div className="flex justify-end">
            {!isPremium && (
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-muted rounded-full">
                <span className="text-xs sm:text-sm font-medium">{totalGamesGenerated}/4 jogos</span>
              </div>
            )}
            {isPremium && (
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-full">
                <Lock className="w-4 h-4" />
                <span className="text-xs sm:text-sm font-bold">Premium</span>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <Card className="p-4 sm:p-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <label className="text-sm font-medium">Quantas combinações?</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((num) => (
                  <Button
                    key={num}
                    variant={numCombinations === num ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNumCombinations(num)}
                    className={numCombinations === num ? colorClasses.bg : ""}
                    disabled={isGenerating}
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </div>
            <Button
              onClick={handleGenerate}
              size="lg"
              className={`${colorClasses.bg} hover:opacity-90 w-full`}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Gerar Números
                </>
              )}
            </Button>
          </div>
        </Card>

        {isGenerating && currentStatus && (
          <Card className="p-6">
            <div className="flex items-center justify-center gap-3">
              <Loader2 className={`w-5 h-5 animate-spin ${colorClasses.text}`} />
              <p className="text-sm sm:text-base font-medium animate-pulse">{currentStatus}</p>
            </div>
          </Card>
        )}

        {/* Results */}
        {combinations.length > 0 && !isGenerating && (
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {combinations.map((combo) => (
              <Card key={combo.id} className={`p-4 sm:p-6 border-2 ${colorClasses.border}/20`}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-semibold">Combinação {combo.id}</h3>
                    {isPremium && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleCopyGame(combo)}
                        className="flex items-center gap-1.5 text-xs"
                      >
                        {copiedId === combo.id ? (
                          <>
                            <Check className="w-4 h-4 text-green-500" />
                            <span className="text-green-500">Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copiar jogo</span>
                          </>
                        )}
                      </Button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 sm:gap-3 justify-center py-4">
                    {combo.numbers.map((num, idx) => (
                      <div
                        key={idx}
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${colorClasses.bg} text-white flex items-center justify-center text-base sm:text-lg font-bold shadow-lg ring-2 sm:ring-4 ${colorClasses.ring}/20 animate-in fade-in zoom-in duration-300`}
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        {num}
                      </div>
                    ))}
                  </div>

                  {combo.clovers && combo.clovers.length > 0 && (
                    <div className="pt-4 border-t">
                      <p className="text-sm font-medium text-center mb-3">Trevos da Sorte</p>
                      <div className="flex gap-2 sm:gap-3 justify-center">
                        {combo.clovers.map((clover, idx) => (
                          <div
                            key={idx}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-green-500 text-white flex items-center justify-center text-base sm:text-lg font-bold shadow-lg ring-2 sm:ring-4 ring-green-500/20 animate-in fade-in zoom-in duration-300"
                            style={{ animationDelay: `${(combo.numbers.length + idx) * 50}ms` }}
                          >
                            {clover}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {combinations.length === 0 && !isGenerating && (
          <Card className="p-8 sm:p-12">
            <div className="text-center space-y-4">
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full ${colorClasses.bg}/10 flex items-center justify-center mx-auto`}
              >
                <RefreshCw className={`w-8 h-8 sm:w-10 sm:h-10 ${colorClasses.text}`} />
              </div>
              <p className="text-sm sm:text-base text-muted-foreground">
                Selecione quantas combinações deseja e clique em "Gerar Números"
              </p>
            </div>
          </Card>
        )}
      </div>

      <UnlockDialog open={showUnlockDialog} onOpenChange={setShowUnlockDialog} onUnlock={handleUnlock} />
    </div>
  )
}
