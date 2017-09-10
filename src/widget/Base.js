var fu = require("../fu");
module.exports = fu.define("Base", {
  init: function(setting) {

  },
  protects: {
    dom: "",
    config: {},
    create: function() {},
    template: "",
    bind: function() {},
    render: function() {},
    destroy: function() {}
  }
});