
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const { v4: uuidv4 } = require("uuid");
const nocache = require("nocache");
const router = require('./router');


const app = express();

app.get('/data', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://www.example.com");
    res.setHeader("Access-Control-Allow-Header", "Content-Type")
    res.setHeader("Access-Control-Allow-Method", "GET")
    res.setHeader("Access-Control-Allow-Credentials", "true")
    res.json();
})


const port = process.env.port || 3000;


app.use(bodyParser.json())
app.use(nocache());
app.use(bodyParser.urlencoded({ extended: true }))


app.set('view engine', 'ejs');

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true

}));

app.use('/route', router);


app.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/route/dashboard');
    } else {
        res.render('base', { title: "login system" });
    }
})

app.listen(port, () => {

    console.log(`listening to the server on http://localhost:${port}`);
})