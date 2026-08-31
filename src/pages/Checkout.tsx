import { useState, type FormEvent } from "react"
import { Link } from "react-router"
import { ArrowRight, Package, ShoppingCart, Trash2 } from "lucide-react"
import { RxCookie } from "react-icons/rx"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"
import { useOrders } from "../context/OrderContext"

const inputClasses =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15"

export default function Checkout() {
  const { items, totalPrice, removeFromCart, updateQuantity, clearCart } =
    useCart()
  const { user } = useAuth()
  const { placeOrder } = useOrders()
  const [placed, setPlaced] = useState(false)
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null)

  const DELIVERY_FEE = 5
  const grandTotal = items.length > 0 ? totalPrice + DELIVERY_FEE : 0

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const order = placeOrder({
      items,
      subtotal: totalPrice,
      deliveryFee: DELIVERY_FEE,
      total: grandTotal,
      delivery: {
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        city: String(formData.get("city") ?? ""),
        address: String(formData.get("address") ?? ""),
      },
    })
    clearCart()
    setPlacedOrderId(order.id)
    setPlaced(true)
  }

  if (placed) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-24 text-center sm:px-8">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-10 w-10 text-emerald-600"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h1 className="mt-8 text-4xl font-bold tracking-tight text-stone-900">
          Order placed!
        </h1>
        <p className="mt-4 text-base text-stone-600 sm:text-lg">
          Thanks for your order{placedOrderId ? ` — ${placedOrderId}` : ""}.
          Your cookies are being baked fresh and will be delivered warm.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/orders"
            className="group inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all duration-200 hover:scale-[1.02] hover:bg-emerald-500 active:scale-[0.98]"
          >
            <Package className="h-4 w-4" />
            View your orders
          </Link>
          <Link
            to="/menu"
            className="group inline-flex items-center gap-2 rounded-full bg-stone-900 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-stone-900/20 transition-all duration-200 hover:scale-[1.02] hover:bg-amber-500 active:scale-[0.98]"
          >
            Keep browsing
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-24 text-center sm:px-8">
        <ShoppingCart className="mx-auto h-16 w-16 text-stone-300" />
        <h1 className="mt-6 text-3xl font-bold tracking-tight text-stone-900">
          Your cart is empty
        </h1>
        <p className="mt-3 text-stone-600">
          Add some cookies to your cart before checking out.
        </p>
        <Link
          to="/menu"
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-stone-900 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-stone-900/20 transition-all duration-200 hover:scale-[1.02] hover:bg-amber-500 active:scale-[0.98]"
        >
          Browse the Menu
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-600">
          Checkout
        </span>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
          Almost there
        </h1>
        <p className="mt-4 text-base text-stone-600 sm:text-lg">
          Fill in your details and we'll bake your cookies fresh.
        </p>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-5">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm sm:p-10 lg:col-span-3"
        >
          <h2 className="text-sm font-semibold uppercase tracking-widest text-stone-500">
            Delivery details
          </h2>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-semibold text-stone-700"
              >
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                defaultValue={user?.name ?? ""}
                placeholder="Jane Doe"
                className={inputClasses}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-stone-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                defaultValue={user?.email ?? ""}
                placeholder="jane@example.com"
                className={inputClasses}
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-sm font-semibold text-stone-700"
              >
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="+1 (555) 123-4567"
                className={inputClasses}
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="mb-2 block text-sm font-semibold text-stone-700"
              >
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                required
                placeholder="Cookie City"
                className={inputClasses}
              />
            </div>
          </div>

          <div className="mt-6">
            <label
              htmlFor="address"
              className="mb-2 block text-sm font-semibold text-stone-700"
            >
              Street address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              required
              placeholder="123 Sweet Street, Apt 4B"
              className={inputClasses}
            />
          </div>

          <button
            type="submit"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-stone-900 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-stone-900/20 transition-all duration-200 hover:scale-[1.02] hover:bg-amber-500 active:scale-[0.98]"
          >
            Place Order
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </form>

        <aside className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm lg:col-span-2">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-stone-500">
            Order summary
          </h2>

          <ul className="mt-6 divide-y divide-stone-100">
            {items.map((item) => (
              <li key={item.cookie.id} className="flex items-center gap-3 py-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-50">
                  <RxCookie className="h-9 w-9 text-amber-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-stone-900">
                    {item.cookie.name}
                  </p>
                  <p className="text-xs text-stone-500">
                    ${item.cookie.price.toFixed(2)} each
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    aria-label={`Decrease quantity of ${item.cookie.name}`}
                    onClick={() =>
                      updateQuantity(item.cookie.id, item.quantity - 1)
                    }
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-stone-200 text-stone-600 transition hover:bg-stone-100"
                  >
                    −
                  </button>
                  <span className="w-6 text-center text-sm font-semibold text-stone-900">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    aria-label={`Increase quantity of ${item.cookie.name}`}
                    disabled={item.quantity >= item.cookie.stock}
                    onClick={() =>
                      updateQuantity(item.cookie.id, item.quantity + 1)
                    }
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-stone-200 text-stone-600 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  aria-label={`Remove ${item.cookie.name} from cart`}
                  onClick={() => removeFromCart(item.cookie.id)}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-stone-400 transition hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>

          <dl className="mt-6 space-y-3 border-t border-stone-100 pt-5 text-sm">
            <div className="flex items-center justify-between text-stone-600">
              <dt>Subtotal</dt>
              <dd>${totalPrice.toFixed(2)}</dd>
            </div>
            <div className="flex items-center justify-between text-stone-600">
              <dt>Delivery</dt>
              <dd>${DELIVERY_FEE.toFixed(2)}</dd>
            </div>
            <div className="flex items-center justify-between pt-2 text-base">
              <dt className="font-semibold text-stone-900">Total</dt>
              <dd className="text-lg font-extrabold text-stone-900">
                ${grandTotal.toFixed(2)}
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  )
}