const fs = require('fs');
const path = require('path');
const stylePath = path.join(__dirname, 'styles');
const bundlePath = path.join(__dirname, 'project-dist/style.css');
const output = fs.createWriteStream(bundlePath);
const assets = path.join(__dirname, 'assets');
const assetsCopy = path.join(__dirname, 'project-dist', 'assets');

fs.mkdir('06-build-page/project-dist', { recursive: true }, (error) => {
  if (error) throw error;
});

fs.writeFile('06-build-page/project-dist/index.html', '', 'utf-8', (error) => {
  if (error) throw error;
});

fs.copyFile(
  '06-build-page/template.html',
  '06-build-page/project-dist/index.html',
  (error) => {
    if (error) throw error;
  },
);

fs.readFile('06-build-page/project-dist/index.html', 'utf-8', (err, data) => {
  if (err) throw err;
  fs.readdir(
    '06-build-page/components',
    { withFileTypes: true },
    (err, files) => {
      if (err) throw err;
      files.forEach((elem) => {
        fs.readFile(
          '06-build-page/components/' + `${elem.name}`,
          'utf-8',
          (err, dataHtml) => {
            if (err) throw err;
            data = data.replace(
              '{{' + `${elem.name.split('.')[0]}` + '}}',
              dataHtml,
            );
            fs.writeFile(
              '06-build-page/project-dist/index.html',
              data,
              'utf-8',
              (err) => {
                if (err) throw err;
              },
            );
          },
        );
      });
    },
  );
});

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

fs.mkdir(assetsCopy, { recursive: true }, (err) => {
  if (err) throw err;
});

fs.readdir(assets, { withFileTypes: true }, (err, directory) => {
  if (err) throw err;
  const copiedDir = directory.filter((dir) => dir.isDirectory());
  copiedDir.forEach((folder) => {
    fs.mkdir(
      path.join(__dirname, 'project-dist', 'assets', `${folder.name}`),
      { recursive: true },
      (err) => {
        if (err) throw err;
      },
    );

    fs.readdir(
      path.join(__dirname, 'assets', `${folder.name}`),
      { withFileTypes: true },
      (err, files) => {
        if (err) throw err;
        files.forEach((file) => {
          setTimeout(() => {
            fs.copyFile(
              path.join(__dirname, 'assets', `${folder.name}`, `${file.name}`),
              path.join(
                __dirname,
                'project-dist',
                'assets',
                `${folder.name}`,
                `${file.name}`,
              ),
              (err) => {
                if (err) throw err;
              },
            );
          }, 1000);
        });
      },
    );

    fs.readdir(
      path.join(__dirname, 'project-dist', 'assets', `${folder.name}`),
      { withFileTypes: true },
      (err, copyFiles) => {
        if (err) throw err;
        copyFiles.forEach((file) => {
          fs.unlink(
            path.join(
              __dirname,
              'project-dist',
              'assets',
              `${folder.name}`,
              `${file.name}`,
            ),
            (err) => {
              if (err) throw err;
            },
          );
        });
      },
    );
  });
});

/* Импорт всех требуемых модулей
Прочтение и сохранение в переменной файла-шаблона
Нахождение всех имён тегов в файле шаблона
Замена шаблонных тегов содержимым файлов-компонентов
Запись изменённого шаблона в файл index.html в папке project-dist
Использовать скрипт написанный в задании 05-merge-styles для создания файла style.css
Использовать скрипт из задания 04-copy-directory для переноса папки assets в папку project-dist */
