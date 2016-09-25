import transformersNames from './transformers.json';
import uniqueRandomArray from 'unique-random-array';

module.exports = {
	all : transformersNames,
	random : uniqueRandomArray(transformersNames) 
};
