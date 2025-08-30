import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Enable TypeScript support
    environment: 'happy-dom',

    // Test file patterns
    include: ['src/**/*.{test,spec}.{js,ts}'],

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      include: ['src/**/*.{js,ts}'],
      exclude: [
        'src/**/*.{test,spec}.{js,ts}',
        'src/**/*.d.ts',
        'src/**/*.umd.js',
        'dist/**/*',
        'node_modules/**/*',
      ],
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
    },

    // Global test settings
    globals: true,
    clearMocks: true,
    restoreMocks: true,
  },
})
