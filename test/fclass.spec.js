describe('fclass', () => {
  it('create a object', done => {
    var A = fclass.create('A', {
      init: function(name, age) {
        this.name = name;
        this.age = age;
      },
      privates: {
        name: ''
      },
      protects: {
        age: ''
      },
      publics: {
        sex: 'female',
        say: function() {
          return (this.name + ":" + this.age + ":" + this.sex);
        }
      }
    });
    var a = new A("lili", 18);
    expect(a.say).toBe('lili:18:female');
    done();
  })
});