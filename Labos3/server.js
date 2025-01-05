const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');


//routes
const indexRouter = require('./routes/index.routes');
const dataRouter = require('./routes/datatable.routes');
const apiRouter = require('./routes/api.routes');

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


app.use('/datatable', dataRouter);
app.use('/', indexRouter);
app.use('/api', apiRouter);

app.listen(3000);