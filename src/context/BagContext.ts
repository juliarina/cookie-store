import { createContext, useContext } from "react"
import type { Cookie } from "../data/cookies"

export type BagItem = {
  cookie: Cookie
  quantity: number
}

export type BagContextValue = {
  items: BagItem[]
  totalCount: number
  totalPrice: number
  addToBag: (cookie: Cookie) => void
  addQuantity: (cookie: Cookie, quantity: number) => void
  removeFromBag: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearBag: () => void
}

export const BagContext = createContext<BagContextValue | null>(null)

export function useBag() {
  const context = useContext(BagContext)
  if (!context) {
    throw new Error("useBag must be used within a BagProvider")
  }
  return context
}