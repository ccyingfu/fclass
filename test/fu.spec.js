describe('fclass', () => {
  it('create a object', done => {
    var Person = fu.define('Person', {
      init: function(config) {
        this.name = config.name;
        this.age = config.age;
      },
      privates: {
        privA: 'privA'
      },
      protects: {
        protA: 'protA'
      },
      publics: {
        sex: 'female',
        say: function() {
          return (this.privA + ":" + this.protA + ":" + this.name + ":" + this.age + ":" + this.sex);
        }
      }
    });
    var person = new Person({ name: "lili", age: 18 });
    expect(a.say()).toBe('privA:protA:lili:18:female');
    done();
  })
});