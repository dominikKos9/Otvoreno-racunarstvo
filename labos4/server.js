const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const fs = require("fs");


//routes

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







const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3000',
    clientID: 'qufnBJmSGexx9Hdd4aI6NWdDkh9ZrgJB',
    issuerBaseURL: 'https://dev-erj25aazpo44mrf8.us.auth0.com',
};

app.use(auth(config));


app.get('/', (req, res) => {
    res.render("index",{
        isAuthenticated: req.oidc.isAuthenticated()
    });
});





app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

app.get('/logout', (req, res) => {
    res.oidc.logout({ returnTo: process.env.BASE_URL });
});




const {Client} = require('pg');

const client = new Client ({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "bazepodataka",
    database: "Otvoreno_racunarstvo"
})

client.connect()


CSV_FILE = './Public/Podaci/LaLiga.csv'
JSON_FILE = './Public/Podaci/LaLiga.json'

app.get('/osvjezi',requiresAuth(), async (req, res) => {
    try {
        let results
        let data
        let csv_data
        results = await client.query(`SELECT * FROM laliga`);
        data = JSON.stringify(results.rows,null,2);
        csv_data = convert(results.rows)
        csv_data1 = JSON.stringify(csv_data, null , 0)
        fs.writeFileSync(JSON_FILE, data);
        fs.writeFileSync(CSV_FILE, csv_data1);
        res.redirect('/')
    } catch (error) {
        res.status(500).send("Error fetching data");
    }
})

function convert(jsonData) {
    let csv = '';
    
    const headers = Object.keys(jsonData[0]);
    csv += headers.join(',') + '\n';
    
    jsonData.forEach(obj => {
        const values = headers.map(header => obj[header]);
        csv += values.join(',') + '\n';
    });
    return csv;
}


app.use('/datatable', dataRouter);
app.use('/api', apiRouter);

app.listen(3000);