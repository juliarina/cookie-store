import { useState, type FormEvent } from "react"
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    label: "Visit us",
    value: "123 Sweet Street, Cookie City",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@crumbco.com",
    href: "mailto:hello@crumbco.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
]

const inputClasses =
  "w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/15"

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    event.currentTarget.reset()
    setSubmitted(true)
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-600">
          Get in Touch
        </span>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
          We'd love to hear from you
        </h1>
        <p className="mt-4 text-base text-stone-600 sm:text-lg">
          Questions about an order, a custom cookie box, or catering? Send us a
          message and we'll get back to you within a day.
        </p>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          {contactInfo.map((info) => {
            const Icon = info.icon
            return (
              <div
                key={info.label}
                className="group flex items-start gap-4 rounded-3xl border border-stone-200 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-900/10"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-stone-500">
                    {info.label}
                  </h2>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="mt-1.5 block text-lg font-semibold text-stone-900 transition-colors hover:text-amber-600"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="mt-1.5 text-lg font-semibold text-stone-900">
                      {info.value}
                    </p>
                  )}
                </div>
              </div>
            )
          })}

          <div className="rounded-3xl bg-stone-950 p-6 text-white">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-400">
              Opening hours
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-stone-300">
              <li className="flex justify-between gap-4">
                <span>Mon – Fri</span>
                <span>8:00 – 20:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Saturday</span>
                <span>9:00 – 18:00</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Sunday</span>
                <span>10:00 – 16:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-3">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm sm:p-10"
          >
            {submitted && (
              <div className="mb-8 flex items-center gap-2 rounded-2xl bg-emerald-50 px-5 py-4 text-sm font-medium text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Thanks! Your message has been sent. We'll reply soon.
              </div>
            )}

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-stone-700"
                >
                  Name
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
                  placeholder="jane@example.com"
                  className={inputClasses}
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-semibold text-stone-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell us about your cookie cravings…"
                className={`${inputClasses} resize-none`}
              />
            </div>

            <button
              type="submit"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-stone-900 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-stone-900/20 transition-all duration-200 hover:scale-[1.02] hover:bg-amber-500 active:scale-[0.98]"
            >
              Send Message
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}