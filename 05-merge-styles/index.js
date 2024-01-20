const fs = require('fs');
const path = require('path');
const stylePath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist/bundle.css');
const output = fs.createWriteStream(bundlePath);

fs.promises
  .readdir(stylePath)

  .then((files) => {
    for (let file of files) {
      const filePath = path.join(stylePath, file);
      const fileName = path.basename(filePath);

      if (fileName.split('.')[1] === 'css') {
        const input = fs.createReadStream(
          path.join(stylePath, fileName),
          'utf-8',
        );

        input.on('data', (data) => output.write(data.toString() + '\n'));
      }
    }
  });
