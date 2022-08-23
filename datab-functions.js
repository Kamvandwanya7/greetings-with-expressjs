
module.exports = function GreetingFact(db) {
    var greetedNames = {};    // || [{"name":"", "language":""}];
    // alreadyExistingName || 
    let alphabetRegex = /^[a-z]+$/gi;



    async function updateCount(name) {        
        console.log(name)


        let results = await db.oneOrNone('SELECT username FROM greetings WHERE username= $1', [name])
        if (results.length == 0) {
            await db.none('INSERT INTO greetings (username, count) VALUES($1, $2)', [name, 1])
        } else {
            await db.none('UPDATE greetings SET count= count +1 WHERE username=$1', [name])
        }
    }


    async function getCount() {
        let outputs = await db.oneOrNone('SELECT username FROM greetings')
        console.log(outputs)
        return outputs;
    }

    async function namesList() {
        let outputs = await db.oneOrNone('SELECT username FROM greetings')
        //  console.log(outputs)
        return outputs;
    }

    async function deleteAllNames() {
        let outputs = await db.none('DELETE FROM greetings')
        return outputs;
    }

    // async function deleteUser(name) {
    //     let outputs = await db.none('DELETE username, id, count FROM greetings', [name])
    //     return outputs;
    // }


    async function greetedPeople(name) {
        let outputs = await db.oneOrNone('SELECT count FROM greetings WHERE username=$1', [name])
        return outputs;
    }
    return {
        updateCount,
        getCount,
        namesList,
        deleteAllNames,
        greetedPeople,
    }
}
