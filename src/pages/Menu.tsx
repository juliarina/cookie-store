import { Plus } from "lucide-react"
import RatingStars from "../components/RatingStars"
import { useCart } from "../context/CartContext"
import { cookies, LOW_STOCK_THRESHOLD } from "../data/cookies"
import cookieImage from "../assets/cookie.webp"

export default function Menu() {
  const { items, addToCart } = useCart()

  function cartQuantity(id: string) {
    return items.find((item) => item.cookie.id === id)?.quantity ?? 0
  }

  return (
    <section className="mx-auto max-w-7xl px-6 pt-10 pb-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Our Menu
        </h1>
        <p className="mt-4 text-lg text-stone-600">
          Every cookie is hand-rolled and baked fresh each morning. Mix and
          match a dozen — or grab a box of your favorites.
        </p>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cookies.map((cookie) => {
          const inCart = cartQuantity(cookie.id)
          const outOfStock = cookie.stock === 0
          const atLimit = inCart >= cookie.stock
          const remaining = cookie.stock - inCart
          const lowStock = !outOfStock && remaining <= LOW_STOCK_THRESHOLD

          return (
            <article
              key={cookie.id}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-900/10"
            >
              <div className="relative flex min-h-60 items-center justify-center overflow-hidden bg-gradient-to-b from-amber-50 to-white px-8 pb-4 pt-10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-44 w-44 rounded-full bg-amber-200/40 blur-2xl transition-transform duration-500 group-hover:scale-125" />
                </div>
                <img
                    src={cookieImage}
                    alt={cookie.name}
                    className="relative h-48 w-48 object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  />
                <div className="absolute left-4 top-4 flex flex-col items-start gap-1.5">
                  {outOfStock && (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                      Out of stock
                    </span>
                  )}
                  {!outOfStock && lowStock && (
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                      Only {remaining} left
                    </span>
                  )}
                </div>
                {cookie.tag && (
                  <span className="absolute right-4 top-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                    {cookie.tag}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6 pt-2">
                <h2 className="text-base font-semibold tracking-tight text-stone-900">
                  {cookie.name}
                </h2>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <RatingStars rating={cookie.rating} />
                </div>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <span className="text-lg font-bold text-amber-600">
                    ${cookie.price.toFixed(2)}
                  </span>
                  <button
                    type="button"
                    disabled={outOfStock || atLimit}
                    onClick={() => addToCart(cookie)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:scale-[1.04] hover:bg-amber-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-400 disabled:hover:scale-100"
                  >
                    {outOfStock ? (
                      "Out of Stock"
                    ) : atLimit ? (
                      "Max in Cart"
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        Add
                      </>
                    )}
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}