const assert = require("assert");
const GreetingFact = require("../datab-functions");

const pgp= require("pg-promise")();

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/my_greetings';

const config = {
    connectionString: DATABASE_URL
};

const db = pgp(config);


describe('The counter', async function () {
    this.beforeEach(async function () {
        await db.none('DELETE FROM greetings')
    });
    it('It should be able to count names greeted', async function () {
        let greetName = GreetingFact(db);
        await greetName.updateCount("Phumza");
        await greetName.updateCount("Kamva");
        await greetName.updateCount("Zinathi");

        assert.equal(3, await greetName.getCount());
    });
});
// this.beforeEach(async function () {
//     await db.none('DELETE FROM greetings')
// });

    it('It should be able to return 0 if there is no name  greeted', async function () {
        let greetName = GreetingFact(db);
        await greetName.updateCount("")

        assert.equal(0, await greetName.getCount());
    });

     
// });

