var fu = require("../fu");
var $$ = function(selector) {
  return new html(selector);
}
var html = function(selector) {
  if (!selector) return this;
  if (fu.type(selector) == "string") {
    return this.wapper(document.querySelectorAll(selector));
  } else if (selector.__dom) {
    return selector;
  } else if (selector.nodeType == 1) {
    return this.wapper(selector);
  }
};

html.prototype = {
  constructor: html,
  wapper: function(selector) {
    var len = selector.length;
    this.dom = selector;
    this.len = len;
    return this;
  },

  create: function(tagName) {
    return this.wapper([document.createElement(tagName)]);
  },

  append: function(node) {
    this.dom.forEach(function(d) {
      d.appendChild(node.dom[0]);
    });
    return this;
  },

  attr: function(key, attr) {
    this.dom.forEach(function(d) {
      d.setAttribute(key, attr);
    });
    return this;
  },

  hasClass: function(name) {
    return this.dom.className.indexOf(name) != -1;
  },

  addClass: function(className) {
    if (!this.hasClass(className)) {
      this.dom.className += " " + className;
    }
  },

  removeClass: function(className) {
    if (this.hasClass(className)) {
      var cn = this.dom.className;
      this.dom.className = cn.replace(className, "").replace(/\s+/, " ");
    }
  },

  css: function(obj) {
    if (fu.type(obj) == "object") {
      var self = this;
      var content = "";
      Object.keys(obj).forEach(function(key) {
        content += [key, ":", obj[key], ";"].join("");
        self.attr("style", content);
      });
    }
  }
};

$$.create = function(tagName) {
  return new html().create(tagName);
};

Object.defineProperty(fu, "$", {
  value: $$
});

module.exports = html;