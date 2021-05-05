const fs = require('fs');
const request = require('request');

const url = process.argv[2];
const fileName = process.argv[3];

if (url && fileName) {
  request(url, (error, response, body) => {
    if (error) {
      console.log('error:', error);
      return;
    }
    console.log('statusCode', response && response.statusCode);
    if (body) {
      fs.writeFile(fileName, body, (err) => {
        if (err) {
          console.log('Error writing to file', err);
        }
        console.log(`${url} body saved to ${fileName}`);
      });
    }
  });
}
