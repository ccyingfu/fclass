var A = fclass.define("A", {
  init: function(config) {
    console.log("A init");
    console.log(config.name, config.age);
    this.name = config.name;
  },
  config: {
    name: "lili",
    age: 20
  },
  privates: {
    priAttr: "priAttr"
  },
  protects: {
    protoAttr: "protoAttr"
  },
  publics: {
    name: "",
    say: function() {
      console.log(this.priAttr + ":" + this.protoAttr);
    }
  }
});

var B = fclass.define("B", {
  extend: "A",
  config: {
    sex: "girl"
  },
  init: function(config) {
    console.log("B init");
    console.log(config.name, config.age, config.sex);
  },
  publics: {
    getName: function() {
      return this.name;
    }
  }
});

fclass.define("MC1", {
  init: function(config) {
    this.name = "MC1";
  },
  privates: {
    priAttr: "MC1 priAttr"
  },
  publics: {
    getPriAttr: function() {
      return this.priAttr;
    },
    say: function() {
      console.log(this.name, this.priAttr);
    }
  }
});

var C = fclass.define("C", {
  extend: "B",
  mixins: ["MC1"]
});