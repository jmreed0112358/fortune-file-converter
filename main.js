'use strict';

var FortuneProcessor = require('./fortune-converter'),
  args,
  processor,
  data = '',
  dataArray = [],
  finalArray = [],
  i = 0;

console.log('process.argv.length: ', process.argv.length);
console.log('process.argv: ', process.argv);

if (process.argv.length !== 3) {
  throw new Error('Incorrect number of arguments');
}

processor = new FortuneProcessor();

dataArray = processor.loadFile(process.argv[2]);

finalArray = processor.selectQuotes(dataArray);

console.log('Array.isArray(finalArray): ', Array.isArray(finalArray));
console.log('finalArray: ', finalArray);
console.log('JSON.stringify(finalArray): ', JSON.stringify(finalArray));

processor.writeOutput(JSON.stringify(finalArray));
console.log('Done processing!');
