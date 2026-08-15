import { useCallback, useMemo, useState, type ReactNode } from "react"
import { CartContext, type CartItem } from "./CartContext"
import type { Cookie } from "../data/cookies"

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = useCallback((cookie: Cookie) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.cookie.id === cookie.id)
      if (existing) {
        if (existing.quantity >= cookie.stock) {
          return prev
        }
        return prev.map((item) =>
          item.cookie.id === cookie.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }
      if (cookie.stock <= 0) {
        return prev
      }
      return [...prev, { cookie, quantity: 1 }]
    })
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.cookie.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.cookie.id === id
            ? { ...item, quantity: Math.min(quantity, item.cookie.stock) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const value = useMemo(
    () => ({
      items,
      totalCount: items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: items.reduce(
        (sum, item) => sum + item.cookie.price * item.quantity,
        0,
      ),
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
    }),
    [items, addToCart, removeFromCart, updateQuantity, clearCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}