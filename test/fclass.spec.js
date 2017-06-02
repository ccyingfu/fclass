describe('fclass', () => {
  it('create a object', done => {
    var A = fclass.create('A', {
      init: function(name, age) {
        this.name = name;
        this.age = age;
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
    var a = new A("lili", 18);
    expect(a.say()).toBe('privA:protA:lili:18:female');
    done();
  })
});