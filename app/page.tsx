import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Sparkles, TrendingUp, Zap, Flame } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Hero Section */}
            <div className="text-center space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-balance leading-tight bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Sorte+
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-2xl mx-auto leading-relaxed">
                Gere até 4 combinações de números para suas loterias favoritas
              </p>
            </div>

            {/* Lottery Cards */}
            <div className="grid md:grid-cols-2 gap-6 mt-12">
              {/* Lotofácil */}
              <Link href="/lotofacil" className="group">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/20 p-8 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity">
                    <Sparkles className="w-16 h-16 text-primary" />
                  </div>
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Sparkles className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">Lotofácil</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">15 números de 1 a 25</p>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Gerar Números
                    </Button>
                  </div>
                </div>
              </Link>

              {/* Mega Sena */}
              <Link href="/mega-sena" className="group">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary/20 p-8 hover:border-secondary/40 transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity">
                    <TrendingUp className="w-16 h-16 text-secondary" />
                  </div>
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center">
                      <TrendingUp className="w-7 h-7 text-secondary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">Mega Sena</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">6 números de 1 a 60</p>
                    <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                      Gerar Números
                    </Button>
                  </div>
                </div>
              </Link>

              {/* +Milionária */}
              <Link href="/mais-milionaria" className="group">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent/20 p-8 hover:border-accent/40 transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity">
                    <Zap className="w-16 h-16 text-accent" />
                  </div>
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center">
                      <Zap className="w-7 h-7 text-accent" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">+Milionária</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">6 números + 2 trevos</p>
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      Gerar Números
                    </Button>
                  </div>
                </div>
              </Link>

              {/* Mega da Virada */}
              <Link href="/mega-da-virada" className="group">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500/10 to-amber-500/5 border-2 border-yellow-500/20 p-8 hover:border-yellow-500/40 transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-30 transition-opacity">
                    <Flame className="w-16 h-16 text-yellow-500" />
                  </div>
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                      <Flame className="w-7 h-7 text-yellow-500" />
                    </div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-bold text-foreground">Mega da Virada</h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-bold animate-pulse">
                        Especial
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">6 números de 1 a 60</p>
                    <Button className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white font-bold">
                      Gerar Números
                    </Button>
                  </div>
                </div>
              </Link>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              <div className="text-center space-y-3 p-6 rounded-xl bg-muted/30">
                <div className="text-3xl font-bold text-primary">4</div>
                <div className="text-sm font-medium text-foreground">Combinações por vez</div>
              </div>
              <div className="text-center space-y-3 p-6 rounded-xl bg-muted/30">
                <div className="text-3xl font-bold text-secondary">∞</div>
                <div className="text-sm font-medium text-foreground">Gerações Ilimitadas</div>
              </div>
              <div className="text-center space-y-3 p-6 rounded-xl bg-muted/30">
                <div className="text-3xl font-bold text-accent">⚡</div>
                <div className="text-sm font-medium text-foreground">Resultados Instantâneos</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
