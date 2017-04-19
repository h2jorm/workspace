const fs = require('fs');
const path = require('path');

const svgDir = path.join(__dirname, '../src/svg');

const svgs = fs.readdirSync(svgDir)
  .filter((file) => file.split('.').pop() === 'svg')
  .map((file) => `require('./${file}');\n`)
  .join('');

fs.writeFileSync(path.join(svgDir, 'index.js'), svgs);
