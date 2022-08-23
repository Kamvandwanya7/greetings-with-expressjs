const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const GreetingFact = require('./greeting-fact')
const dbGreetings= require('./datab-functions');
const routes = require('./routes/greetings.routes')
const flash = require('express-flash');
const session = require('express-session');
// const pg= require("pg");
const pgp = require("pg-promise")();
const app = express();
// const pgp= pgPromise();



// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
// which db connection to use
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/my_greetings';

// if (process.env.NODE_ENV == 'production') {
// ssl = {
// 	rejectUnauthorized : false
// }
// }

// if (process.env.NODE_ENV == 'production') {
//     config.ssl = {
//         rejectUnauthorized: false
//     }
// }



const config = {
    connectionString: DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
};

const db = pgp(config);
const grtFunction = GreetingFact();
const databaseInstance= dbGreetings(db);
const routeFunctions = routes(grtFunction, databaseInstance)


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


app.get('/', routeFunctions.home);


app.post('/naming', routeFunctions.nameGet);


app.get('/greeted', routeFunctions.getGreet);


app.get('/delete', routeFunctions.deleteNames);

// app.get('/deleteUser', async function (req, res){
//     await grtFunction.deleteUser()
//    res.redirect('/greeted')
// });



app.get('/greetings/:greet',)

let PORT = process.env.PORT || 3055;
app.listen(PORT, async function () {

    console.log("App started at port:", PORT)
});