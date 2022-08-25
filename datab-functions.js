
module.exports = function GreetingFact(db) {
    var outputs = {};   
    let alphabetRegex = /^[a-z]+$/gi;



    async function updateCount(name) {        
        let results = await db.one('SELECT count(username) FROM greetings WHERE username= $1', [name])
        if (results.count == 0) {
            await db.none('INSERT INTO greetings (username, count) VALUES($1, $2)', [name, 1])
        } else {
            await db.none('UPDATE greetings SET count= count +1 WHERE username=$1', [name])
        }
    }


    async function getCount() {
        let outputs = await db.one('SELECT count(username) FROM greetings')
        return outputs.count;
    }

    async function namesList() {
        let outputs = await db.manyOrNone('SELECT username FROM greetings')
        return outputs;
    }

    async function deleteAllNames() {
        let outputs = await db.none('DELETE FROM greetings')
        if (outputs == ''){
           console.log('Users have been all deleted!') 
        }
        return outputs;
    }

    async function greetedPeople(name) {
        let outputs = await db.one('SELECT count FROM greetings WHERE username=$1', [name])
        return outputs.count;
    }
    return {
        updateCount,
        getCount,
        deleteAllNames,
        greetedPeople,
        namesList,
    }
}
