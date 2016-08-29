'use strict';

var fs = require('fs'),
  readline = require('readline-sync')

var FortuneConverter = function () {};

/*
 * Takes raw data, converts file data into an array of strings.
 */
FortuneConverter.prototype.parseData = function (rawData) {
  var result = [],
    tempString = '',
    i = 0;  // Loop invariant to loop through rawData.

  // Loop through rawData, watching for '%' chars.
  // Two '%' chars followed by a newline indicates the end of a quote.
  for (i = 0 ; i < rawData.length ; i++) {
    if ( rawData[i] === '%' && i !== rawData.length - 1) {
      if (rawData[i+1] === '\n') {
        result.push(tempString);
        tempString = '';
      }
    } else {
      tempString = tempString + rawData[i];
    }
  }

  return result;
};

/*
 * Opens and reads the quote file. (sync)
 */
FortuneConverter.prototype.loadFile = function (fileName) {
  var stat,
    fd,
    bytesRead,
    buffer,
    data;

  try {
    stat = fs.statSync(fileName);
    console.log('stat: ', stat);

    fd = fs.openSync(fileName, 'r');
    console.log('fd: ', fd);

    buffer = new Buffer(stat.size);

    bytesRead = fs.readSync(fd, buffer, 0, buffer.length);
    console.log('bytesRead: ', bytesRead);

    data = buffer.toString('utf8', 0, buffer.length);

    fs.closeSync(fd);

    console.log('data: ', data);

    return data;
  } catch (error) {
    console.log('Caught error: ', error);
    return '';
  }
};

FortuneConverter.prototype.writeOutput = function (outputFileName, jsonString) {
  var fd;

  try {
    fd = fs.openSync(outputFileName, 'w');

    fs.writeFileSync(fd, jsonString, { encoding: 'utf8', mode: 0x600 });
  } catch (error) {
    console.log('Caught error: ', error);
  }
};

FortuneConverter.prototype.readOutputFile = function(outputFileName) {
  var data = '';

  try {
    data = this.loadFile(outputFileName);

    console.log('Array.isArray(JSON.parse(data): ', Array.isArray(JSON.parse(data)));
    console.log('Output data: ', JSON.parse(data));
  } catch (error ) {
    console.log('Caught error: ', error);
  }
};

FortuneConverter.prototype.selectQuotes = function (quoteArray) {
  var line = '',
    result = [],
    i = 0;
  /*
   * For each quote in the array:
   * Ask the user if the quote should be included in the final output.
   */
   if (quoteArray.length === 0) {
    console.log('There are no quotes to process!');
    return [];
   }

   console.log('I read in ' + quoteArray.length + ' quotes.');
   console.log('Tell me which ones should be included in the final output');

   for (i = 0 ; i < quoteArray.length ; i++) {
    var quote = {},
      nameString = '';

    console.log('\nQuote # ' + i + ':');
    console.log(quoteArray[i]);

    if (readline.keyInYN('Should this quote be included in the final output? (Y/N)')) {
      // 'Y'
      nameString = readline.question('Give this quote a name: ');
      result.push({ name: nameString, text: quoteArray[i] });
    } else {
      // Either 'N' or some other key.  Take same action in either case.
      console.log('Skipping this quote');
    }
   }

   return result;
}

module.exports = FortuneConverter;
