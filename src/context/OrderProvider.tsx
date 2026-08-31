import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react"
import { useAuth } from "./AuthContext"
import { OrderContext, type Order, type OrderStatus } from "./OrderContext"

const STORAGE_PREFIX = "crumb-co:orders:"

function readOrders(email: string): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + email)
    return raw ? (JSON.parse(raw) as Order[]) : []
  } catch {
    return []
  }
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const email = user?.email ?? null
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    setOrders(email ? readOrders(email) : [])
  }, [email])

  const persist = useCallback(
    (next: Order[]) => {
      setOrders(next)
      if (email) {
        localStorage.setItem(STORAGE_PREFIX + email, JSON.stringify(next))
      }
    },
    [email],
  )

  const placeOrder = useCallback(
    (order: Omit<Order, "id" | "date" | "status">) => {
      const created: Order = {
        ...order,
        id: `ORD-${Date.now().toString(36).toUpperCase()}`,
        date: new Date().toISOString(),
        status: "unpaid",
      }
      persist([created, ...orders])
      return created
    },
    [orders, persist],
  )

  const setOrderStatus = useCallback(
    (id: string, status: OrderStatus) => {
      persist(
        orders.map((order) =>
          order.id === id ? { ...order, status } : order,
        ),
      )
    },
    [orders, persist],
  )

  const value = useMemo(
    () => ({ orders, placeOrder, setOrderStatus }),
    [orders, placeOrder, setOrderStatus],
  )

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
}