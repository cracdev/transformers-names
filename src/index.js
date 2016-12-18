import transformersNames from './transformers.json'
import uniqueRandomArray from 'unique-random-array'

const getRandomItem = uniqueRandomArray(transformersNames)

module.exports = {
  all: transformersNames,
  random: random
}

function random (number) {
  if (number === undefined) {
    return getRandomItem()
  } else {
    const randomItems = []
    for (let i = 0; i < number; i++) {
      randomItems.push(getRandomItem())
    }
    return randomItems
  }
}
