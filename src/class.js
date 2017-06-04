/**
 * A Object Oriented of Lib.
 * by liyingfu on 2017.5.22
 */
(function(global, factory) {
  typeof exports === 'object' && module !== undefined ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.fclass = factory());
})(this, function() {
  const fclass = {};
  const classes = {};

  function classCreate(name, options) {
    let clazz = classes.name;
    !clazz && (clazz = function() {});
    if (options) {
      const init = options.init;
      const privates = options.privates;
      const protects = options.protects;
      const publics = options.publics;
      clazz = function() {
        init && init.apply(this, arguments);
      };
      privates && Object.keys(privates).forEach(function(key) {
        let property = privates[key];
        Object.defineProperty(clazz.prototype, key, {
          value: property,
          configurable: false
        });
      });
      protects && Object.keys(protects).forEach(function(key) {
        let property = protects[key];
        Object.defineProperty(clazz.prototype, key, {
          value: property,
          writable: false
        });
      });
      publics && Object.keys(publics).forEach(function(key) {
        let property = publics[key];
        clazz.prototype[key] = property;
      });
    }
    return clazz;
  }
  Object.defineProperty(fclass, 'create', {
    value: classCreate,
    configurable: false
  });
  return fclass;
});