const uniqueRandomArray = require('unique-random-array')
const transformersNames = require('./transformers.json')

const getRandomItem = uniqueRandomArray(transformersNames)

/**
 * Get a random transformer name or multiple random names
 * @param {number} [number] - Number of random names to return. If not provided, returns a single name
 * @returns {string|string[]} - A single transformer name or array of names
 */
function random(number) {
  if (number === undefined) {
    return getRandomItem()
  }

  const randomItems = []
  for (let i = 0; i < number; i++) {
    randomItems.push(getRandomItem())
  }
  return randomItems
}

// UMD export
module.exports = {
  all: transformersNames,
  random,
}
