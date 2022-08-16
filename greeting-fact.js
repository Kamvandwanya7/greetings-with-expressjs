module.exports = function GreetingFact(pool) {
    var greetedNames = {};    // || [{"name":"", "language":""}];
    // alreadyExistingName || 
    let alphabetRegex = /^[a-z]+$/gi;
    let theError = "";
    let greetedList = [];
    // var nameText = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();



    async function setNames(name) {
        if (name) {

            if (greetedNames[name] === undefined) {
                greetedNames[name] = 1
            }
            else {
                greetedNames[name]++
            }
        }
    }

    async function getNames() {
        return greetedNames;
    }

    async function getCount() {
        let outputs = await pool.query('SELECT username FROM greetings')
        return outputs.rowCount;
    }

    async function regexPass(name) {
        return alphabetRegex.test(name)
    }


    async function updateCount(name) {
        let results = await pool.query('SELECT username FROM greetings WHERE username= $1', [name])
        // console.log(results)
        if (results.rowCount == 0) {
            await pool.query('INSERT INTO greetings (username, count) VALUES($1, $2) ', [name, 1])
        } else {
            await pool.query('UPDATE greetings SET count= count +1 WHERE username=$1', [name])
        }
    }

    async function namesList(){
     let outputs= await pool.query('SELECT username FROM greetings')
    //  console.log(outputs)
     return outputs.rows
    }

    async function deleteNames(name){
        let outputs= await pool.query('DELETE * FROM greetings')
        return outputs;
    }

    var message = ""
    async function greetMessage(name, language) {
        if (name !== "") {
            if (language === "english") {
                message = "Hello " + name;
            } else if (language === "isixhosa") {
                message = "Molo " + name;
            } else if (language === "afrikaans") {
                message = "Hallo " + name;
            }
            return message;
        }
    }


    async function getMessage() {
        return message
    }

    // function recordAction(action) {
    //     if (action === 'greet') {
    //     }
    //     greetedList.push({
    //         type: action,
    //     });
    // }

    async function greetings() {
        return greetedList;
    }

    // function reset() {
    //     let outputs= await pool.query('DELETE username, id, count FROM greetings')
    //     return outputs;
    // }



    // function actionsFor(type) {
    //     const filteredActions = [];

    //     // loop through all the entries in the action list 
    //     for (let index = 0; index < actionList.length; index++) {
    //         const action = actionList[index];
    //         // check this is the type we are doing the total for 
    //         if (action.type === type) {
    //             // add the action to the list
    //             filteredActions.push(action);
    //         }
    //     }

    //     return filteredActions;
    // }

    async function errorMessage(name, language) {
        // console.log(language + "{jijijjjij")
        if (name == '' && !language) {
            return "Please enter your name and select the language!";
        }
        else if (name !== '' && !language) {
            return "Please select the language!";
        }
        else if (name == '' && language) {
            return "Please enter your name!";
        }
    }

    async function greetedPeople(name) {
        let outputs = await pool.query('SELECT count FROM greetings WHERE username=$1', [name])
        return outputs.rows[0];
    }

    // async function greetedPeople(user) {
    //     for (const key in greetedNames) {
    //         if (user === key) {
    //             let counter = greetedNames[key];
    //             return counter;
    //         }
    //     }
    // }


    return {
        setNames,
        getNames,
        getCount,
        greetMessage,
        regexPass,
        errorMessage,
        greetedPeople,
        getMessage,
        greetings,
        // reset,
        updateCount,
        namesList,
        deleteNames,
        // nameCount,
    }
}

