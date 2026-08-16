import { useEffect, useRef, useState } from "react"
import { Link, NavLink, useLocation, useNavigate } from "react-router"
import { Minus, Plus, ShoppingCart, Trash2, User } from "lucide-react"
import { RxCookie } from "react-icons/rx"
import { useCart } from "../../context/CartContext"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/menu", label: "Menu", end: false },
  { to: "/about", label: "About", end: false },
  { to: "/contact", label: "Contact", end: false },
]

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
    isActive
      ? "bg-stone-900 text-white shadow-sm"
      : "text-stone-500 hover:bg-stone-100 hover:text-stone-900"
  }`

const sheetLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `text-base font-medium transition-colors duration-200 ${
    isActive ? "text-amber-600" : "text-stone-900 hover:text-stone-900"
  }`

export default function Header() {
  const [open, setOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const cartRef = useRef<HTMLDivElement>(null)
  const { items, totalCount, totalPrice, updateQuantity, removeFromCart } =
    useCart()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    setCartOpen(false)
    setOpen(false)
  }, [location])

  useEffect(() => {
    if (!cartOpen) {
      return
    }
    function handleClickOutside(event: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setCartOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [cartOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-8 lg:px-12">
        <Link
          to="/"
          className="group flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <RxCookie className="h-8 w-8 text-amber-500 transition-transform duration-300 group-hover:rotate-12" />
          <span className="font-logo text-xl font-bold tracking-tight text-stone-900">
            Crumb & Co.
          </span>
        </Link>

        <nav className="hidden items-center gap-3 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClasses}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden items-center gap-2 rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition-all duration-200 hover:scale-[1.03] hover:border-stone-400 hover:bg-stone-50 active:scale-[0.98] sm:inline-flex"
          >
            <User className="h-4 w-4" />
            Sign in
          </Link>
          <Link
            to="/login"
            aria-label="Sign in"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-stone-700 transition hover:bg-stone-100 sm:hidden"
          >
            <User className="h-5 w-5" />
          </Link>

          <div className="relative" ref={cartRef}>
            <button
              type="button"
              aria-label={`Open cart, ${totalCount} items`}
              onClick={() => setCartOpen((v) => !v)}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-stone-700 transition-all duration-200 hover:scale-105 hover:bg-stone-100"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-[11px] font-bold text-white shadow-sm">
                  {totalCount}
                </span>
              )}
            </button>

            {cartOpen && (
              <div className="absolute right-0 top-full z-50 mt-3 w-80 overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-2xl shadow-stone-900/10">
                <div className="flex items-center justify-between border-b border-stone-100 bg-stone-50/80 px-5 py-3.5">
                  <h2 className="text-sm font-semibold text-stone-900">
                    Your Cart
                  </h2>
                  <span className="text-xs text-stone-500">
                    {totalCount} item{totalCount === 1 ? "" : "s"}
                  </span>
                </div>

                {items.length === 0 ? (
                  <div className="px-5 py-10 text-center">
                    <ShoppingCart className="mx-auto h-10 w-10 text-stone-300" />
                    <p className="mt-3 text-sm font-medium text-stone-600">
                      Your cart is empty
                    </p>
                    <Link
                      to="/menu"
                      onClick={() => setCartOpen(false)}
                      className="mt-4 inline-flex rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-stone-800"
                    >
                      Browse the Menu
                    </Link>
                  </div>
                ) : (
                  <>
                    <ul className="max-h-72 divide-y divide-stone-100 overflow-y-auto px-5">
                      {items.map((item) => (
                        <li
                          key={item.cookie.id}
                          className="flex items-center gap-3 py-3"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-50">
                            <RxCookie className="h-8 w-8 text-amber-500" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-stone-900">
                              {item.cookie.name}
                            </p>
                            <p className="text-xs text-stone-500">
                              ${item.cookie.price.toFixed(2)}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              aria-label={`Decrease quantity of ${item.cookie.name}`}
                              onClick={() =>
                                updateQuantity(
                                  item.cookie.id,
                                  item.quantity - 1,
                                )
                              }
                              className="flex h-7 w-7 items-center justify-center rounded-full border border-stone-200 text-stone-600 transition hover:bg-stone-100"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-6 text-center text-sm font-semibold text-stone-900">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label={`Increase quantity of ${item.cookie.name}`}
                              disabled={item.quantity >= item.cookie.stock}
                              onClick={() =>
                                updateQuantity(
                                  item.cookie.id,
                                  item.quantity + 1,
                                )
                              }
                              className="flex h-7 w-7 items-center justify-center rounded-full border border-stone-200 text-stone-600 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              <Plus className="h-3.5 w-3.5" />
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
                    <div className="border-t border-stone-100 bg-stone-50/80 px-5 py-4">
                      <div className="flex items-center justify-between text-sm text-stone-600">
                        <span>Total</span>
                        <span className="text-lg font-extrabold text-stone-900">
                          ${totalPrice.toFixed(2)}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setCartOpen(false)
                          navigate("/checkout")
                        }}
                        className="mt-3 w-full rounded-full bg-stone-900 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.01] hover:bg-stone-800"
                      >
                        Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Toggle menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-stone-700 transition hover:bg-stone-100 md:hidden"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="h-6 w-6"
                >
                  <path d="M4 7h16M4 12h16M4 17h16" />
                </svg>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="md:hidden max-w-80">
              <nav className="pl-6 pt-8">
                <ul className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        end={item.end}
                        className={sheetLinkClasses}
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}