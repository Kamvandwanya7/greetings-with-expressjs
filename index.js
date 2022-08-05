const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const GreetingFact = require('./greeting-fact')
const flash = require('express-flash');
const session = require('express-session');


const app = express();
const grtFunction = GreetingFact();


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




app.get('/', function (req, res) {

    let names = grtFunction.getNames()


    // req.flash('success','Please enter your name and select language!')

    res.render('index',
        {
            names: names,
            messagesz: grtFunction.getMessage(),
            count: grtFunction.getCount(),
        })
});


app.post('/naming', function (req, res) {
    // let nameInput = grtFunction.getNames();
    var nameInput = req.body.username;
    var languageBtn = req.body.theLanguage;

    if (nameInput, languageBtn) {
        grtFunction.setNames(nameInput)
        grtFunction.greetMessage(nameInput, languageBtn)
        // req.flash('success', 'You have greeted successfully!')
    }
    if (nameInput == "" && !languageBtn) {
        req.flash('error', grtFunction.errorMessage(nameInput, languageBtn))
    }
    else if (nameInput == '' && languageBtn) {
        req.flash('error', grtFunction.errorMessage(nameInput, languageBtn))
    }
    else if (!languageBtn) {
        req.flash('error', grtFunction.errorMessage(nameInput, languageBtn))
    }

    res.redirect('/')
});

app.get('/greeted', function (req, res) {
    // console.log(req.body.actionType)
    grtFunction.recordAction(req.body.actionType)
    // console.log(grtFunction.getNames());
    res.render('greetings', {
        names: grtFunction.getNames()
    })
});

app.get('/greetings/:greet', function (req, res) {
    const greetedPerson = req.params.greet;
    let counter = grtFunction.greetedPeople(greetedPerson)
    let msg = `You have greeted ${greetedPerson} for ${counter} time(s) now`
    res.render('greet', {
        msg
    })

})

let PORT = process.env.PORT || 3055;
app.listen(PORT, function () {

    console.log("App started at port:", PORT)
});