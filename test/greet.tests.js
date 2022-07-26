const assert = require("assert");

const GreetingFact= require("../greeting-fact.js")

describe('The greeting factory function', function () {
    it('it should be able to return greeted names', function () {
        let greetName = GreetingFact();
        var greet = greetName.greetMessage("phumza", "english");
        assert.equal("Hello phumza", greet);
        assert.equal("phumza", greetName.getNames());
    });

    it('it should be able to reject if greeted in numbers', function () {
        let greetName = GreetingFact();
        var greet = greetName.regexFail("phumza12", "english");
        assert.equal("Your name is not recognized!", greet);
        // assert.equal("phumza", greetName.getNames());
    });

    it('It should be able to count names greeted', function () {
        let greetName = GreetingFact();
        var grt = greetName.greetMessage("Phumza", 'english');
        grt = greetName.greetMessage("Kamva", "isixhosa");
        grt = greetName.greetMessage("Zinathi", "afrikaans");
        // alert(greetName.getCount())

        assert.equal(3, greetName.getCount());
    });

    it('It should be able to count names greeted', function () {
        let greetName = GreetingFact();
        var grt = greetName.greetMessage("Phumza", "isixhosa");
        grt = greetName.greetMessage("Kamva", "afrikaans");
        grt = greetName.greetMessage("Kamva", "afrikaans");
        grt = greetName.greetMessage("Kamva", "isixhosa");

        assert.equal(2, greetName.getCount());
    });
});
describe('Different languages', function () {
    it('It should be able to greet in english', function () {
        let greetName = GreetingFact();
        var grt = greetName.greetMessage("Azo", "english");
        assert.equal("Hello Azo", grt)
        // assert.equal("Please enter your name and select the language", greetName.greetMessage('kamva', null));
    });
    it('It should be able to greet in afrikaans', function () {
        let greetName = GreetingFact();
        var grt = greetName.greetMessage("Azo", "afrikaans");
        assert.equal("Hallo Azo", grt)

        // assert.equal("Please enter your name and select the language", greetName.greetMessage('kamva', null));
    });
    it('It should be able to greet in isixhosa', function () {
        let greetName = GreetingFact();
        var grt = greetName.greetMessage("Azo", "isixhosa");
        assert.equal("Molo Azo", grt)

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
        var grt = greetName.errorLang("Azo", null);
        assert.equal("Hi Azo please select the language!", grt)

        // assert.equal("Hello Azo please select the language", greetName.greetMessage());
    });

    it('It should be able to return error message when name is not inserted', function () {
        let greetName = GreetingFact();
        var grt = greetName.errorName("");
        // alert(grt)
        assert.equal("Please enter your name!", grt)

        // assert.equal("Name not recognised", greetName.greetMessage());
    });
    it('It should be able to return error message when name includes numbers', function () {
        let greetName = GreetingFact();
        var grt = greetName.greet("Kamva123", "isixhosa");
        // alert(grt)
        assert.equal("Your name is not recognized!", grt)

        // assert.equal("Name not recognised", greetName.greetMessage());
    });
})
