/**
 * A Object Oriented of Lib.
 * by liyingfu on 2017.5.22
 */
(function(global, factory) {
  typeof exports === 'object' && module !== undefined ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.fu = factory());
})(this, function() {
  var fclass = {};
  var classes = {};
  var mixins = {};
  var TIPS = {
    CLASS_NOT_FOUND: "class ${0} not found."
  };

  var parseTips = function(tips, ins) {
    if (!isArray(ins)) {
      ins = [ins];
    }
    ins.forEach(function(str) {
      tips = tips.replace(/\$\{\d+\}/, str);
    });
    return tips;
  };

  var setProperty = function(obj, prop, val, desc, getter, setter) {
    var descriptor = {
      configurable: true,
      writable: true,
      enumerable: true
    };
    if (val) {
      descriptor.value = val;
    }
    if (getter) {
      descriptor.get = getter;
    }
    if (setter) {
      descriptor.set = setter;
    }
    if (desc == "protects") {
      descriptor.configurable = false;
      descriptor.writable = false;
    } else if (desc == "privates") {
      descriptor.configurable = false;
      descriptor.writable = false;
      descriptor.enumerable = false;
    }
    Object.defineProperty(obj, prop, descriptor);
  };

  var OBJ_TYPE = {
    "[object String]": "string",
    "[object Object]": "number",
    "[object Array]": "array",
    "[object RegExp]": "regexp",
    "[object Date]": "date",
    "[object Number]": "number",
    "[object Null]": "null",
    "[object Undefined]": "undefined"
  };

  var getType = function(obj) {
    return OBJ_TYPE[Object.prototype.toString.call(obj)];
  };

  var isArray = function(arr) {
    return getType(arr) == "array";
  }

  var isDate = function(date) {
    return date instanceof Date;
  };

  var noop = function() {};

  // 属性合并
  var $extend = function(res, des, flag) {
    res = res || {};
    des = des || {};
    if (flag) {
      Object.keys(des).forEach(function(key) {
        var from = des[key];
        if (from && typeof from == "object" && !(from instanceof RegExp)) {
          if (!(from instanceof Date)) {
            res[key] = (isArray(from) ? [] : {});
            $extend(res[key], from);
          } else {
            res[key] = new Date(from);
          }
        } else {
          res[key] = des[key];
        }
      });
    } else {
      Object.keys(des).forEach(function(key) {
        res[key] = des[key];
      });
    }
    return res;
  };

  // 是否受保护
  var isProtect = function(obj, property) {
    var desc = Object.getOwnPropertyDescriptor(obj, property);
    return desc.enumerable && !desc.configurable && !desc.writable;
  }

  function defineClass(name, options) {
    options = options || {};
    var ext = options.extend;
    var init = options.init;
    var mixins = options.mixins || [];
    var privates = options.privates || {};
    var protects = options.protects || {};
    var publics = options.publics || {};
    var statics = options.statics || {};
    var config = options.config || {};

    var t, m, proto; // 构造函数，处理 mixins 的中间变量，原型

    // 是否有构造函数 init 
    var initials = [];
    var extCompilation = {};
    var mixinCompilation = {};

    ext = classes[ext];
    init && initials.push(init);

    // 处理插件 handleMixins 
    if (mixins && mixins.length) {
      mixins.forEach(function(mixin) {
        m = classes[mixin];
        m && Object.keys(m.prototype).forEach(function(key) {
          if (key == "init") {
            initials.push(m.prototype[key]);
          } else {
            mixinCompilation[key] = m.prototype[key];
          }
        });
      });
    }

    if (!classes[name]) {
      t = function() {
        this.init.apply(this, Array.prototype.slice.call(arguments, 0));
      };
      if (ext) {
        var superInstance = new ext();
        t.prototype = superInstance;
        // $super 指向父类
        setProperty(t, "$super", superInstance.init, "privates");
      }
      proto = t.prototype;
      // 构造函数
      setProperty(proto, "init", function() {
        var self = this;
        var args = arguments;
        initials.forEach(function(init) {
          init.apply(self, args);
        });
      }, "protects");
      // 私有方法和属性
      privates && Object.keys(privates).forEach(function(key) {
        setProperty(proto, key, privates[key], "privates");
      });
      // 受保护的方法和属性
      protects && Object.keys(protects).forEach(function(key) {
        setProperty(proto, key, protects[key], "protects");
      });
      // 公共的方法和属性
      publics && Object.keys(publics).forEach(function(key) {
        proto[key] = publics[key];
      });
      // 常量部分
      statics && Object.keys(statics).forEach(function(key) {
        setProperty(t, key, statics[key], "protects");
      });
      // 插件方法覆盖
      Object.keys(mixinCompilation).forEach(function(key) {
        proto[key] = mixinCompilation[key];
      });
      t.prototype.constructor = t;
      t.className = name;
      classes[name] = t;
    } else {
      t = classes[name];
    }
    return t;
  }

  function find(className) {
    var clazz = classes[className];
    if (clazz) {
      return clazz;
    }
    console.warn(parseTips(TIPS.CLASS_NOT_FOUND, className));
    return noop;
  }

  function create(name, opts) {
    var clazz = find(name);
    var cn = clazz.className;
    return cn ? clazz : defineClass(name, opts);
  }

  setProperty(fclass, "define", defineClass, "protects");
  setProperty(fclass, "find", find, "protects");
  setProperty(fclass, "create", create, "protects");

  fclass.isDate = isDate;
  fclass.isArray = isArray;
  fclass.extend = $extend;

  return fclass;
});