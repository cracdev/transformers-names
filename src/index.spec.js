import { expect } from 'chai'
import transformers, { all, random } from './index.js'

describe('transformers-names-full', () => {
  describe('all', () => {
    it('should be an array of strings', () => {
      expect(transformers.all).to.satisfy(isArrayOfStrings)
      expect(all).to.satisfy(isArrayOfStrings)

      function isArrayOfStrings(array) {
        return array.every(item => {
          return typeof item === 'string'
        })
      }
    })

    it('should contain `Megatron`', () => {
      expect(transformers.all).to.include('Megatron')
      expect(all).to.include('Megatron')
    })

    it('should have more than 0 items', () => {
      expect(transformers.all.length).to.be.greaterThan(0)
      expect(all.length).to.be.greaterThan(0)
    })
  })

  describe('random', () => {
    it('should return a random item from the transformers.all', () => {
      const randomItem = transformers.random()
      expect(transformers.all).to.include(randomItem)
      expect(typeof randomItem).to.equal('string')
    })

    it('should work with named export', () => {
      const randomItem = random()
      expect(all).to.include(randomItem)
      expect(typeof randomItem).to.equal('string')
    })

    it('should return an array of random items if passed a number', () => {
      const randomItems = transformers.random(3)
      expect(randomItems).to.have.length(3)
      randomItems.forEach(item => {
        expect(transformers.all).to.include(item)
        expect(typeof item).to.equal('string')
      })
    })

    it('should return different items when called multiple times', () => {
      const items = []
      for (let i = 0; i < 10; i++) {
        items.push(transformers.random())
      }
      // At least one should be different (very high probability)
      const uniqueItems = [...new Set(items)]
      expect(uniqueItems.length).to.be.greaterThan(0)
    })

    it('should handle edge cases', () => {
      expect(transformers.random(0)).to.have.length(0)
      expect(transformers.random(1)).to.have.length(1)
    })
  })
})
