#! /usr/bin/env node

const entry = './src/index.js';
const output = './dist/main.js';
const fs = require('fs');

const script = fs.readFileSync(entry, 'utf8');

const ejs = require('ejs');

const template = `
(function (modules) {
    function require(moduleId) {
      var module  = {
        exports: {}
      };
      modules[moduleId].call(module.exports, module, module.exports, require);
      return module.exports;
    }
    return require("<%-entry%>");
  })
    ({
      "<%-entry%>":
        (function (module, exports) {
          eval(\`<%-script%>\`);
        })
    });
`;

const result = ejs.render(template, {
  entry,
  script
});

fs.writeFileSync(output, result);
console.log('mypack compile sucessful');
