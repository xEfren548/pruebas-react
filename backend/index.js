const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');


const routes = require('./src/routes/indexRoutes.js');


require('dotenv').config();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    session({
        key: 'user_sid',
        secret: "randomsecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000
        }
    })
)

app.use((req, res,next ) => {
    if(req.session.user && req.cookies.user_sid){
        res.redirect('/dashboard')
    }
    next()
})

const sessionChecker = (req, res, next) => {
    if(req.session.user && req.cookies.user_sid){
        res.redirect('/')
    } else {
        next();
    }
}

app.get('/dashboard', sessionChecker, (req, res) => {
    res.redirect('/login')
})

const db_url = process.env.DB_URL;
const port = process.env.PORT || 5001;


mongoose.connect(db_url).then(async () => {
    app.listen(port, () => {
        console.log(`App is running on port ${port}`);
    })


}).catch((err) => {
    console.log('failed to connect' + err.message);
});

app.use(express.json());

app.use(routes)