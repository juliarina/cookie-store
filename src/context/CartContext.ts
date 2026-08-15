import { createContext, useContext } from "react"
import type { Cookie } from "../data/cookies"

export type CartItem = {
  cookie: Cookie
  quantity: number
}

export type CartContextValue = {
  items: CartItem[]
  totalCount: number
  totalPrice: number
  addToCart: (cookie: Cookie) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextValue | null>(null)

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}