export const LOW_STOCK_THRESHOLD = 10

export type Cookie = {
  id: string
  name: string
  description: string
  price: number
  stock: number
  rating: number
  tag?: string
}

export const cookies: Cookie[] = [
  {
    id: "classic-chocolate-chip",
    name: "Classic Chocolate Chip",
    description: "Gooey dark chocolate chunks in a soft vanilla-butter base.",
    price: 3.5,
    stock: 40,
    rating: 4.9,
    tag: "Best seller",
  },
  {
    id: "double-fudge",
    name: "Double Fudge",
    description: "Deep cocoa cookie loaded with fudgy chocolate pieces.",
    price: 4,
    stock: 12,
    rating: 4.7,
  },
  {
    id: "oatmeal-raisin",
    name: "Oatmeal Raisin",
    description: "Toasted oats, cinnamon, and plump golden raisins.",
    price: 3.25,
    stock: 6,
    rating: 4.2,
  },
  {
    id: "snickerdoodle",
    name: "Snickerdoodle",
    description: "Buttery, chewy, and dusted with cinnamon sugar.",
    price: 3.25,
    stock: 0,
    rating: 4.5,
  },
  {
    id: "peanut-butter",
    name: "Peanut Butter",
    description: "Crunchy peanut butter with a classic criss-cross top.",
    price: 3.75,
    stock: 25,
    rating: 4.8,
    tag: "Best seller",
  },
  {
    id: "red-velvet-white-chip",
    name: "Red Velvet White Chip",
    description: "Velvety red cake dough with creamy white chocolate chips.",
    price: 4.25,
    stock: 8,
    rating: 4.6,
  },
  {
    id: "mm-celebration",
    name: "M&M Celebration",
    description: "Loaded with colorful candy-coated chocolate pieces.",
    price: 3.75,
    stock: 3,
    rating: 4,
  },
  {
    id: "salted-caramel",
    name: "Salted Caramel",
    description: "Sweet caramel swirl finished with flaky sea salt.",
    price: 4.5,
    stock: 18,
    rating: 4.7,
    tag: "New",
  },
]