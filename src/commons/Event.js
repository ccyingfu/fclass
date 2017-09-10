var fu = require("../fu");
module.exports = fu.define("Event", {
  protects: {
    _evs_events: {},
    $on: function(name, handler) {
      var events = this._evs_events;
      var evt = this._evs_events[name];
      if (!evt) {
        events[name] = fu.find("PowerArray").toArray();
      }
      events[name].push(handler);
      return {
        $off: function() {
          events[name].remove(handler);
        }
      }
    },
    $emit: function(name, args) {
      var handlers = this._evs_events[name];
      var self = this;
      handlers.forEach(function(handler) {
        handler.apply(self, args);
      });
    }
  }
});