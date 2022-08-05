const assert = require("assert");
const GreetingFact= require("../greeting-fact")

describe('The greeting factory function', function () {
    it('it should be able to return greeted names', function () {
        let greetName = GreetingFact();
        var greet = greetName.greetMessage("phumza", "english");
        assert.equal("Hello phumza", greet);
        assert.equal("phumza", greetName.getNames());
    });


    it('It should be able to count names greeted', function () {
        let greetName = GreetingFact();
        var grt = greetName.greetMessage("Phumza", 'english');
        grt = greetName.greetMessage("Kamva", "isixhosa");
        grt = greetName.greetMessage("Zinathi", "afrikaans");

        assert.equal(3, greetName.getCount());
    });

});
describe('Different languages', function () {
    it('It should be able to greet in english', function () {
        let greetName = GreetingFact();
        var grt = greetName.greetMessage("azo","english");
        assert.equal("Hello azo", grt)
    });
    it('It should be able to greet in afrikaans', function () {
        let greetName = GreetingFact();
        var grt = greetName.greetMessage("azo", "afrikaans");
        assert.equal("Hallo azo", grt)

    });
    it('It should be able to greet in isixhosa', function () {
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
