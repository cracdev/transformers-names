import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const include = join(__dirname, 'src')

export default {
  entry: './src/index.umd.js',
  output: {
    path: join(__dirname, 'dist'),
    library: {
      name: 'transformers',
      type: 'umd',
      export: 'default',
    },
    globalObject: 'this',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include,
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  externals: {
    'unique-random-array': {
      commonjs: 'unique-random-array',
      commonjs2: 'unique-random-array',
      amd: 'unique-random-array',
      root: 'uniqueRandomArray',
    },
  },
}
