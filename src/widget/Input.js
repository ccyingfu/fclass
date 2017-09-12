var fu = require("../fu");
var Input = fu.define("Input", {
  extend: "Base",
  init: function(setting) {
    Input.$super.apply(this, [setting]);
  },
  protects: {
    render: function() {
      var type = this.setting.type;
      var placeholder = this.setting.placeholder;
      this.template = `<input type='${type}' placeholder='${placeholder}'/>`;
      this.handleTmpl(this.template);
      this.bind();
    },
    handleTmpl: function(tmpl) {
      this.dom = fu.$.create("div").html(tmpl);
      fu.$("body").append(this.dom);
    },
    placeholder_setter: function(ph) {
      return "hello, " + ph;
    }
  }
});
module.exports = Input;