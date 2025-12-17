"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Clover } from "lucide-react"
import { cn } from "@/lib/utils"

interface LotteryCardProps {
  title: string
  description: string
  numbers: number[]
  clovers?: number[]
  onGenerate: () => void
  color: "primary" | "secondary" | "accent"
  totalNumbers: number
}

export function LotteryCard({
  title,
  description,
  numbers,
  clovers,
  onGenerate,
  color,
  totalNumbers,
}: LotteryCardProps) {
  const colorClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    accent: "bg-accent text-accent-foreground hover:bg-accent/90",
  }

  const colorBorderClasses = {
    primary: "border-primary/30 shadow-primary/10",
    secondary: "border-secondary/30 shadow-secondary/10",
    accent: "border-accent/30 shadow-accent/10",
  }

  const colorBgClasses = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    accent: "bg-accent",
  }

  return (
    <Card className={cn("border-2 shadow-xl", colorBorderClasses[color])}>
      <CardHeader className="text-center space-y-3 pb-6">
        <CardTitle className="text-3xl md:text-4xl font-bold">{title}</CardTitle>
        <CardDescription className="text-base text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {numbers.length > 0 ? (
          <div className="space-y-8">
            <div className="flex flex-wrap justify-center gap-3">
              {numbers.map((number, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold shadow-lg animate-in zoom-in duration-300 ring-2 ring-offset-2 ring-offset-card",
                    colorBgClasses[color],
                    "text-white",
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {number.toString().padStart(2, "0")}
                </div>
              ))}
            </div>

            {clovers && clovers.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
                  <Clover className="w-5 h-5" />
                  <span>Trevos da Sorte</span>
                </div>
                <div className="flex justify-center gap-3">
                  {clovers.map((clover, index) => (
                    <div
                      key={index}
                      className={cn(
                        "w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold shadow-lg animate-in zoom-in duration-300 bg-chart-4 text-white ring-2 ring-offset-2 ring-offset-card ring-chart-4",
                      )}
                      style={{ animationDelay: `${(numbers.length + index) * 50}ms` }}
                    >
                      {clover}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="py-16 text-center space-y-6">
            <div
              className={cn(
                "w-24 h-24 mx-auto rounded-full flex items-center justify-center",
                colorBgClasses[color],
                "bg-opacity-10",
              )}
            >
              <Sparkles
                className={cn(
                  "w-12 h-12",
                  color === "primary" ? "text-primary" : color === "secondary" ? "text-secondary" : "text-accent",
                )}
              />
            </div>
            <p className="text-muted-foreground text-lg">Clique no botão abaixo para gerar seus números</p>
          </div>
        )}

        <Button
          onClick={onGenerate}
          size="lg"
          className={cn("w-full text-lg font-semibold shadow-lg", colorClasses[color])}
        >
          <Sparkles className="w-5 h-5 mr-2" />
          {numbers.length > 0 ? "Gerar Novos Números" : "Gerar Números"}
        </Button>
      </CardContent>
    </Card>
  )
}
