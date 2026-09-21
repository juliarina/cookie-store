import { ArrowLeft, Minus, Plus } from "lucide-react"
import { useState } from "react"
import { Link, useParams } from "react-router"
import cookieImage from "../assets/cookie.webp"
import { useBag } from "../context/BagContext"
import { cookies, LOW_STOCK_THRESHOLD } from "../data/cookies"
import RatingStars from "../components/RatingStars"

export default function CookieDetail() {
  const { id } = useParams()
  const { items, addQuantity } = useBag()
  const [quantity, setQuantity] = useState(1)
  const cookie = cookies.find((c) => c.id === id)

  if (!cookie) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-24 text-center sm:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-stone-900">
          Cookie not found
        </h1>
        <p className="mt-4 text-stone-600">
          We couldn't find that cookie on our menu.
        </p>
        <Link
          to="/menu"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Menu
        </Link>
      </section>
    )
  }

  const inBag = items.find((item) => item.cookie.id === cookie.id)?.quantity ?? 0
  const outOfStock = cookie.stock === 0
  const atLimit = inBag >= cookie.stock
  const remaining = cookie.stock - inBag
  const lowStock = !outOfStock && remaining <= LOW_STOCK_THRESHOLD

  return (
    <section className="mx-auto max-w-6xl px-6 pt-10 pb-20 sm:px-8 lg:px-12 lg:pt-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative flex items-center justify-center overflow-hidden rounded-3xl border border-stone-200 bg-gradient-to-b from-amber-50 to-white px-6 py-12 sm:py-16 lg:h-[calc(100vh-8rem)]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-72 w-72 rounded-full bg-amber-200/40 blur-2xl sm:h-96 sm:w-96" />
            </div>
            {cookie.tag && (
              <span className="absolute right-6 top-6 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                {cookie.tag}
              </span>
            )}
            <img
              src={cookieImage}
              alt={cookie.name}
              className="relative h-[55vw] w-[55vw] object-cover sm:h-[40vw] sm:w-[40vw] lg:h-[38vw] lg:w-[38vw] lg:max-h-[calc(100vh-19rem)] lg:max-w-full"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
            {cookie.name}
          </h1>
          <RatingStars rating={cookie.rating} className="mt-2" size={5} />
          <p className="mt-2 text-xl font-bold text-amber-600">
            ${cookie.price.toFixed(2)}
          </p>

          {!outOfStock && (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1 rounded-full border border-stone-200 bg-white p-1">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-stone-600 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:text-stone-300"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center text-sm font-semibold text-stone-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  disabled={quantity + inBag >= cookie.stock}
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-stone-600 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:text-stone-300"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                disabled={outOfStock || atLimit}
                onClick={() => {
                  addQuantity(cookie, quantity)
                  setQuantity(1)
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-stone-900/20 transition-all duration-200 hover:scale-[1.03] hover:bg-amber-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-400 disabled:hover:scale-100"
              >
                {outOfStock ? (
                  "Out of Stock"
                ) : atLimit ? (
                  "Max in Bag"
                ) : (
                  "Add to Bag"
                )}
              </button>
            </div>
          )}
          {!outOfStock && lowStock && (
            <p className="mt-3 text-sm font-medium text-orange-600">
              Only {remaining} left in stock
            </p>
          )}

          <p className="mt-8 text-sm leading-relaxed text-stone-700">
            {cookie.description}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-stone-700">
            <span className="font-semibold text-stone-900">Ingredients:</span>{" "}
            {cookie.ingredients.join(", ")}.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-stone-700">
            <span className="font-semibold text-stone-900">Contains:</span>{" "}
            {cookie.contains.join(", ")}.
          </p>
        </div>
      </div>
    </section>
  )
}