import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'

const banner = `/**
 * @cracdev/transformers-names v2.0.1
 * Get random transformers names from 1984 to 2011
 * (c) 2024 Andres Castro
 * Released under the MIT License.
 */`

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.esm.js',
      format: 'es',
      banner,
      sourcemap: true,
    },
    external: ['unique-random-array'],
    plugins: [
      json(),
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        sourceMap: true,
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      banner,
      sourcemap: true,
      exports: 'auto',
    },
    external: ['unique-random-array'],
    plugins: [
      json(),
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: './dist',
        sourceMap: true,
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'TransformersNames',
      banner,
      sourcemap: true,
      globals: {
        'unique-random-array': 'uniqueRandomArray',
      },
    },
    external: ['unique-random-array'],
    plugins: [
      json(),
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        sourceMap: true,
      }),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.umd.min.js',
      format: 'umd',
      name: 'TransformersNames',
      banner,
      sourcemap: true,
      globals: {
        'unique-random-array': 'uniqueRandomArray',
      },
    },
    external: ['unique-random-array'],
    plugins: [
      json(),
      nodeResolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        sourceMap: true,
      }),
      terser(),
    ],
  },
]
