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
    AssEss.$super.apply(this, ["莅临中学"]);
  }
});