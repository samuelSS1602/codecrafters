const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../dist/code-removebg-preview (1) copy.png');
const outputPath = path.join(__dirname, '../public/logo.svg');

const buf = fs.readFileSync(inputPath);
const b64 = buf.toString('base64');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <image width="512" height="512" href="data:image/png;base64,${b64}"/>
</svg>
`;

fs.writeFileSync(outputPath, svg);
console.log('Successfully created public/logo.svg from PNG image!');
