import { useEffect, useState } from "react"
import { Link, NavLink, useLocation, useNavigate } from "react-router"
import { LogOut, Minus, Plus, ShoppingCart, Trash2, User } from "lucide-react"
import { RxCookie } from "react-icons/rx"
import { useAuth } from "../../context/AuthContext"
import { useCart } from "../../context/CartContext"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"

const navItems = [
  { to: "/", label: "Home", end: true },
  { to: "/menu", label: "Menu", end: false },
  { to: "/orders", label: "Orders", end: false },
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

const DELIVERY_FEE = 5

export default function Header() {
  const [open, setOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { user, logout } = useAuth()
  const { items, totalCount, totalPrice, updateQuantity, removeFromCart } =
    useCart()
  const location = useLocation()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate("/")
  }

  useEffect(() => {
    setCartOpen(false)
    setOpen(false)
  }, [location])

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
          {user ? (
            <>
              <span className="hidden items-center gap-2 lg:inline-flex">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span className="text-sm font-semibold text-stone-700">
                  {user.name.split(" ")[0]}
                </span>
              </span>
              <button
                type="button"
                onClick={handleLogout}
                aria-label="Sign out"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-stone-700 transition hover:bg-stone-100"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </>
          ) : (
            <>
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
            </>
          )}

          <Sheet open={cartOpen} onOpenChange={setCartOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label={`Open cart, ${totalCount} items`}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-stone-700 transition-all duration-200 hover:scale-105 hover:bg-stone-100"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalCount > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-[11px] font-bold text-white shadow-sm">
                    {totalCount}
                  </span>
                )}
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="max-w-sm">
              <SheetHeader>
                <SheetTitle className="text-sm font-semibold tracking-widest text-stone-500">
                  Your cart
                </SheetTitle>
                <SheetDescription>
                  {totalCount} item{totalCount === 1 ? "" : "s"}
                </SheetDescription>
              </SheetHeader>

              {items.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
                  <ShoppingCart className="h-12 w-12 text-stone-300" />
                  <p className="mt-4 text-sm font-medium text-stone-600">
                    Your cart is empty
                  </p>
                  <p className="mt-1 text-xs text-stone-400">
                    Add some cookies to get started.
                  </p>
                  <Link
                    to="/menu"
                    onClick={() => setCartOpen(false)}
                    className="mt-5 inline-flex rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-stone-800"
                  >
                    Browse the Menu
                  </Link>
                </div>
              ) : (
                <>
                  <ul className="flex-1 divide-y divide-stone-100 overflow-y-auto px-5 py-2">
                    {items.map((item) => (
                      <li
                        key={item.cookie.id}
                        className="flex items-start gap-3 py-4"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-50">
                          <RxCookie className="h-8 w-8 text-amber-500" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-stone-900">
                            {item.cookie.name}
                          </p>
                          <p className="mt-0.5 text-xs text-stone-500">
                            ${item.cookie.price.toFixed(2)}
                          </p>
                          <div className="mt-2 flex items-center gap-1">
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
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-sm font-bold text-stone-900">
                            ${(item.cookie.price * item.quantity).toFixed(2)}
                          </span>
                          <span className="text-[11px] text-stone-400">
                            {item.quantity} × ${item.cookie.price.toFixed(2)}
                          </span>
                          <button
                            type="button"
                            aria-label={`Remove ${item.cookie.name} from cart`}
                            onClick={() => removeFromCart(item.cookie.id)}
                            className="mt-1 flex h-7 w-7 items-center justify-center rounded-full text-stone-400 transition hover:bg-red-50 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <SheetFooter className="border-t border-stone-100 bg-stone-50/80">
                    <dl className="w-full space-y-2 text-sm">
                      <div className="flex items-center justify-between text-stone-600">
                        <dt>Subtotal</dt>
                        <dd className="font-semibold text-stone-900">
                          ${totalPrice.toFixed(2)}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between text-stone-600">
                        <dt>Delivery</dt>
                        <dd className="font-semibold text-stone-900">
                          ${DELIVERY_FEE.toFixed(2)}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between border-t border-stone-200 pt-2 text-base">
                        <dt className="font-semibold text-stone-900">Total</dt>
                        <dd className="text-lg font-extrabold text-stone-900">
                          ${(totalPrice + DELIVERY_FEE).toFixed(2)}
                        </dd>
                      </div>
                    </dl>
                    <button
                      type="button"
                      onClick={() => {
                        setCartOpen(false)
                        navigate("/checkout")
                      }}
                      className="w-full rounded-full bg-stone-900 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.01] hover:bg-amber-500"
                    >
                      Proceed to Checkout
                    </button>
                  </SheetFooter>
                </>
              )}
            </SheetContent>
          </Sheet>

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