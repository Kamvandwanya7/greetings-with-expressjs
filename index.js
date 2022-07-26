const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const GreetingFact = require('./greeting-fact')

const app = express();
const grtFunction = GreetingFact();


app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.get('/', function (req, res) {
    let names = grtFunction.getNames()
    res.render('index',
        {
            names: names,
            messages: grtFunction.greetMessage(names[names.length-1].name, names[names.length-1].language),
            count: grtFunction.getCount(),
            errorMessage: grtFunction.errorMessage(),
            errorLnguage: grtFunction.errorLang(),
            errorName: grtFunction.errorName()

        })
});


app.post('/naming', function (req, res) {
    grtFunction.setNames({
        name: req.body.username,
        language: req.body.theLanguage,

    })
    console.log(grtFunction.getNames()),
        res.redirect('/')
});


app.post('/action', function (req, res) {
    console.log(req.body.actionType)
    grtFunction.recordAction(req.body.actionType)

});


// app.get('/actions', function(req, res){
// });


// app.get('/action/:type', function(req, res){
// });

let PORT = process.env.PORT || 3055;
app.listen(PORT, function () {

    console.log("App started at port:", PORT)
});