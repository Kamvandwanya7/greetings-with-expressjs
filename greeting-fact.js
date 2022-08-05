module.exports = function GreetingFact() {
    var greetedNames = {};    // || [{"name":"", "language":""}];
    // alreadyExistingName || 
    let alphabetRegex = /^[a-z]+$/gi;
    let theError = "";
    let greetedList = [];
    // var nameText = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();



    function setNames(name) {
        if (name) {
            if (greetedNames[name] === undefined) {
                greetedNames[name] = 1
            }
            else {
                greetedNames[name]++
            }
        }
    }


    function getNames() {
        return greetedNames;
    }

    function getCount() {
        const propertyNames = Object.keys(greetedNames);
        return propertyNames.length;
    }

    function regexPass(name) {
        return alphabetRegex.test(name)
    }

    
    var message = ""
    function greetMessage(name,language) {
        // if (name && language) {
        if (language === "english") {
            message = "Hello " + name;
        } else if (language === "isixhosa") {
            message = "Molo " + name;
        } else if (language === "afrikaans") {
            message = "Hallo " + name;
        }
        // }

    }

    function getMessage() {
        return message;

    }

    function recordAction(action) {
        if (action === 'greet') {
        }
        greetedList.push({
            type: action,
        });
    }

    function greetings() {
        return greetedList;
    }
    
    function reset(){
       return greetedNames;
    }

    function actionsFor(type) {
        const filteredActions = [];

        // loop through all the entries in the action list 
        for (let index = 0; index < actionList.length; index++) {
            const action = actionList[index];
            // check this is the type we are doing the total for 
            if (action.type === type) {
                // add the action to the list
                filteredActions.push(action);
            }
        }

        return filteredActions;
    }

    function errorMessage(name, language) {
        // console.log(language + "{jijijjjij")
        if (name == '' && !language) {
            return "Please enter your name and select the language!";
        }
         if(name !== '' && !language) {
            return "Please select the language!";
        }
        if (name == '' && language) {
            return "Please enter your name!";
        }

    }
    

    function greetedPeople(user){
     for (const key in greetedNames) {
         if (user === key) {
             let counter = greetedNames[key];
             return counter;  
        }
     }
    }

    return {
        setNames,
        getNames,
        getCount,
        greetMessage,
        regexPass,
        errorMessage,
        greetedPeople,
        getMessage,
        recordAction,
        greetings,
        actionsFor,
        reset
    }
}

