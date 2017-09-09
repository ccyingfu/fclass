fu.define("PowerArray", {
  statics: {
    toArray: function(array) {
      return fu.extend(array || [], {
        removeAt: function(pos, len) {
          if (pos >= 0) this.splice(pos, (len || 1));
        },
        remove: function(value) {
          this.removeAt(this.find(value));
        },
        insertAt: function(data, pos) {
          if (!pos && pos !== 0)
            this.push(data);
          else {
            var b = this.splice(pos, (this.length - pos));
            this[pos] = data;
            this.push.apply(this, b);
          }
        },
        find: function(data) {
          for (var i = 0; i < this.length; i++)
            if (data == this[i]) return i;
          return -1;
        }
      });
    }
  }
});