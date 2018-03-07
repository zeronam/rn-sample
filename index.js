const express = require('express');
const session = require('express-session');
const path = require('path');
const jsonParser = require('body-parser').json();
const routes = require('./routes/index.js');
const app = express();
app.use(session({
    secret: 'jsdf7389isacuy28',
    resave: false,
    saveUninitialized: true,
    cookie:{
      maxAge:60*60*100*24
      }
}));

app.use(express.static('public'));
app.listen(process.env.PORT || 5000);

app.use('/', routes);





