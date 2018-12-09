const fs = require('fs');
const path = require('path');

function req(moduleName) {
  const content = fs.readFileSync(path.join(__dirname, moduleName), 'utf8');

  const fn = new Function('exports', 'module', 'require', '__dirname',
    '__filename', `${content}\n return module.exports`);

  const module = { exports: {} };

  return fn(module.exports, module, req, __dirname, __filename);
}

const str = req('./b.js');

console.log(str);
