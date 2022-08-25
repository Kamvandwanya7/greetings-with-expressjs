
module.exports = function GreetingFact(db) {
    var outputs = {};    // || [{"name":"", "language":""}];
    // alreadyExistingName || 
    let alphabetRegex = /^[a-z]+$/gi;



    async function updateCount(name) {        
        // console.log(name)


        let results = await db.one('SELECT count(username) FROM greetings WHERE username= $1', [name])
        if (results.count == 0) {
            await db.none('INSERT INTO greetings (username, count) VALUES($1, $2)', [name, 1])
        } else {
            // console.log("here")
            await db.none('UPDATE greetings SET count= count +1 WHERE username=$1', [name])
        }
    }


    async function getCount() {
        let outputs = await db.one('SELECT count(username) FROM greetings')
        return outputs.count;
    }

    async function namesList() {
        let outputs = await db.manyOrNone('SELECT username FROM greetings')
        //  console.log(outputs)
        return outputs;
    }

    // async function usersGreeted(){
    //     let greetedNames = await db.manyOrNone("SELECT username FROM greetings");
    //     return greetedNames;
    // }

    async function deleteAllNames() {
        let outputs = await db.none('DELETE FROM greetings')
        if (outputs == ''){
           console.log('Users have been all deleted!') 
        }
        return outputs;
    }

    // async function deleteUser(name) {
    //     let outputs = await db.none('DELETE username, id, count FROM greetings', [name])
    //     return outputs;
    // }


    async function greetedPeople(name) {
        let outputs = await db.one('SELECT count(*) FROM greetings WHERE username=$1', [name])
        return outputs.count;
    }
    return {
        updateCount,
        getCount,
        deleteAllNames,
        greetedPeople,
        // usersGreeted,
        namesList,
    }
}
