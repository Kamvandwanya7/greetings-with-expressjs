const assert = require("assert");
const GreetingFact= require("../greeting-fact")

describe('The greeting factory function', function () {
    it('it should be able to return greeted names', function () {
        let greetName = GreetingFact();
        greetName.setNames("phumza");
        greetName.setNames("kamva");

        // assert.equal("Hello phumza", greet);
        assert.deepEqual({
            kamva: 1,
            phumza: 1
          }
          , greetName.getNames());
    });


    it('It should be able to count names greeted', function () {
        let greetName = GreetingFact();
        greetName.setNames("Phumza");
         greetName.setNames("Kamva");
        greetName.setNames("Zinathi");

        assert.equal(3, greetName.getCount());
    });
    it('It should be able to return 0 if there is no name  greeted', function () {
        let greetName = GreetingFact();
        greetName.setNames("")
      

        assert.equal(0, greetName.getCount());
    });

});
describe('Different languages', function () {
    it('It should be able to greet in afrikaans if language selected is afrikaans', function () {
        let greetName = GreetingFact();
        var grt = greetName.greetMessage("azo", "afrikaans");
        assert.equal("Hallo azo", grt)

    });
    it('It should be able to greet in isixhosa if language selected is isixhosa', function () {
        let greetName = GreetingFact();
        var grt = greetName.greetMessage("azo", "isixhosa");
        assert.equal("Molo azo", grt)

    });
});
describe('Error messages', function () {
    it('It should be able to return error message when name and language is not included', function () {
        let greetName = GreetingFact();
        var grt = greetName.errorMessage("", null);
        assert.equal("Please enter your name and select the language!", grt)

    });

    it('It should be able to return error message when language is not included', function () {
        let greetName = GreetingFact();
        var grt = greetName.errorMessage("Azo", null);
        assert.equal("Please select the language!", grt)

    });

    it('It should be able to return error message when name is not inserted', function () {
        let greetName = GreetingFact();
        var grt = greetName.errorMessage("","isixhosa");
        assert.equal("Please enter your name!", grt)
    });
})
