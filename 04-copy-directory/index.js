const fs = require('fs').promises;
const path = require('path');

const srcDir = path.join(__dirname, 'files');
const destDir = path.join(__dirname, 'files-copy');

async function copyDirectory() {
  try {
    await fs.mkdir(destDir, { recursive: true });

    const filesInDestDir = await fs.readdir(destDir);
    for (const file of filesInDestDir) {
      await fs.unlink(path.join(destDir, file));
    }

    const filesInSrcDir = await fs.readdir(srcDir);
    for (const file of filesInSrcDir) {
      const srcFilePath = path.join(srcDir, file);
      const destFilePath = path.join(destDir, file);
      await fs.copyFile(srcFilePath, destFilePath);
    }

    console.log('Files were copied successfully!');
  } catch (err) {
    console.error(err);
  }
}

copyDirectory();
