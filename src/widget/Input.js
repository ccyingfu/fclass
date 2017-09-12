var fu = require("../fu");
var Input = fu.define("Input", {
  extend: "Base",
  init: function(setting) {
    Input.$super.apply(this, [setting]);
  },
  protects: {
    render: function() {
      this.template = "<input type='" + this.setting.type + "'/>";
      this.handleTmpl(this.template);
      this.bind();
    },
    handleTmpl: function(tmpl) {
      this.dom = fu.$.create("div").html(tmpl);
      fu.$("body").append(this.dom);
    }
  }
});
module.exports = Input;