const fs = require('fs');
const path = require('path');

let assets = {};
let scss = [];

function walkSync(dir, filelist = {}) {

  fs.readdirSync(dir).forEach(file => {

    const dirFile = path.join(dir, file);
    const relativePath = dirFile.replace('src', '');

    const assetObject = {
      path: relativePath + '?' + fs.statSync(dirFile).mtime.getTime(),
      // group: dir.split('/')[2]
    };

    try {
      walkSync(dirFile, filelist);
    }
    catch (err) {

      if (err.code === 'ENOTDIR' || err.code === 'EBUSY') {

        assets[relativePath] = assetObject.path;

        let fileFiltered = relativePath.replace(/\s|[/.]/g, "-").replace('assets-','');
        scss.push(`$asset-${fileFiltered}: "${assetObject.path}";`);

      }
      else throw err;

    }
  });
  return filelist;
}

walkSync('./src/assets/');

fs.writeFileSync('./src/assets.json', JSON.stringify(assets), 'utf8');
fs.writeFileSync('./src/assets.scss', scss.join("\n"), 'utf8');


