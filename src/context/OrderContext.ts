import { createContext, useContext } from "react"
import type { CartItem } from "./CartContext"

export type OrderStatus = "unpaid" | "sent" | "done" | "canceled"

export type OrderDelivery = {
  name: string
  email: string
  phone: string
  city: string
  address: string
}

export type Order = {
  id: string
  date: string
  items: CartItem[]
  subtotal: number
  deliveryFee: number
  total: number
  status: OrderStatus
  delivery: OrderDelivery
}

export type OrderContextValue = {
  orders: Order[]
  placeOrder: (order: Omit<Order, "id" | "date" | "status">) => Order
  setOrderStatus: (id: string, status: OrderStatus) => void
}

export const OrderContext = createContext<OrderContextValue | null>(null)

export function useOrders() {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider")
  }
  return context
}