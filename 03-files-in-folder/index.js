const path = '03-files-in-folder/secret-folder';
const fs = require('fs');

fs.promises
  .readdir(path, { withFileTypes: true })

  .then((filenames) => {
    for (let filename of filenames) {
      if (filename[Reflect.ownKeys(filename)[1]] == 2) {
        delete this.filename;
      } else {
        fs.stat(
          `03-files-in-folder/secret-folder/${filename.name}`,
          (err, stats) => {
            if (err) {
              console.error(err);
              return;
            }
            stats.size;
            console.log(
              filename.name.split('.')[0] +
                ' - ' +
                filename.name.split('.')[1] +
                ' - ' +
                Math.round(stats.size / 1024) +
                'kb',
            );
          },
        );
      }
    }
  })

  .catch((err) => {
    console.log(err);
  });
