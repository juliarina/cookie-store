import { useState } from "react"
import { Link } from "react-router"
import {
  ArrowRight,
  PackageOpen,
} from "lucide-react"
import { useOrders, type OrderStatus } from "../context/OrderContext"

const statusTabs: { value: OrderStatus; label: string }[] = [
  { value: "unpaid", label: "Pending payment" },
  { value: "sent", label: "Sent" },
  { value: "done", label: "Done" },
  { value: "canceled", label: "Canceled" },
]

const statusLabels: Record<OrderStatus, string> = {
  unpaid: "Pending payment",
  sent: "Sent",
  done: "Done",
  canceled: "Canceled",
}

const statusMeta: Record<
  OrderStatus,
  { badge: string; emptyTitle: string; emptyText: string }
> = {
  unpaid: {
    badge: "bg-amber-50 text-amber-700",
    emptyTitle: "No unpaid orders",
    emptyText: "Orders waiting for payment will show up here.",
  },
  sent: {
    badge: "bg-sky-50 text-sky-700",
    emptyTitle: "No orders sent",
    emptyText: "Orders that have shipped will show up here.",
  },
  done: {
    badge: "bg-emerald-50 text-emerald-700",
    emptyTitle: "No completed orders",
    emptyText: "Delivered orders will show up here.",
  },
  canceled: {
    badge: "bg-red-50 text-red-700",
    emptyTitle: "No canceled orders",
    emptyText: "Canceled orders will show up here.",
  },
}

const pillClasses = (active: boolean) =>
  `shrink-0 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
    active
      ? "bg-stone-900 text-white shadow-sm"
      : "border border-stone-300 text-stone-500 hover:bg-stone-100 hover:text-stone-900"
  }`

const navItemClasses = (active: boolean) =>
  `flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
    active
      ? "bg-sidebar-accent text-sidebar-accent-foreground"
      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
  }`

export default function Orders() {
  const { orders, setOrderStatus } = useOrders()
  const [active, setActive] = useState<OrderStatus>("unpaid")

  const filtered = orders
    .filter((order) => order.status === active)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const countFor = (status: OrderStatus) =>
    orders.filter((order) => order.status === status).length

  const meta = statusMeta[active]

  return (
    <section className="mx-auto max-w-6xl px-6 py-8 sm:px-8">
      <div className="md:flex md:gap-8">
        <aside className="hidden shrink-0 md:block md:w-64">
          <div className="sticky top-24 flex min-h-[calc(100svh-8rem)] flex-col rounded-3xl border border-sidebar-border bg-white p-5 text-sidebar-foreground shadow-sm">
            <h2 className="px-3 font-logo text-xl font-bold">Orders</h2>
            <nav className="mt-4 space-y-1.5">
              {statusTabs.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActive(tab.value)}
                  className={navItemClasses(active === tab.value)}
                >
                  <span className="truncate">{tab.label}</span>
                  <span className="ml-auto text-xs tabular-nums text-sidebar-foreground/50">
                    {countFor(tab.value)}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="md:hidden">
            <div className="mx-[-1rem] flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-[-2rem] sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {statusTabs.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActive(tab.value)}
                  className={pillClasses(active === tab.value)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 md:mt-0">
            {filtered.length === 0 ? (
              <div className="flex min-h-[calc(100svh-8rem)] flex-col items-center justify-center rounded-3xl border border-stone-200 bg-white px-6 py-20 text-center shadow-sm">
                <PackageOpen className="mx-auto h-14 w-14 text-stone-300" />
                <h3 className="mt-5 text-xl font-bold text-stone-900">
                  {meta.emptyTitle}
                </h3>
                <p className="mt-2 text-sm text-stone-500">{meta.emptyText}</p>
                <Link
                  to="/menu"
                  className="group mt-6 inline-flex items-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-stone-900/20 transition-all duration-200 hover:scale-[1.02] hover:bg-amber-500 active:scale-[0.98]"
                >
                  Continue shopping
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            ) : (
              <ul className="space-y-6">
                {filtered.map((order) => (
                  <li
                    key={order.id}
                    className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="font-mono text-sm font-bold text-stone-900">
                          {order.id}
                        </p>
                        <p className="mt-1 text-xs text-stone-500">
                          {new Date(order.date).toLocaleString()}
                        </p>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${meta.badge}`}
                      >
                        {statusLabels[order.status]}
                      </span>
                    </div>

                    <ul className="mt-6 divide-y divide-stone-100">
                      {order.items.map((item) => (
                        <li
                          key={item.cookie.id}
                          className="flex items-center justify-between py-3 text-sm"
                        >
                          <span className="text-stone-900">
                            <span className="font-semibold">
                              {item.cookie.name}
                            </span>
                            <span className="text-stone-400">
                              {" "}
                              × {item.quantity}
                            </span>
                          </span>
                          <span className="font-semibold text-stone-900">
                            ${(item.cookie.price * item.quantity).toFixed(2)}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap items-end justify-between gap-4 border-t border-stone-100 pt-5">
                      <div className="text-sm text-stone-500">
                        <p className="font-medium text-stone-700">
                          {order.delivery.name} · {order.delivery.city}
                        </p>
                        <p className="mt-0.5">{order.delivery.address}</p>
                      </div>
                      <p className="text-lg font-extrabold text-stone-900">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>

                    {order.status === "unpaid" && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => setOrderStatus(order.id, "sent")}
                          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-emerald-500"
                        >
                          Mark as sent
                        </button>
                        <button
                          type="button"
                          onClick={() => setOrderStatus(order.id, "canceled")}
                          className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition-all duration-200 hover:scale-[1.02] hover:bg-red-50"
                        >
                          Cancel order
                        </button>
                      </div>
                    )}

                    {order.status === "sent" && (
                      <div className="mt-5">
                        <button
                          type="button"
                          onClick={() => setOrderStatus(order.id, "done")}
                          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-emerald-500"
                        >
                          Mark as done
                        </button>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}