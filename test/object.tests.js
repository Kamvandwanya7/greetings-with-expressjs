const assert = require("assert");
const GreetingFact = require("../greeting-fact")

describe('The greeting factory function', async function () {
   

    it('It should be able to return error message when name and language is not included', async function () {
        let greetName = GreetingFact();
        var grt = await greetName.errorMessage("", null);
        assert.equal("Please enter your name and select the language!", grt)

    });

    it('It should be able to return error message when language is not included', async function () {
        let greetName = GreetingFact();
        var grt = await greetName.errorMessage("Azo", null);
        assert.equal('Please select the language!', grt)
    })    // Promise 'Please select the language!, grt')


    it('It should be able to return error message when name is not inserted', async function () {
        let greetName = GreetingFact();
        var grt = await greetName.errorMessage("", "isixhosa");
        assert.equal("Please enter your name!", grt)
    });
    });
    
