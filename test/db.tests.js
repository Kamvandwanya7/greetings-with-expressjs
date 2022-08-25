const assert = require("assert");
const GreetingFact = require("../datab-functions");

const pgp= require("pg-promise")();

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/my_greetings';

const config = {
    connectionString: DATABASE_URL
};

const db = pgp(config);


describe('My database tests', async function () {
    this.beforeEach(async function () {
        await db.none('DELETE FROM greetings')
    });
    it('It should be able to count 3 names greeted on database', async function () {
        let greetName = GreetingFact(db);
        await greetName.updateCount("Phumza");
        await greetName.updateCount("Kamva");
        await greetName.updateCount("Zinathi");

        assert.equal(3, await greetName.getCount());
    });

    it('It should be able to count 1 name greeted on database', async function () {
        let greetName = GreetingFact(db);
        await greetName.updateCount("Phumza");
        await greetName.updateCount("Phumza");
        await greetName.updateCount("Phumza");

        assert.equal(1, await greetName.getCount());
    });
    // this.beforeEach(async function () {
        //     await db.none('DELETE FROM greetings')
        // });
        
        it('It should be able to clear greeted names', async function () {
            let greetName = GreetingFact(db);
            await greetName.updateCount("Sange")
            await greetName.updateCount("Zona")
            await greetName.updateCount("Sbahle")
            
            assert.equal(null, await greetName.deleteAllNames());
        });
        
        
        it('It should be able to return list of greeted names', async function () {
            let greetName = GreetingFact(db);
            await greetName.updateCount("Sange")
            await greetName.updateCount("Zona")
            await greetName.updateCount("Sbahle")
            
            // await greetName.namesList([{"names": "Thango"},{"names": "Sbahle"},{"names": "Zuko"}])
            
            assert.deepEqual( [{"username": "Sange"},{"username": "Zona"},{"username": "Sbahle"}] , await greetName.namesList([{"names": "Thango"},{"names": "Sbahle"},{"names": "Zuko"}]));
        }); 

        // it('It should be able to update a number of times a name has been greeted', async function () {
        //     let greetName = GreetingFact(db);
        //     await greetName.updateCount("Sange")
        //     await greetName.updateCount("Sange")
        //     await greetName.updateCount("Sange")
        //     await greetName.updateCount("Sange")            
        //     assert.deepEqual( 'Sange', await greetName.greetedPeople());
        // }); 
    });
       
  