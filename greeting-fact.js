module.exports = function GreetingFact() {
    var greetedNames = {};    // || [{"name":"", "language":""}];
     
    let alphabetRegex = /^[a-z]+$/gi;
    let theError = "";
    let greetedList = [];


    // function setNames(name) {
    //     if (name) {

    //         if (greetedNames[name] === undefined) {
    //             greetedNames[name] = 1
    //         }
    //         else {
    //             greetedNames[name]++
    //         }
    //     }
    // }

    function getNames() {
        return greetedNames;
    }

    function regexPass(name) {
        return alphabetRegex.test(name)
    }

    var message = ""
    function greetMessage(name, language) {
            if(name, language){
                if (language === "english") {
                    message= "Hello " + name;
                } else if (language === "isixhosa") {
                    message= "Molo " + name;
                } else if (language === "afrikaans") {
                    message= "Hallo " + name;
                }
            }
         
            return;
        
    }


    function getMessage() {
        return message;
    }


    function greetings() {
        return greetedList;
    }


    function errorMessage(name, language) {
        if (name == '' && !language) {
            return "Please enter your name and select the language!";
        }
        if (name !== '' && !language) {
            return "Please select the language!";
        }
         if (name === '' && language) {
            return "Please enter your name!";
        }
        if(!regexPass(name)){
            return "Please enter alphabets only!";

        }

        
    }

    return {
        getNames,
        greetMessage,
        regexPass,
        errorMessage,
        getMessage,
        greetings,
    }
}

