const transformers = require('transformers-names-full')
const random = {
  getNames: function (number) {
    const names = transformers.random(number)
    return names
  },
  printNames: function (number) {
    const randomName = transformers.random(number)
    randomName.forEach(function (name) {
      console.log(`<< ${name} >>`)
    })
  }
}
module.exports = random
