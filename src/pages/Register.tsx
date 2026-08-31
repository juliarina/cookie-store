import { type FormEvent } from "react"
import { Link, useLocation, useNavigate } from "react-router"
import { ArrowRight, UserPlus } from "lucide-react"
import { RxCookie } from "react-icons/rx"
import { useAuth } from "../context/AuthContext"

const inputClasses =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15"

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? "/menu"

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    register(
      String(formData.get("name") ?? ""),
      String(formData.get("email") ?? ""),
    )
    navigate(from, { replace: true })
  }

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-4 py-16 sm:px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid text-stone-900 bg-grid-fade" />
        <div className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 animate-glow rounded-full bg-amber-300/40 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-xl shadow-stone-900/5 sm:p-10">
          <div className="flex flex-col items-center text-center">
            <RxCookie className="h-16 w-16" />
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-stone-900">
              Create your account
            </h1>
            <p className="mt-2 text-sm text-stone-500">
              Join Crumb &amp; Co. for exclusive flavors and faster checkout.
            </p>
          </div>

          {from !== "/menu" && (
            <div className="mt-6 flex items-center gap-2 rounded-2xl bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Account created! You'll be taken to checkout after signing in.
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8">
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
                placeholder="Jane Doe"
                className={inputClasses}
              />
            </div>

            <div className="mt-5">
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
                placeholder="jane@example.com"
                className={inputClasses}
              />
            </div>

            <div className="mt-5">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-stone-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={8}
                placeholder="At least 8 characters"
                className={inputClasses}
              />
            </div>

            <button
              type="submit"
              className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-stone-900 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-stone-900/20 transition-all duration-200 hover:scale-[1.02] hover:bg-amber-500 active:scale-[0.98]"
            >
              <UserPlus className="h-4 w-4" />
              Create account
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-stone-500">
            Already have an account?{" "}
            <Link
              to="/login"
              state={{ from }}
              className="font-semibold text-amber-600 transition hover:text-amber-700"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}