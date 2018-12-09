(function (modules) {
    function require(moduleId) {
      var module  = {
        exports: {}
      };
      modules[moduleId].call(module.exports, module, module.exports, require);
      return module.exports;
    }
    return require( "./src/index.js");
  })
    ({
      "./src/index.js":
        (function (module, exports, require) {
          eval(`const str = require('src\a.js');
require('src\index.css');

console.log('hello mypack', str);
`);
        })
        ,
            "src\a.js":
            (function (module, exports, require) {
                eval(`module.exports = 'utils';
`);
            })
        ,
            "src\index.css":
            (function (module, exports, require) {
                eval(`
        let style = document.createElement('style');
        style.innerText= "body {  background: red;}";
        document.head.appendChild(style)
    `);
            })
        
    });