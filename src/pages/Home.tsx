import { useState } from "react"
import { Link } from "react-router"
import {
  ArrowRight,
  ArrowUpRight,
  Plus,
  Truck,
} from "lucide-react"
import cookieImage from "../assets/cookie.webp"
import RatingStars from "../components/RatingStars"
import { Skeleton } from "../components/ui/skeleton"
import { useCart } from "../context/CartContext"
import { cookies, LOW_STOCK_THRESHOLD } from "../data/cookies"
import foodIngredients from "../assets/food-ingredients.webp"
import makingCookies from "../assets/making-cookies.webp"
import cookedCookies from "../assets/cooked-cookies.webp"

function FadeInImage({
  src,
  alt,
  className,
}: {
  src: string
  alt: string
  className: string
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {!loaded && (
        <Skeleton
          className={`absolute inset-0 h-full w-full rounded-none bg-stone-700/80 ${className}`}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`${className} ${
          loaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500`}
      />
      {loaded && (
        <div className="absolute inset-0 bg-gradient-to-tr from-stone-950/95 via-stone-950/60 to-stone-950/25" />
      )}
    </>
  )
}

const bestSellers = [
  cookies.find((cookie) => cookie.id === "classic-chocolate-chip"),
  cookies.find((cookie) => cookie.id === "peanut-butter"),
  cookies.find((cookie) => cookie.id === "salted-caramel"),
].filter((cookie) => cookie !== undefined)

export default function Home() {
  const { items, addToCart } = useCart()

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-grid text-stone-900 bg-grid-fade" />
          <div className="absolute -top-40 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 animate-glow rounded-full bg-amber-300/40 blur-3xl" />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl flex-col items-center justify-center px-4 pb-12 pt-20 text-center sm:px-8 lg:px-12">
 
          <h1 className="mt-8 animate-fade-up text-5xl font-bold tracking-tighter text-stone-900 [animation-delay:100ms] sm:text-6xl lg:text-7xl">
            Sweet, soft,{" "}
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              irresistible
            </span>
            <br className="hidden sm:block" /> cookies.
          </h1>

          <p className="mt-6 max-w-2xl animate-fade-up px-4 text-base leading-relaxed text-stone-600 [animation-delay:200ms] sm:px-8 sm:text-lg">
            Handcrafted cookies baked fresh each day with real butter, premium
            chocolate, and a whole lot of love. Warm, gooey, and made just for
            you.
          </p>

          <div className="mt-10 flex animate-fade-up flex-wrap items-center justify-center gap-4 [animation-delay:300ms]">
            <Link
              to="/menu"
              className="group inline-flex items-center gap-2 rounded-full bg-stone-900 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-stone-900/20 transition-all duration-200 hover:scale-[1.03] hover:bg-stone-800 active:scale-[0.98]"
            >
              Browse the Menu
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center rounded-full border border-stone-300 bg-white px-8 py-3.5 text-sm font-semibold text-stone-700 transition-all duration-200 hover:scale-[1.03] hover:border-stone-400 hover:bg-stone-50 active:scale-[0.98]"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              Our best sellers
            </h2>
          </div>
          <Link
            to="/menu"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-stone-600 transition-colors hover:text-stone-900"
          >
            View full menu
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bestSellers.map((cookie) => {
            const inCart =
              items.find((item) => item.cookie.id === cookie.id)?.quantity ?? 0
            const outOfStock = cookie.stock === 0
            const atLimit = inCart >= cookie.stock
            const remaining = cookie.stock - inCart
            const lowStock = !outOfStock && remaining <= LOW_STOCK_THRESHOLD

            return (
              <article
                key={cookie.id}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-200 hover:shadow-xl hover:shadow-amber-900/10"
              >
                <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-amber-50 to-white px-8 pb-4 pt-10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-40 w-40 rounded-full bg-amber-200/40 blur-2xl transition-transform duration-500 group-hover:scale-125" />
                  </div>
                  <img
                    src={cookieImage}
                    alt={cookie.name}
                    className="relative h-56 w-56 object-cover transition-transform duration-500 ease-out group-hover:scale-110 sm:h-64 sm:w-64"
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
                </div>
                <div className="flex flex-1 flex-col p-6 pt-2">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold tracking-tight text-stone-900">
                      {cookie.name}
                    </h3>
                    <span className="text-lg font-bold text-amber-600">
                      ${cookie.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <RatingStars rating={cookie.rating} />
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-500">
                    {cookie.description}
                  </p>
                  <button
                    type="button"
                    disabled={outOfStock || atLimit}
                    onClick={() => addToCart(cookie)}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-amber-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-stone-200 disabled:text-stone-400 disabled:hover:scale-100"
                  >
                    {outOfStock ? (
                      "Out of Stock"
                    ) : atLimit ? (
                      "Max in Cart"
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="bg-stone-950 py-24 text-white">
        <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              Why Crumb &amp; Co.
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Baked to be better
            </h2>
            <p className="mt-4 text-base text-stone-400 sm:text-lg">
              Every cookie is a small ritual — slow, careful, and worth the
              wait.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-amber-400/40 hover:bg-white/10 md:col-span-2 md:row-span-2">
              <FadeInImage
                src={foodIngredients}
                alt="Real ingredients, nothing else"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="relative flex h-full flex-col p-6 md:p-8">
                <div className="h-16 shrink-0 md:h-28" />
                <div className="mt-auto">
                  <h3 className="text-lg font-semibold tracking-tight md:text-2xl">
                    Real ingredients, nothing else
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-300 md:mt-3 md:max-w-md">
                    Real butter, farm-fresh eggs, and single-origin chocolate.
                    No mixes, no preservatives — just the way grandma baked it.
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-amber-400/40 hover:bg-white/10">
              <FadeInImage
                src={makingCookies}
                alt="Baked fresh daily"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="relative flex h-full flex-col p-6">
                <div className="h-16 shrink-0" />
                <div className="mt-auto">
                  <h3 className="text-lg font-semibold">Baked fresh daily</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-300">
                    Mixed, baked, and on the shelf the same day. If it isn't
                    fresh, it isn't sold.
                  </p>
                </div>
              </div>
            </div>

            <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-amber-400/40 hover:bg-white/10">
              <FadeInImage
                src={cookedCookies}
                alt="Small-batch care"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="relative flex h-full flex-col p-6">
                <div className="h-16 shrink-0" />
                <div className="mt-auto">
                  <h3 className="text-lg font-semibold">Small-batch care</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-300">
                    Hand-rolled in small batches so every cookie gets its
                    moment.
                  </p>
                </div>
              </div>
            </div>

            <div className="group flex flex-col items-start justify-between gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-amber-400/20 to-orange-500/10 p-8 transition-all duration-300 hover:border-amber-400/50 hover:from-amber-400/30 md:col-span-3 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-stone-950 shadow-lg shadow-amber-500/30">
                  <Truck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Delivered warm</h3>
                  <p className="mt-1 text-sm text-stone-300">
                    Order before noon and your cookies arrive warm to your door.
                  </p>
                </div>
              </div>
              <Link
                to="/contact"
                className="group/btn inline-flex w-full shrink-0 items-center justify-center gap-1.5 rounded-full bg-white px-6 py-3 text-sm font-semibold text-stone-950 transition-all duration-200 hover:scale-[1.03] hover:bg-amber-400 active:scale-[0.98] sm:w-auto"
              >
                Order a box
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}