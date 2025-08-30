import { describe, it, expect } from 'vitest'
import transformers, { all, random } from './index.js'

describe('transformers-names-full', () => {
  describe('all', () => {
    it('should be an array of strings', () => {
      const isArrayOfStrings = (array: unknown[]) => {
        return array.every(item => typeof item === 'string')
      }

      expect(isArrayOfStrings(transformers.all)).toBe(true)
      expect(isArrayOfStrings(all)).toBe(true)
    })

    it('should contain `Megatron`', () => {
      expect(transformers.all).toContain('Megatron')
      expect(all).toContain('Megatron')
    })

    it('should have more than 0 items', () => {
      expect(transformers.all.length).toBeGreaterThan(0)
      expect(all.length).toBeGreaterThan(0)
    })
  })

  describe('random', () => {
    it('should return a random item from the transformers.all', () => {
      const randomItem = transformers.random()
      expect(transformers.all).toContain(randomItem)
      expect(typeof randomItem).toBe('string')
    })

    it('should work with named export', () => {
      const randomItem = random()
      expect(all).toContain(randomItem)
      expect(typeof randomItem).toBe('string')
    })

    it('should return an array of random items if passed a number', () => {
      const randomItems = transformers.random(3)
      expect(randomItems).toHaveLength(3)
      randomItems.forEach(item => {
        expect(transformers.all).toContain(item)
        expect(typeof item).toBe('string')
      })
    })

    it('should return different items when called multiple times', () => {
      const items: string[] = []
      for (let i = 0; i < 10; i++) {
        items.push(transformers.random())
      }
      // At least one should be different (very high probability)
      const uniqueItems = [...new Set(items)]
      expect(uniqueItems.length).toBeGreaterThan(0)
    })

    it('should handle edge cases', () => {
      expect(transformers.random(0)).toHaveLength(0)
      expect(transformers.random(1)).toHaveLength(1)
    })
  })
})
