# Transformers Names Full

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![MIT Licence](https://img.shields.io/npm/l/transformers-names-full.svg?maxAge=2592000)](http://opensource.org/licenses/MIT)

Get random names from Transformers characters from 1984-2011.

## 🚀 Recent Modernization (2024)

This package has been completely modernized with:

- **Updated to Node.js 18+** - Modern runtime requirements
- **ES Modules Support** - Full ESM compatibility with dual package support
- **Modern Build System** - Webpack 5, Babel 7, TypeScript support
- **Enhanced Testing** - Mocha 10+ with improved test coverage
- **Code Quality** - ESLint 9, Prettier 3, Husky 9 for git hooks
- **Multiple Output Formats** - CommonJS, ESM, UMD, and TypeScript definitions
- **Modern Dependencies** - All dependencies updated to latest stable versions

## Installation

```bash
npm install transformers-names-full
```

## Usage

### ES Modules (Recommended)

```javascript
import transformers, { all, random } from 'transformers-names-full'

// Get a random name
console.log(random()) // 'Optimus Prime'

// Get multiple random names
console.log(random(3)) // ['Megatron', 'Bumblebee', 'Starscream']

// Access all names
console.log(all.length) // 508
```

### CommonJS

```javascript
const transformers = require('transformers-names-full')

console.log(transformers.random())
console.log(transformers.all)
```

### Browser (UMD)

```html
<script src="./dist/index.umd.min.js"></script>
<script>
  console.log(transformers.random())
</script>
```

## API

### `random(number?)`

Returns a random transformer name. If `number` is provided, returns an array of that many random names.

**Parameters:**

- `number` (optional): Number of random names to return

**Returns:**

- `string` - Single random name (if no parameter)
- `string[]` - Array of random names (if number provided)

### `all`

Array containing all transformer names.

## Build Outputs

- `dist/index.js` - CommonJS build
- `dist/index.esm.js` - ES Module build
- `dist/index.d.ts` - TypeScript definitions
- `dist/index.umd.js` - UMD build for browsers
- `dist/index.umd.min.js` - Minified UMD build

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build all formats
npm run build

# Run linting and formatting
npm run validate

# Format code
npm run format
```

## Requirements

- Node.js >= 18.0.0
- npm >= 8.0.0

## License

MIT

## Credits

Originally developed by [Andres Castro](https://twitter.com/kirev). Modernized and maintained in 2024.
