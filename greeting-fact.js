module.exports = function GreetingFact() {
    var greetedNames = {};    // || [{"name":"", "language":""}];
    // alreadyExistingName || 
    let alphabetRegex = /^[a-z]+$/gi;
    let theError = "";
    let greetedList = [];
    // var names = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();


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

    function regexPass(name) {
        return alphabetRegex.test(name)
    }

    var message = ""
    function greetMessage(name, language) {
        // console.log(alphabetRegex./test(name))
        if (name !== "" && alphabetRegex.test(name) == true) {
            setNames(name)
            if (language === "english") {
                message = "Hello " + name;
            } else if (language === "isixhosa") {
                message = "Molo " + name;
            } else if (language === "afrikaans") {
                message = "Hallo " + name;
            }
            return message;
        } else if (name !== '' && alphabetRegex.test(name) == false) {
            message = "Please enter alphabets only!";
            return message;
        }
    }


    function getMessage() {
        return message;
    }


    function greetings() {
        return greetedList;
    }


    function errorMessage(name, language) {
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
        // else if(name !== '' && alphabetRegex.test(name) == false){
        //     return "Please enter alphabets only!";
        // }
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
        greetMessage,
        regexPass,
        errorMessage,
        getMessage,
        greetings,
    }
}

