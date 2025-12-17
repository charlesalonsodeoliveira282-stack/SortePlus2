import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MultiLotteryGenerator } from "@/components/multi-lottery-generator"

export default function MegaDaViradaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-b from-green-950/20 to-background">
        <MultiLotteryGenerator type="megadavirada" />
      </main>
      <Footer />
    </div>
  )
}
