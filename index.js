const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const GreetingFact = require('./greeting-fact')

const app = express();
const grtFact = GreetingFact();


app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));


app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.get('/', function (req, res) {
    let names = grtFact.getNames()
    res.render('index',
        {
            names: names,
            messages: grtFact.greetMessage(names[names.length-1].name, names[names.length-1].language),
        })
});


app.post('/naming', function (req, res) {
    grtFact.setNames({
        name: req.body.username,
        language: req.body.theLanguage,

    })
    console.log(grtFact.getNames()),
        res.redirect('/')
});


app.post('/action', function (req, res) {
    console.log(req.body.actionType)
    grtFact.recordAction(req.body.actionType)

});


// app.get('/actions', function(req, res){
// });


// app.get('/action/:type', function(req, res){
// });

let PORT = process.env.PORT || 3055;
app.listen(PORT, function () {

    console.log("App started at port:", PORT)
});