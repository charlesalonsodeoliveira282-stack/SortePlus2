import { Sparkles } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-center md:justify-start">
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
              <p className="text-xs text-muted-foreground font-medium">Gerador de Números</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
