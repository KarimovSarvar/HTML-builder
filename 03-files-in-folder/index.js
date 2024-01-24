const path = require('path');
const fs = require('fs').promises;

const directoryPath = path.join(__dirname, 'secret-folder');

async function printFileDetails() {
  try {
    const files = await fs.readdir(directoryPath, { withFileTypes: true });

    for (const file of files) {
      if (file.isDirectory()) {
        continue;
      }

      const filePath = path.join(directoryPath, file.name);
      const stats = await fs.stat(filePath);

      const fileSizeInKB = (stats.size / 1024).toFixed(2);
      const extension = path.extname(file.name).substring(1);
      const filenameWithoutExtension = path.basename(
        file.name,
        path.extname(file.name),
      );

      console.log(
        `${filenameWithoutExtension} - ${extension} - ${fileSizeInKB}kb`,
      );
    }
  } catch (err) {
    console.error(err);
  }
}

printFileDetails();
