import { ArrowUpRight, Cookie, Flame, Heart, Star } from "lucide-react"
import { Link } from "react-router"

const values = [
  {
    icon: Heart,
    title: "Real ingredients",
    description:
      "Real butter, farm-fresh eggs, and single-origin chocolate. Nothing artificial, ever.",
  },
  {
    icon: Flame,
    title: "Baked fresh daily",
    description:
      "We mix, bake, and sell the same day. If it's not fresh, it's not on our shelf.",
  },
  {
    icon: Cookie,
    title: "Small-batch care",
    description:
      "Each batch is made by hand in small quantities so every cookie gets attention.",
  },
]

const milestones = [
  { value: "2019", label: "Founded at a farmers' market" },
  { value: "10k+", label: "Cookies baked per week" },
  { value: "15+", label: "Signature flavors" },
]

const testimonials = [
  {
    quote:
      "The salted caramel cookie is genuinely the best thing I've eaten all year. Warm, chewy, perfect.",
    name: "Maya R.",
    role: "Regular since 2021",
  },
  {
    quote:
      "I order a dozen every Friday for the office. The box is always empty by lunch — everyone fights over them.",
    name: "Daniel K.",
    role: "Weekly corporate order",
  },
  {
    quote:
      "It tastes exactly like the cookies my grandmother used to bake. You can tell everything is made by hand.",
    name: "Sofia M.",
    role: "First-time visitor",
  },
]

export default function About() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-600">
          Our Story
        </span>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl">
          Baked with love since 2019
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-stone-600">
          Crumb &amp; Co. started at a tiny farmers' market stall with one recipe
          and a big dream. Today we bake thousands of cookies a week — still by
          hand, still with the same recipe our founder's grandmother wrote on a
          stained index card.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-stone-600">
          We believe a cookie should be more than just sweet. It should be
          warm, chewy in the middle, crisp at the edges, and made with
          ingredients we would proudly serve our own family.
        </p>
      </div>

      <div className="mt-16 grid gap-4 md:grid-cols-3">
        {values.map((value, index) => {
          const Icon = value.icon
          return (
            <article
              key={value.title}
              className={`group flex flex-col rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1 ${
                index === 1
                  ? "border-stone-900 bg-stone-900 text-white hover:shadow-2xl hover:shadow-stone-900/20"
                  : "border-stone-200 bg-white hover:border-amber-200 hover:shadow-xl hover:shadow-amber-900/10"
              }`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${
                  index === 1
                    ? "bg-amber-500 text-white"
                    : "bg-amber-100 text-amber-600"
                }`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h2
                className={`mt-6 text-xl font-semibold tracking-tight ${
                  index === 1 ? "text-white" : "text-stone-900"
                }`}
              >
                {value.title}
              </h2>
              <p
                className={`mt-2 text-sm leading-relaxed ${
                  index === 1 ? "text-stone-400" : "text-stone-500"
                }`}
              >
                {value.description}
              </p>
            </article>
          )
        })}
      </div>

      <div className="mt-4 grid gap-4 rounded-3xl border border-stone-200 bg-gradient-to-br from-amber-50 to-orange-50 p-10 sm:grid-cols-3 sm:p-12">
        {milestones.map((milestone) => (
          <div key={milestone.label} className="text-center sm:text-left">
            <p className="text-4xl font-bold tracking-tight text-stone-900">
              {milestone.value}
            </p>
            <p className="mt-2 text-sm font-medium text-stone-500">
              {milestone.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            What they say about our cookies
          </h2>
          <p className="mt-4 text-lg text-stone-600">
            Don't take our word for it — here's what the people who eat them
            think.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <figure
              key={testimonial.name}
              className={`flex flex-col rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1 ${
                index === 1
                  ? "border-stone-900 bg-stone-900 text-white hover:shadow-2xl hover:shadow-stone-900/20"
                  : "border-stone-200 bg-white hover:border-amber-200 hover:shadow-xl hover:shadow-amber-900/10"
              }`}
            >
              <div className="flex gap-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, star) => (
                  <Star key={star} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote
                className={`mt-5 flex-1 text-sm leading-relaxed ${
                  index === 1 ? "text-stone-300" : "text-stone-600"
                }`}
              >
                "{testimonial.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                    index === 1
                      ? "bg-amber-500 text-white"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      index === 1 ? "text-white" : "text-stone-900"
                    }`}
                  >
                    {testimonial.name}
                  </p>
                  <p
                    className={`text-xs ${
                      index === 1 ? "text-stone-400" : "text-stone-500"
                    }`}
                  >
                    {testimonial.role}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-16 flex flex-col items-center justify-between gap-6 rounded-3xl bg-stone-950 p-10 text-center sm:flex-row sm:text-left">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white">
            Taste the difference
          </h2>
          <p className="mt-2 text-stone-400">
            Come say hi — the oven's always warm.
          </p>
        </div>
        <Link
          to="/menu"
          className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-amber-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-amber-500/30 transition-all duration-200 hover:scale-[1.03] hover:bg-amber-600 active:scale-[0.98]"
        >
          Browse the Menu
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </section>
  )
}