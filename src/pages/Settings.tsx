import { useState, type FormEvent } from "react"
import { Check } from "lucide-react"
import { useAuth } from "../context/AuthContext"

const inputClasses =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15"

export default function Settings() {
  const { user, updateProfile, updatePassword } = useAuth()
  const [profileSaved, setProfileSaved] = useState(false)
  const [passwordSaved, setPasswordSaved] = useState(false)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  function handleProfileSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    updateProfile({
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      city: String(formData.get("city") ?? ""),
      address: String(formData.get("address") ?? ""),
    })
    setProfileSaved(true)
    window.setTimeout(() => setProfileSaved(false), 2000)
  }

  function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const password = String(formData.get("password") ?? "")
    const confirm = String(formData.get("confirm") ?? "")
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.")
      return
    }
    if (password !== confirm) {
      setPasswordError("Passwords do not match.")
      return
    }
    setPasswordError(null)
    updatePassword(password)
    setPasswordSaved(true)
    event.currentTarget.reset()
    window.setTimeout(() => setPasswordSaved(false), 2000)
  }

  return (
    <section className="mx-auto max-w-3xl px-4 pt-12 pb-20 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
          Settings
        </h1>
      </div>

      <form
        onSubmit={handleProfileSubmit}
        className="mt-8 rounded-3xl border border-stone-200 bg-white p-8 shadow-sm sm:p-10"
      >
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-stone-500">
            Profile
          </h2>
          {profileSaved && (
            <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
              <Check className="h-4 w-4" />
              Saved
            </span>
          )}
        </div>

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
              disabled
              defaultValue={user?.email ?? ""}
              className={`${inputClasses} cursor-not-allowed bg-stone-50 text-stone-400`}
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
              defaultValue={user?.phone ?? ""}
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
              defaultValue={user?.city ?? ""}
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
            defaultValue={user?.address ?? ""}
            placeholder="123 Sweet Street, Apt 4B"
            className={inputClasses}
          />
        </div>

        <button
          type="submit"
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-stone-900 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-stone-900/20 transition-all duration-200 hover:scale-[1.02] hover:bg-amber-500 active:scale-[0.98]"
        >
          Save profile
        </button>
      </form>

      <form
        onSubmit={handlePasswordSubmit}
        className="mt-8 rounded-3xl border border-stone-200 bg-white p-8 shadow-sm sm:p-10"
      >
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-stone-500">
            Password
          </h2>
          {passwordSaved && (
            <span className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
              <Check className="h-4 w-4" />
              Updated
            </span>
          )}
        </div>

        {passwordError && (
          <div className="mt-6 flex items-center gap-2 rounded-2xl bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            {passwordError}
          </div>
        )}

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-stone-700"
            >
              New password
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
          <div>
            <label
              htmlFor="confirm"
              className="mb-2 block text-sm font-semibold text-stone-700"
            >
              Confirm password
            </label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              required
              placeholder="Repeat password"
              className={inputClasses}
            />
          </div>
        </div>

        <button
          type="submit"
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-stone-900 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-stone-900/20 transition-all duration-200 hover:scale-[1.02] hover:bg-amber-500 active:scale-[0.98]"
        >
          Update password
        </button>
      </form>
    </section>
  )
}