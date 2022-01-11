require('dotenv').config()
const express = require('express')
const app = express();
const port = process.env.PORT || 8000;

//auth(login)
const authRoute = require('./routes/auth');
const session = require('express-session');
const passport = require('passport');

//routes-variable (web_page)
const homeRoute = require('./routes/1home');
const genresRoute = require('./routes/2genres');
const clubRoute = require('./routes/3club');
const discord_oauth = require('./third-party/discord_oauth');

//basic_website_resource(html,css,etc)
app.set ( "view engine", "ejs" );
app.use(express.static(__dirname + '/public/'));

//website_use_routes
app.use('/', homeRoute);

app.use('/club_list', genresRoute);

app.use('/club', clubRoute);

app.use(session({
  secret: process.env.SECRET,
  cookie: {
    maxAge: 600000 * 60 * 24
  },
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//auth_Route
app.use('/auth', authRoute);


app.listen(port, () => {
  console.log(`server listening on
     port ${port}!`)
});
