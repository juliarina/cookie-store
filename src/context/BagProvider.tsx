import { useCallback, useMemo, useState, type ReactNode } from "react"
import { BagContext, type BagItem } from "./BagContext"
import type { Cookie } from "../data/cookies"

export function BagProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BagItem[]>([])

  const addToBag = useCallback((cookie: Cookie) => {
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

  const removeFromBag = useCallback((id: string) => {
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

  const clearBag = useCallback(() => setItems([]), [])

  const value = useMemo(
    () => ({
      items,
      totalCount: items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: items.reduce(
        (sum, item) => sum + item.cookie.price * item.quantity,
        0,
      ),
      addToBag,
      removeFromBag,
      updateQuantity,
      clearBag,
    }),
    [items, addToBag, removeFromBag, updateQuantity, clearBag],
  )

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>
}