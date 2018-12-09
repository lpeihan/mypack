(function(modules) {
  function require(moduleId) {
    const module = {
      exports: {},
    };
    modules[moduleId].call(module.exports, module, module.exports, require);
    return module.exports;
  }
  return require('./index.js');
}({
  './index.js':
    (function(module, exports, require) {
      eval("console.log('hello');\n\n");
    })
}));
