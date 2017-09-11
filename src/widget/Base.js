var fu = require("../fu");
module.exports = fu.define("Base", {
  init: function(setting) {
    this.setting = fu.extend(this.setting, setting, true);
    this.parseSetting(this.setting);
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