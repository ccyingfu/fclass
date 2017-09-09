describe("Test Event", function() {
  var Event = fu.find("Event");
  var evt = new Event();
  it("$on, $off and $emit", function() {
    var hello = "";
    var h1 = evt.$on("hello", function() {
      hello += "hello";
    });
    var h2 = evt.$on("hello", function() {
      hello += " world!";
    });
    evt.$emit("hello");
    expect(hello).toBe("hello world!");
    hello = "";
    h2.$off();
    evt.$emit("hello");
    expect(hello).toBe("hello");
    evt.$on("setName", function(name) {
      hello += " " + name;
    });
    evt.$emit("setName", ["Lave"]);
    expect(hello).toBe("hello Lave");
  });

  it("extend", function() {
    var A = fu.define("A", {
      mixins: ["Event"],
      init: function() {
        var self = this;
        this.$on("push", function(p) {
          self.products.push(p);
        });
        this.$on("pop", function(p) {
          self.products.pop(p);
        });
      },
      privates: {
        products: fu.find("PowerArray").toArray(),
        add: function(p) {
          this.$emit("push", [p]);
        },
        pop: function() {
          this.$emit("pop");
        }
      }
    });
    var a = new A();
    for (var i = 0; i < 10; i++) {
      a.add("product " + i);
    }
    expect(a.products.length).toBe(10);
    a.pop();
    expect(a.products.length).toBe(9);
    expect(a.products[8]).toBe("product 8");
  });
});