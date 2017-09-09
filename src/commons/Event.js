fu.define("Event", {
  init: function(config) {
    this._evs_events = {};
  },
  protects: {
    $on: function(name, handler) {
      var events = this._evs_events;
      var handlers = this._evs_handlers;
      var evt = this._evs_events[name];
      if (!evt) {
        events[name] = [];
      }
      events[name].push(handler);
      return {
        $off: function() {

        }
      }
    }
  }
});