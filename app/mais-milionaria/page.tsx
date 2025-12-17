import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MultiLotteryGenerator } from "@/components/multi-lottery-generator"

export default function MaisMilionariaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <MultiLotteryGenerator type="maismilionaria" />
      </main>
      <Footer />
    </div>
  )
}
