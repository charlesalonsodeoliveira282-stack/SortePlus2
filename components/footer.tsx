"use client"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Sorte+ é um gerador de números aleatórios para fins de entretenimento.
          </p>
          <p className="text-xs text-muted-foreground">Jogue com responsabilidade. Maiores de 18 anos.</p>
          <p className="text-xs text-muted-foreground mt-4">
            Desenvolvido por <span className="font-semibold text-primary">NovaPlay</span>
          </p>
          <p className="text-xs text-muted-foreground">© 2025 Sorte+. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
