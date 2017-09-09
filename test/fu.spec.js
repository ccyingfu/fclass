describe('fclass', function() {
  var Person, Teacher, AssEss;
  beforeEach(function() {
    Person = fu.define("Person", {
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
          return "I am " + this.name + ". I am " + this.age + " years old.";
        }
      }
    });

    Teacher = fu.define("Teacher", {
      extend: "Person",
      init: function(school) {
        Teacher.$super.apply(this, ["a Teacher", 29]);
        this.school = school;
      },
      publics: {
        say1: function() {
          return "I am " + this.name + " in the " + this.school + " school. I am " + this.age + " years old.";
        }
      }
    });

    AssEss = fu.define("AssEss", {
      extend: "Teacher",
      init: function() {
        AssEss.$super.apply(this, ["荔林中学"]);
      }
    });
  });

  it('define', function() {
    expect(Person.CONST).toBe("CONST");
    var person = new Person("lee", 19);
    expect(person.say()).toBe("I am lee. I am 19 years old.");
    delete person.attr;
    expect(person.attr).toBe("protects");
    expect(person.mode).toBe("privates");
    var hasPrivatesAttr;
    Object.keys(person).forEach(function(key) {
      if (key == "mode") {
        hasPrivatesAttr = true;
      }
    });
    expect(hasPrivatesAttr).toBeFalsy();
  });

  it("extend", function() {
    var teacher = new Teacher("深大附中");
    expect(teacher.name).toBe("a Teacher");
    expect(teacher.age).toBe(29);
    expect(teacher.school).toBe("深大附中");
    var content = teacher.say();
    var content1 = teacher.say1();
    expect(content).toBe("I am a Teacher. I am 29 years old.");
    expect(content1).toBe("I am a Teacher in the 深大附中 school. I am 29 years old.");

    var assess = new AssEss();
    expect(assess.say1()).toBe("I am a Teacher in the 荔林中学 school. I am 29 years old.")
  });
});