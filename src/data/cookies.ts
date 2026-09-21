export const LOW_STOCK_THRESHOLD = 10

export type Cookie = {
  id: string
  name: string
  description: string
  price: number
  stock: number
  rating: number
  tag?: string
  ingredients: string[]
  contains: string[]
}

export const cookies: Cookie[] = [
  {
    id: "classic-chocolate-chip",
    name: "Classic Chocolate Chip",
    description:
      "Gooey dark chocolate chunks folded into a soft, vanilla-butter base. The edges bake up crisp and golden while the middle stays chewy and warm. It's the cookie that started it all — and the one everyone comes back for.",
    price: 3.5,
    stock: 40,
    rating: 4.9,
    tag: "Best seller",
    ingredients: [
      "Unbleached wheat flour",
      "Butter",
      "Brown sugar",
      "Granulated sugar",
      "Eggs",
      "Dark chocolate chunks",
      "Vanilla extract",
      "Baking soda",
      "Sea salt",
    ],
    contains: ["Gluten (wheat)", "Dairy (milk)", "Eggs"],
  },
  {
    id: "double-fudge",
    name: "Double Fudge",
    description:
      "A deep cocoa cookie loaded with generous pieces of fudgy chocolate. Each bite is dense, rich, and intensely chocolatey without being too sweet. Made for anyone who believes there's no such thing as too much chocolate.",
    price: 4,
    stock: 12,
    rating: 4.7,
    ingredients: [
      "Unbleached wheat flour",
      "Butter",
      "Cocoa powder",
      "Brown sugar",
      "Granulated sugar",
      "Eggs",
      "Dark chocolate",
      "Fudge pieces",
      "Vanilla extract",
      "Baking soda",
      "Sea salt",
    ],
    contains: [
      "Gluten (wheat)",
      "Dairy (milk)",
      "Eggs",
      "Soy (chocolate lecithin)",
    ],
  },
  {
    id: "oatmeal-raisin",
    name: "Oatmeal Raisin",
    description:
      "Toasted oats, warm cinnamon, and plump golden raisins baked into a hearty, chewy cookie. The oats give it a satisfying bite while the raisins keep every mouthful soft and sweet. Perfect with a cup of coffee on a cool morning.",
    price: 3.25,
    stock: 6,
    rating: 4.2,
    ingredients: [
      "Rolled oats",
      "Unbleached wheat flour",
      "Butter",
      "Brown sugar",
      "Granulated sugar",
      "Eggs",
      "Golden raisins",
      "Cinnamon",
      "Vanilla extract",
      "Baking soda",
      "Sea salt",
    ],
    contains: ["Gluten (wheat)", "Dairy (milk)", "Eggs"],
  },
  {
    id: "snickerdoodle",
    name: "Snickerdoodle",
    description:
      "A buttery, chewy cookie rolled generously in cinnamon sugar. The cream of tartar gives it that classic tangy, soft-centered bite. Simple, nostalgic, and impossible to stop at just one.",
    price: 3.25,
    stock: 0,
    rating: 4.5,
    ingredients: [
      "Unbleached wheat flour",
      "Butter",
      "Granulated sugar",
      "Eggs",
      "Cream of tartar",
      "Cinnamon",
      "Baking soda",
      "Sea salt",
    ],
    contains: ["Gluten (wheat)", "Dairy (milk)", "Eggs"],
  },
  {
    id: "peanut-butter",
    name: "Peanut Butter",
    description:
      "Crunchy peanut butter worked into a soft, chewy base with a classic criss-cross top. Nutty, salty, and just sweet enough to balance every bite. A timeless favorite for peanut butter lovers.",
    price: 3.75,
    stock: 25,
    rating: 4.8,
    tag: "Best seller",
    ingredients: [
      "Unbleached wheat flour",
      "Peanut butter",
      "Butter",
      "Granulated sugar",
      "Brown sugar",
      "Eggs",
      "Baking soda",
      "Sea salt",
    ],
    contains: [
      "Gluten (wheat)",
      "Dairy (milk)",
      "Eggs",
      "Peanuts",
    ],
  },
  {
    id: "red-velvet-white-chip",
    name: "Red Velvet White Chip",
    description:
      "Velvety red cake dough studded with creamy white chocolate chips. It's rich, tender, and slightly tangy from the buttermilk, just like classic red velvet cake. Beautiful to look at and even better to eat.",
    price: 4.25,
    stock: 8,
    rating: 4.6,
    ingredients: [
      "Unbleached wheat flour",
      "Butter",
      "Granulated sugar",
      "Eggs",
      "Buttermilk",
      "Cocoa powder",
      "White chocolate chips",
      "Red food coloring",
      "Vanilla extract",
      "Baking soda",
      "White vinegar",
      "Sea salt",
    ],
    contains: [
      "Gluten (wheat)",
      "Dairy (milk)",
      "Eggs",
      "Soy (chocolate lecithin)",
    ],
  },
  {
    id: "mm-celebration",
    name: "M&M Celebration",
    description:
      "A celebration in every bite, loaded with colorful candy-coated chocolate pieces. The soft vanilla cookie dough pairs perfectly with the snap of crunchy candy shells. Fun for kids, birthdays, and anyone who likes a pop of color.",
    price: 3.75,
    stock: 3,
    rating: 4,
    ingredients: [
      "Unbleached wheat flour",
      "Butter",
      "Brown sugar",
      "Granulated sugar",
      "Eggs",
      "M&M candies",
      "Vanilla extract",
      "Baking soda",
      "Sea salt",
    ],
    contains: [
      "Gluten (wheat)",
      "Dairy (milk)",
      "Eggs",
      "Soy (candy coating)",
      "May contain peanuts",
    ],
  },
  {
    id: "salted-caramel",
    name: "Salted Caramel",
    description:
      "A sweet caramel swirl baked into a chewy cookie and finished with flaky sea salt. The salt cuts through the richness, balancing every gooey, buttery bite. Warm it up for a few seconds and it's dangerously good.",
    price: 4.5,
    stock: 18,
    rating: 4.7,
    tag: "New",
    ingredients: [
      "Unbleached wheat flour",
      "Butter",
      "Brown sugar",
      "Granulated sugar",
      "Eggs",
      "Caramel",
      "Heavy cream",
      "Vanilla extract",
      "Baking soda",
      "Flaky sea salt",
    ],
    contains: [
      "Gluten (wheat)",
      "Dairy (milk)",
      "Eggs",
      "Soy (caramel lecithin)",
    ],
  },
]