module.exports = function routes(grtFunction, database) {

    async function home(req, res) {
        let names = await grtFunction.getNames()
        //  req.flash('success','Please enter your name and select language!')
        res.render('index',
            {
                names: names,
                messagesz: await grtFunction.getMessage(),
                count: await database.getCount(),
            })
    }

    async function nameGet(req, res) {
        // let nameInput = grtFunction.getNames();
        var nameInput = req.body.username.charAt().toUpperCase() + req.body.username.slice(1).toLowerCase();;
        var languageBtn = req.body.theLanguage;

        if (nameInput, languageBtn) {
            await grtFunction.greetMessage(nameInput, languageBtn);
            await database.updateCount(nameInput);
        }
        if (nameInput == "" && !languageBtn) {
            req.flash('error', await grtFunction.errorMessage(nameInput, languageBtn))
        }
        else if (nameInput == '' && languageBtn) {
            req.flash('error', await grtFunction.errorMessage(nameInput, languageBtn))
        }
        else if (!languageBtn) {
            req.flash('error', await grtFunction.errorMessage(nameInput, languageBtn))
        }

        res.redirect('/')
    }

    async function getGreet(req, res) {
        // await grtFunction.recordAction(req.body.actionType)
        // console.log(await database.nameList())
        res.render('greetings', {
            names: await database.namesList()
        })
    }


    async function removeNames(req, res){
        let dlt= await database.deleteAllNames()
     if (dlt== true){
        req.flash('error', "You have deleted all greeted users")
     }
     res.redirect('/greeted')
    }

    async function deleteNames(req, res) {
        await database.deleteAllNames()
       
        res.redirect('/remove')
    }

    

    async function greetedNames(req, res) {
        const greetedPerson = req.params.greet;
        let counter = await database.greetedPeople(greetedPerson)
        // console.log(counter)
        res.render('greet', {
            counter,
            greetedPerson
        })
    }
    return {
        home,
        nameGet,
        getGreet,
        deleteNames,
        greetedNames,
        removeNames,
    }

}