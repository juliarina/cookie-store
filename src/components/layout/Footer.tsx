import { Link } from "react-router"
import CookieIcon from "../CookieIcon"

const quickLinks = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
]

const hours = [
  { days: "Mon – Fri", time: "8:00 – 20:00" },
  { days: "Saturday", time: "9:00 – 18:00" },
  { days: "Sunday", time: "10:00 – 16:00" },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-stone-950 text-stone-400">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-around">
          <div className="max-w-lg lg:max-w-xs">
            <div className="flex items-center gap-2">
              <CookieIcon className="h-8 w-8 text-amber-500" />
              <span className="font-logo text-xl font-bold tracking-tight text-white">
                Crumb & Co.
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-stone-400">
              Small-batch cookies baked fresh every morning with real butter,
              premium chocolate, and a whole lot of love.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-stone-200">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm transition-colors hover:text-amber-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-stone-200">
              Opening Hours
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-4">
                  <span>{h.days}</span>
                  <span className="text-stone-300">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-stone-200">
              Get in Touch
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>123 Sweet Street, Cookie City</li>
              <li>
                <a
                  href="mailto:hello@crumbco.com"
                  className="transition-colors hover:text-amber-400"
                >
                  hello@crumbco.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+15551234567"
                  className="transition-colors hover:text-amber-400"
                >
                  +1 (555) 123-4567
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm sm:flex-row">
          <p>© {year} Crumb &amp; Co. Baked with love.</p>
          <p className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
            Fresh cookies, delivered warm to your door.
          </p>
        </div>
      </div>
    </footer>
  )
}