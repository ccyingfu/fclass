var Person = fu.define("Person", {
  init: function(name, age) {
    this.name = name;
    this.age = age;
  },
  statics: {
    CONST: "CONST"
  },
  privates: {
    mode: "privates"
  },
  protects: {
    attr: "protects"
  },
  publics: {
    say: function() {
      return "I am " + this.name + ". I am " + this.age + " old.";
    }
  }
});

var Teacher = fu.define("Teacher", {
  extend: "Person",
  init: function(school) {
    Teacher.$super.apply(this, ["a Teacher", 29]);
    this.school = school;
  },
  publics: {
    say1: function() {
      return "I am " + this.name + " in the " + this.school + " school. I am " + this.age + " old.";
    }
  }
});

var AssEss = fu.define("AssEss", {
  extend: "Teacher",
  init: function() {
    AssEss.$super.apply(this, ["深大附中"]);
  }
});

var div = fu.$.create("div");
var div2 = fu.$.create("div");
var div3 = fu.$.create("div");
fu.$("body").append(div).append(div2);
div2.append(div3);
fu.$("div").css({
  margin: "20px",
  background: "#ccc",
  height: "20px"
});

var Input = fu.find("Input");
var ipt = new Input({
  type: "text"
});
ipt.render();