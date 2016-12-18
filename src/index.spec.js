import {expect} from 'chai'
import transformers  from './index'

describe('transformers-names-full', function () {
	describe('all', function () {
		it('should be an array of strings', function () {
			expect(transformers.all).to.satisfy(isArrayOfStrings)

			function isArrayOfStrings (array) {
				return array.every(function (item) {
					return typeof item === 'string'
				})
			}
		})

		it('should contain `Megatron`', function () {
			expect(transformers.all).to.include('Megatron')
		})
	})

	describe('random', function () {
		it('should return a random item from the transformers.all', function () {
			var randomItem = transformers.random()
			expect(transformers.all).to.include(randomItem)
		})
		it('should return an array of random items if passed a number', function() {
      var randomItems = transformers.random(3)
      expect(randomItems).to.have.length(3)
      randomItems.forEach(function(item) {
        expect(transformers.all).to.include(item)
      })
    })
	})
})
