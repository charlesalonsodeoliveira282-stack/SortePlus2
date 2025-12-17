"use client"

import { useState } from "react"
import { LotteryCard } from "@/components/lottery-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateLotofacil, generateMegaSena, generateMaisMilionaria } from "@/lib/lottery-utils"

export function LotteryGenerator() {
  const [lotofacilNumbers, setLotofacilNumbers] = useState<number[]>([])
  const [megaSenaNumbers, setMegaSenaNumbers] = useState<number[]>([])
  const [maisMilionariaNumbers, setMaisMilionariaNumbers] = useState<{ numbers: number[]; clovers: number[] }>({
    numbers: [],
    clovers: [],
  })

  const handleGenerateLotofacil = () => {
    setLotofacilNumbers(generateLotofacil())
  }

  const handleGenerateMegaSena = () => {
    setMegaSenaNumbers(generateMegaSena())
  }

  const handleGenerateMaisMilionaria = () => {
    setMaisMilionariaNumbers(generateMaisMilionaria())
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-balance leading-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Gere seus números da sorte
          </h2>
          <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
            Escolha sua loteria favorita e gere números aleatórios com um clique
          </p>
        </div>

        <Tabs defaultValue="lotofacil" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-auto p-1.5 bg-muted/50">
            <TabsTrigger
              value="lotofacil"
              className="text-sm md:text-base py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Lotofácil
            </TabsTrigger>
            <TabsTrigger
              value="megasena"
              className="text-sm md:text-base py-3 data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground"
            >
              Mega Sena
            </TabsTrigger>
            <TabsTrigger
              value="maismilionaria"
              className="text-sm md:text-base py-3 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              +Milionária
            </TabsTrigger>
          </TabsList>

          <TabsContent value="lotofacil" className="mt-8">
            <LotteryCard
              title="Lotofácil"
              description="Escolha 15 números de 1 a 25"
              numbers={lotofacilNumbers}
              onGenerate={handleGenerateLotofacil}
              color="primary"
              totalNumbers={25}
            />
          </TabsContent>

          <TabsContent value="megasena" className="mt-8">
            <LotteryCard
              title="Mega Sena"
              description="Escolha 6 números de 1 a 60"
              numbers={megaSenaNumbers}
              onGenerate={handleGenerateMegaSena}
              color="secondary"
              totalNumbers={60}
            />
          </TabsContent>

          <TabsContent value="maismilionaria" className="mt-8">
            <LotteryCard
              title="+Milionária"
              description="6 números de 1 a 50 + 2 trevos de 1 a 6"
              numbers={maisMilionariaNumbers.numbers}
              clovers={maisMilionariaNumbers.clovers}
              onGenerate={handleGenerateMaisMilionaria}
              color="accent"
              totalNumbers={50}
            />
          </TabsContent>
        </Tabs>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="text-center space-y-3 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 shadow-lg">
            <div className="text-4xl font-bold text-primary">3</div>
            <div className="text-sm font-medium text-foreground">Loterias Disponíveis</div>
          </div>
          <div className="text-center space-y-3 p-8 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary/20 shadow-lg">
            <div className="text-4xl font-bold text-secondary">∞</div>
            <div className="text-sm font-medium text-foreground">Gerações Ilimitadas</div>
          </div>
          <div className="text-center space-y-3 p-8 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/20 shadow-lg">
            <div className="text-4xl font-bold text-accent">⚡</div>
            <div className="text-sm font-medium text-foreground">Resultados Instantâneos</div>
          </div>
        </div>
      </div>
    </div>
  )
}
