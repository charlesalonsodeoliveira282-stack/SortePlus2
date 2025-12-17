import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MultiLotteryGenerator } from "@/components/multi-lottery-generator"

export default function LotofacilPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <MultiLotteryGenerator type="lotofacil" />
      </main>
      <Footer />
    </div>
  )
}
