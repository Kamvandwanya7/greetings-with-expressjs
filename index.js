const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const GreetingFact = require('./greeting-fact')
const flash = require('express-flash');
const session = require('express-session');
const pg= require("pg");
const pgPromise= require("pg-promise")
const pgp= pgPromise({});
const Pool = pg.Pool;

// should we use a SSL connection
// let useSSL = false;
// let local = process.env.LOCAL || false;
// if (process.env.DATABASE_URL && !local){
//     useSSL = true;
// }
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/my_greetings';

// if (process.env.NODE_ENV == 'production') {
	// ssl = {
	// 	rejectUnauthorized : false
	// }
// }

if (process.env.NODE_ENV == 'production') {
	config.ssl = {
		rejectUnauthorized : false
	}
}
const db = pgp({
    connectionString,
    ssl : {
		rejectUnauthorized : false
	}
  });

const app = express();
const grtFunction = GreetingFact(db);


app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.use(express.static('public'));


// initialise session middleware - flash-express depends on it
app.use(session({
    secret: 'this is my longest string that is used to test my greetings with routes app for browser',
    resave: false,
    saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())




app.get('/', async function (req, res) {

    let names = await grtFunction.getNames()


    //  req.flash('success','Please enter your name and select language!')

    res.render('index',
        {
            names: names,
            messagesz: await grtFunction.getMessage(),
            count: await grtFunction.getCount(),
        })
});


app.post('/naming', async function (req, res) {
    // let nameInput = grtFunction.getNames();
    var nameInput = req.body.username;
    var languageBtn = req.body.theLanguage;

    if (nameInput, languageBtn) {
        await grtFunction.updateCount(nameInput)
        await grtFunction.greetMessage(nameInput, languageBtn)
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
});


app.get('/greeted', async function (req, res) {
    // await grtFunction.recordAction(req.body.actionType)
    res.render('greetings', {
        names: await grtFunction.namesList()
    })
});


app.get('/delete', async function (req, res){
     await grtFunction.deleteAllNames()
    res.redirect('/greeted')

});

app.get('/deleteUser', async function (req, res){
    await grtFunction.deleteUser()
   res.redirect('/greeted')
});



app.get('/greetings/:greet', async function (req, res) {
    const greetedPerson = req.params.greet;
    let counter = await grtFunction.greetedPeople(greetedPerson)
    console.log(counter)
    let msg = `You have greeted ${greetedPerson} for ${counter.length} time(s) now`
    res.render('greet', {
        msg
    })
})

let PORT = process.env.PORT || 3055;
app.listen(PORT, async function () {

    console.log("App started at port:", PORT)
});