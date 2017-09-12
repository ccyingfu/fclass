var fu = require("../../fu");
module.exports = fu.define("Setting", {
  init: function(setting) {
    this.parseSetting(setting);
  },
  protects: {
    parseSetting: function(setting) {
      if (fu.type(setting) == "object") {
        var self = this;
        Object.keys(setting).forEach(function(key) {
          var value = setting[key];
          var setter = self[key + "_setter"];
          self.setting[key] = setter ? setter.call(self, value) : value;
        });
      }
    }
  }
});