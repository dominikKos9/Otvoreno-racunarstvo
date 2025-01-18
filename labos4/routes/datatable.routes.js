const express = require('express');
const session = require('express-session');
const router = express.Router();

router.get('/', function(req, res){
    req.session.data = req.session.data || [];
    res.render("datatable", {
        data : req.session.data
    });
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

//const test = "select * from laliga where abreviation = 'RMA' "
//let results = await client.query("select * from laliga where 'de' = ANY(current_captains)")
//console.table(results.rows)

router.get('/getData/:id/:search/:atribut', async (req, res) => {
    let id = req.params.id
    let search = req.params.search
    let atribut = req.params.atribut
    let upit = ""
    let params = [search];

    if (id == 0) {
        upit = `SELECT * FROM laliga WHERE ${atribut}::text = $1`;  // Koristi parametar $1
    }
    else if (id == 1) {
        upit = `SELECT * FROM laliga WHERE $1 = ANY(${atribut})`;
    }
    else if (id == 2) {
        upit = `SELECT * FROM laliga WHERE $1 = ANY(current_captains)
         OR club_name = $1
         OR city_name = $1
         OR stadium_name = $1
         OR abreviation = $1
         OR manager_name = $1
         OR nickname = $1
         OR date_of_establishment::text = $1
         OR main_sponsor = $1
         OR trophies_won::text = $1`;
    }
    else if (id == 3) {
        upit = `SELECT * FROM laliga`;  
    }



    try {
        let results
        console.log(upit)
        if(id == 3){
            results = await client.query(upit);
        }
        else{
            results = await client.query(upit,params);
        }
        console.table(results.rows)
        res.json(results.rows);
    } catch (error) {
        res.status(500).send("Error fetching data");
    }
});




module.exports = router;