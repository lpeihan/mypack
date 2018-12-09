#! /usr/bin/env node

const entry = './src/index.js';
const output = './dist/main.js';
const fs = require('fs');

let script = fs.readFileSync(entry, 'utf8');
const path = require('path');

const modules = [];
const styleLoader = function(source) {
  return `
        let style = document.createElement('style');
        style.innerText= ${JSON.stringify(source).replace(/\\r\\n/g, '')};
        document.head.appendChild(style)
    `;
};

script = script.replace(/require\(['"](.+?)['"]\)/g, (...args) => {
  const name = path.join('./src', args[1]);
  let content = fs.readFileSync(name, 'utf8');
  if (/\.css$/.test(name)) {
    content = styleLoader(content);
  }
  modules.push({
    name, content
  });
  return `require('${name}')`;
});
const ejs = require('ejs');

const template = `(function (modules) {
    function require(moduleId) {
      var module  = {
        exports: {}
      };
      modules[moduleId].call(module.exports, module, module.exports, require);
      return module.exports;
    }
    return require( "<%-entry%>");
  })
    ({
      "<%-entry%>":
        (function (module, exports, require) {
          eval(\`<%-script%>\`);
        })
        <%for(let i = 0;i<modules.length;i++){
            let module = modules[i];%>,
            "<%-module.name%>":
            (function (module, exports, require) {
                eval(\`<%-module.content%>\`);
            })
        <%}%>
    });`;
const result = ejs.render(template, {
  entry,
  script,
  modules
});

fs.writeFileSync(output, result);
console.log('mypack compile sucessful');
