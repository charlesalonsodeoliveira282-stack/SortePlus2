// Função auxiliar para gerar números únicos aleatórios
function generateUniqueNumbers(count: number, max: number): number[] {
  const numbers = new Set<number>()

  while (numbers.size < count) {
    const num = Math.floor(Math.random() * max) + 1
    numbers.add(num)
  }

  return Array.from(numbers).sort((a, b) => a - b)
}

// Lotofácil: 15 números de 1 a 25
export function generateLotofacil(): number[] {
  return generateUniqueNumbers(15, 25)
}

// Mega Sena: 6 números de 1 a 60
export function generateMegaSena(): number[] {
  return generateUniqueNumbers(6, 60)
}

// +Milionária: 6 números de 1 a 50 + 2 trevos de 1 a 6
export function generateMaisMilionaria(): { numbers: number[]; clovers: number[] } {
  return {
    numbers: generateUniqueNumbers(6, 50),
    clovers: generateUniqueNumbers(2, 6),
  }
}

// Mega da Virada: 6 números de 1 a 60
export function generateMegaDaVirada(): number[] {
  return generateUniqueNumbers(6, 60)
}
