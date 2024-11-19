const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const compression = require('compression');
const path = require('path');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'local') {
    console.log('LOCAL ENV!!');
    dotenv.config();

} else if (process.env.NODE_ENV === 'dev') {
    console.log('DEV ENV!!');
    dotenv.config({ path: path.resolve(__dirname, '.env.dev') });

} else {
    console.log('PROD ENV!!');
    dotenv.config({ path: path.resolve(__dirname, '.env.prod') });
    
}

app.use(bodyParser.urlencoded({extended: false}));
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(process.env.MEMBER_PROFILE_PATH));

// session setting START
const maxAge = 1000 * 60 * 30;
const sessionObj = {
    secret: 'green!@#$%^',
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore({checkPeriod: maxAge}),
    cookie: {
        maxAge: maxAge,
    }
};
app.use(session(sessionObj));
// session setting END

// view tmeplate setting START
app.set('view engine', 'ejs');
app.set('views', './view');
// view tmeplate setting END

app.get('/', (req, res) => {
    console.log('/');
    res.redirect('/home');

});

// router setting START
const homeRouter = require('./route/homeRouter');
app.use('/home', homeRouter);

const memberRouter = require('./route/memberRouter');
app.use('/member', memberRouter);

const service1Router = require('./route/service1Router');
app.use('/service1', service1Router);

const service2Router = require('./route/service2Router');
app.use('/service2', service2Router);

app.listen(3000);