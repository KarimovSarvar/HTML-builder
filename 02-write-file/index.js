const process = require('process');
let stdin = process.openStdin();
const fs = require('fs');
const stdout = process.stdout;
stdout.write('Как прошли выходные?\n');

let qwerty = '';

function exitFile() {
  stdout.write('\nСчастливо!\n!');
  process.exit();
}

stdin.on('data', function (chunk) {
  qwerty += chunk;
  if (chunk.toString().trim() === 'exit') {
    exitFile();
  }
  fs.writeFile('02-write-file/text.txt', qwerty, (err) => {
    if (err) {
      console.log(err);
    }
  });
  process.on('SIGINT', exitFile);
});
