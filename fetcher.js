const fs = require('fs');
const readline = require('readline');
const request = require('request');

const url = process.argv[2];
const fileName = process.argv[3];

const doesFileAreadyExist = (file, callback) => {
  fs.access(file, fs.constants.F_OK, (err) => {
    if (err) {
      callback();
    } else {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
  
      rl.question(`${file} already exists. Press 'Y' or 'y' overwrite, or any other key to quit.`, response => {
        if (response === 'Y' || response === 'y') {
          callback();
        }
        rl.close();
      });
    }
  });
};

const makeRequest = (url, fileName) => {
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
};

if (url && fileName) {
  doesFileAreadyExist(fileName, () => {
    makeRequest(url, fileName);
  });
}
