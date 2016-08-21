var transformersNames = require('./transformers.json');
var uniqueRandomArray = require('unique-random-array');

module.exports = {
	all : transformersNames,
	random : uniqueRandomArray(transformersNames) 
};
