const fs = require('fs').promises;
const path = require('path');

const stylePath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist/style.css');
const assets = path.join(__dirname, 'assets');
const assetsCopy = path.join(__dirname, 'project-dist', 'assets');

async function createProjectDist() {
  try {
    await fs.mkdir('06-build-page/project-dist', { recursive: true });

    await fs.copyFile(
      '06-build-page/template.html',
      '06-build-page/project-dist/index.html',
    );
    let data = await fs.readFile(
      '06-build-page/project-dist/index.html',
      'utf-8',
    );

    const files = await fs.readdir('06-build-page/components', {
      withFileTypes: true,
    });
    for (const elem of files) {
      const dataHtml = await fs.readFile(
        `06-build-page/components/${elem.name}`,
        'utf-8',
      );
      data = data.replace(`{{${elem.name.split('.')[0]}}}`, dataHtml);
    }
    await fs.writeFile('06-build-page/project-dist/index.html', data, 'utf-8');

    const cssFiles = await fs.readdir(stylePath);
    let cssContent = '';
    for (const file of cssFiles) {
      if (file.endsWith('.css')) {
        const cssData = await fs.readFile(path.join(stylePath, file), 'utf-8');
        cssContent += `${cssData}\n`;
      }
    }
    await fs.writeFile(bundlePath, cssContent);

    await copyAssets(assets, assetsCopy);
  } catch (error) {
    console.error(error);
  }
}

async function copyAssets(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyAssets(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

createProjectDist();

/* Импорт всех требуемых модулей
Прочтение и сохранение в переменной файла-шаблона
Нахождение всех имён тегов в файле шаблона
Замена шаблонных тегов содержимым файлов-компонентов
Запись изменённого шаблона в файл index.html в папке project-dist
Использовать скрипт написанный в задании 05-merge-styles для создания файла style.css
Использовать скрипт из задания 04-copy-directory для переноса папки assets в папку project-dist */
