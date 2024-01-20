let fs = require('fs');
let path = require('path');
const pathFile = '04-copy-directory/files';
const copyPathFile = '04-copy-directory/files-copy';

fs.mkdir('04-copy-directory/files-copy', { recursive: true }, (err) => {
  if (err) throw err;
});

fs.promises
  .readdir(copyPathFile)

  .then((filenames) => {
    for (let filename of filenames) {
      fs.unlink(path.join(__dirname, 'files-copy', filename), function (err) {
        if (err) return console.log(err);
      });
    }
  })

  .catch((err) => {
    console.log(err);
  });

fs.promises
  .readdir(pathFile)

  .then((filenames) => {
    for (let filename of filenames) {
      setTimeout(() => {
        fs.copyFile(
          `${path.join(__dirname, 'files', filename)}`,
          `${path.join(__dirname, 'files-copy', filename)}`,
          function (err) {
            if (err) throw err;
          },
        );
      }, 1000);
    }
  })

  .catch((err) => {
    console.log(err);
  });
