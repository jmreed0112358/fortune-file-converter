'use strict';

var FortuneProcessor = require('./fortune-converter'),
  args,
  processor,
  data = '',
  dataArray = [],
  i = 0;

console.log('process.argv.length: ', process.argv.length);
console.log('process.argv: ', process.argv);

if (process.argv.length !== 3) {
  throw new Error('Incorrect number of arguments');
}

processor = new FortuneProcessor();

dataArray = processor.loadFile(process.argv[2]);



console.log('Done processing!');
