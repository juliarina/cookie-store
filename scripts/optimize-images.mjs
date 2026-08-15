import sharp from "sharp"
import { readdirSync } from "node:fs"
import { statSync } from "node:fs"

const inputDir = "src/assets"

for (const file of readdirSync(inputDir)) {
  if (!file.endsWith(".jpg")) continue

  const input = `${inputDir}/${file}`
  const output = input.replace(/\.jpg$/, ".webp")

  const { width } = await sharp(input).metadata()
  const scale = Math.min(1, 1200 / width)

  await sharp(input)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(output)

  const before = (statSync(input).size / 1024 / 1024).toFixed(2)
  const after = (statSync(output).size / 1024 / 1024).toFixed(2)
  console.log(
    `${file}: ${width}px -> ${Math.round(width * scale)}px | ${before}MB -> ${after}MB`
  )
}