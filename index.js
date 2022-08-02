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


// initialise session middleware - flash-express depends on it
app.use(session({
    secret: 'this is my longest string that is used to test my greetings with routes app for browser',
    resave: false,
    saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', function (req, res) {
    let names = grtFunction.getNames()
    res.render('index',
        {
            names: names,
            messages: grtFunction.getMessage(),
            count: grtFunction.getCount(),

        })
});


app.post('/naming', function (req, res) {
    grtFunction.setNames(
        req.body.username,
    )
    grtFunction.greetMessage(req.body.username, req.body.theLanguage)
    grtFunction.errorMessage(req.body.username, req.body.theLanguage)

    console.log(grtFunction.errorMessage(req.body.username, req.body.theLanguage)),
    // console.log(grtFunction.getMessage());
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