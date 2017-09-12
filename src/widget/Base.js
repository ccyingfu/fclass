var fu = require("../fu");
module.exports = fu.define("Base", {
  mixins: ["Setting"],
  init: function(setting) {
    this.setting = fu.extend(this.setting, setting, true);
  },
  protects: {
    dom: null,
    setting: {},
    template: "",
    bind: function() {},
    render: function() {},
    destroy: function() {},
    run: function() {}
  }
});