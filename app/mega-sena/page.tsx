import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MultiLotteryGenerator } from "@/components/multi-lottery-generator"

export default function MegaSenaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <MultiLotteryGenerator type="megasena" />
      </main>
      <Footer />
    </div>
  )
}
