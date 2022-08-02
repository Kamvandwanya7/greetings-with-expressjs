module.exports = function GreetingFact(name) {
    var greetedNames = {};    // || [{"name":"", "language":""}];
    // alreadyExistingName || 
    let alphabetRegex = /^[a-z]+$/gi;
    let theError = "";
    let greetedList = [];



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

    function setRed(red) {
        theError = "red";
    }
    function getRed() {
        return theError;
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

    // function validatingName(name){

    // }
    // }
    // else if(!alphabetRegex.test(name)){
    //     return "Your name is not recognized!";
    // }



    // function regexFail(name) {
    //     if (regexPass(name) == false) {
    //         return "Your name is not recognized!";
    //     }
    // }
    var message = ""
    function greetMessage(name, language) {
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
        if (name == '' && language === null) {
            return "Please enter your name and select the language!";
        }
    }
    function errorLang(name, language) {
        if (name !== '' && language === null) {
            return "Hi " + name + " please select the language!";
        }
    }
    function errorName(name) {
        if (name == '') {
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
        errorLang,
        errorName,
        getRed,
        setRed,
        getMessage,
        recordAction,
        greetings,
        actionsFor,
        reset
    }
}

