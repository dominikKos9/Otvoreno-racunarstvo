const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');

//routes
const homeRouter = require('./routes/home.routes');


app.use(express.static('public'));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.use(session({
    secret: "otr-lab2",
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60 * 60 * 1000}
})
);



app.use('/home', homeRouter);
app.use('/', homeRouter);

app.listen(3000);