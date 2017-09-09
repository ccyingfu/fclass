# fu
这是一个为 JavaScript 设计的面向对象的一个库。
# Usage
通过 fu.define 来定义一个类。

<pre>
describe('fclass', function() {
  var Person, Teacher, AssEss;
  beforeEach(function() {
    // 通过 fu.define 来定义一个类
    Person = fu.define("Person", {
      // 当执行 new Person 的时候首先执行 init 方法
      init: function(name, age) {
        this.name = name;
        this.age = age;
      },
      // 静态属性，通过 Perosn.CONST 访问
      statics: {
        CONST: "CONST"
      },
      // 可以访问，但无法通过 Object.keys 或 for in 得到，无法被继承
      privates: {
        mode: "privates"
      },
      // 无法被 delete 掉
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
      // 继承 Person，只能单继承
      extend: "Person",
      // 如果有需要，请先执行父类的 init 方法。$super 指向 init 
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
</pre>
