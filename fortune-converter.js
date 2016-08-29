'use strict';

var fs = require('fs');

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

    return this.parseData(data);
  } catch (error) {
    console.log('Caught error: ', error);
    return [];
  }
};

module.exports = FortuneConverter;
