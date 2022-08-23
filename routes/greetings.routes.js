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
        var nameInput = req.body.username;
        var languageBtn = req.body.theLanguage;

        if (nameInput, languageBtn) {
            await grtFunction.greetMessage(nameInput, languageBtn);
            //  console.log(kamva);
            //  if (kamva=== true) {
            //      await grtFunction.updateCount(nameInput)

            //  }
            // req.flash('success', 'You have greeted successfully!')
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
        res.render('greetings', {
            names: await grtFunction.namesList()
        })
    }
    async function deleteNames(req, res) {
        await grtFunction.deleteAllNames()
        res.redirect('/greeted')
    }

    async function greetedNames(req, res) {
        const greetedPerson = req.params.greet;
        let counter = await grtFunction.greetedPeople(greetedPerson)
        console.log(counter)
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
    }

}