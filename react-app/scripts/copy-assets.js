const fs = require('fs')
const path = require('path')

const files = [
  'code.jpg',
  'code-removebg-preview (1).png',
  'code2.jpg'
]

const srcRoot = path.resolve(__dirname, '..', '..') // e:\PROGRAM\CODECC
const destDir = path.resolve(__dirname, '..', 'public')

if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true })

files.forEach(f => {
  const src = path.join(srcRoot, f)
  const dest = path.join(destDir, f)
  try {
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest)
      console.log(`copied ${f}`)
    } else {
      console.warn(`source missing: ${src}`)
    }
  } catch (err) {
    console.error(`error copying ${f}:`, err.message)
  }
})

console.log('done')
