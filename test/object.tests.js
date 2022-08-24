const assert = require("assert");
const GreetingFact = require("../greeting-fact")

describe('The greeting factory function', async function () {
    it('it should be able to return greeted names', async function () {
        let greetName = GreetingFact();
        await greetName.setNames("phumza");
        await greetName.setNames("kamva");

        // assert.equal("Hello phumza", greet);
        assert.deepEqual({
            kamva: 1,
            phumza: 1
        }
            ,await greetName.getNames());
    });
});
describe('Error messages', async function () {
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

describe('Different languages', async function () {
        it('It should be able to greet in afrikaans if language selected is afrikaans', async function () {
            let greetName = GreetingFact();
            var grt = await greetName.greetMessage("azo", "afrikaans");
            assert.equal("Hallo azo", grt)
    
        });
        it('It should be able to greet in isixhosa if language selected is isixhosa', async function () {
            let greetName = GreetingFact();
            var grt = await greetName.greetMessage("azo", "isixhosa");
            assert.equal("Molo azo", grt)
    
        });
    });
    
});
