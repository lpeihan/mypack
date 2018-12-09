const factories = {};

function define(moduleName, dependencies, factory) {
  factory.dependencies = dependencies;
  factories[moduleName] = factory;
}

function require(mods, callback) {
  const result = mods.map((mod) => {
    const factory = factories[mod];
    let exports;

    const dependencies = factory.dependencies;

    require(dependencies, (...args) => {
      exports = factory(...args);
    });

    return exports;
  });

  callback(...result);
}

define('name', [], () => 'John');

define('age', ['name'], name => name + 9);

require(['age'], (age) => {
  console.log(age);
});
