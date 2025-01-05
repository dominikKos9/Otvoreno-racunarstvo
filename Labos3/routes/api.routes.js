const express = require('express');
const session = require('express-session');
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(express.json());
const {Pool} = require('pg');

const pool = new Pool ({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "bazepodataka",
    database: "Otvoreno_racunarstvo"
})



const filePath = "C:\\Users\\domin\\OneDrive\\Desktop\\FER\\Otvoreno racunarstvo\\Labos 2\\Public\\Podaci\\openapi.json";

router.get('/openApi', function(req, res){
    req.session.data = req.session.data || [];
    res.sendFile(filePath, (err) =>{
        if (err) {
            res.status(404).json({
                status: "Not Found",
                message: "openAPI not found"
            });
        }
    });
});

router.get('/LaLiga', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM LaLiga");
        res.json({ status: "OK", message: "Fetched all data", response: result.rows });
    } catch (err) {
        res.status(500).json({ status: "Error", message: "Error in database", error: err.message});
    }
});

router.get('/clubName', async (req, res) => {
    try {
        const result = await pool.query("SELECT club_name FROM LaLiga");
        res.json({ status: "OK", message: "Fetched all data", response: result.rows });
    } catch (err) {
        res.status(500).json({ status: "Error", message: "Error in database", error: err.message});
    }
});

router.get('/stadiumName', async (req, res) => {
    try {
        const result = await pool.query("SELECT stadium_name FROM LaLiga");
        res.json({ status: "OK", message: "Fetched all data", response: result.rows });
    } catch (err) {
        res.status(500).json({ status: "Error", message: "Error in database", error: err.message});
    }
});

router.get('/abreviation', async (req, res) => {
    try {
        const result = await pool.query("SELECT abreviation FROM LaLiga");
        res.json({ status: "OK", message: "Fetched all data", response: result.rows });
    } catch (err) {
        res.status(500).json({ status: "Error", message: "Error in database", error: err.message});
    }
});





router.get('/LaLiga/:ID', async (req, res) => {
    try {
        const {ID} = req.params;
        const result = await pool.query("SELECT * FROM LaLiga WHERE ID = $1", [ID]);
        if (result.rows.length === 0){
            return res.status(404).json({ status: "Not Found", message: "Data not found", response: null});
        }
        res.json({ status: "OK", message: "Fetched all data", response: result.rows });
    } catch (err) {
        res.status(500).json({ status: "Error", message: "Error in database", error: err.message});
    }
});



router.put('/LaLiga/:ID', async (req, res) => {
    try {
        const {ID} = req.params;
        const {club_name,city_name,stadium_name,abreviation,manager_name,nickname,date_of_establishment,main_sponsor,trophies_won,current_captains} = req.body;
        const result = await pool.query(
            "UPDATE LaLiga SET club_name = $1, city_name = $2, stadium_name = $3, abreviation = $4, manager_name = $5, nickname = $6, date_of_establishment = $7, main_sponsor = $8, trophies_won = $9, current_captains = $10 WHERE ID = $11 RETURNING *",
             [club_name,city_name,stadium_name,abreviation,manager_name,nickname,date_of_establishment,main_sponsor,trophies_won,current_captains,ID]);
        if (result.rows.length === 0){
            return res.status(404).json({ status: "Not Found", message: "Data not found", response: null});
        }
        res.json({ status: "OK", message: "Updated data", response: result.rows });
    } catch (err) {
        res.status(500).json({ status: "Error", message: "Error in database", error: err.message});
    }
});


router.post('/LaLiga', async (req, res) => {
    try {
        const {club_name,city_name,stadium_name,abreviation,manager_name,nickname,date_of_establishment,main_sponsor,trophies_won,current_captains} = req.body;
        const result = await pool.query(
            "INSERT INTO LaLiga (club_name,city_name,stadium_name,abreviation,manager_name,nickname,date_of_establishment,main_sponsor,trophies_won,current_captains) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *",
             [club_name,city_name,stadium_name,abreviation,manager_name,nickname,date_of_establishment,main_sponsor,trophies_won,current_captains]);
        res.status(200).json({ status: "Created", message: "Club created", response: result.rows});
        } catch (err) {
        res.status(500).json({ status: "Error", message: "Error in database", error: err.message});
    }
});



router.delete('/LaLiga/:ID', async (req, res) => {
    try {
        const {ID} = req.params;
        const result = await pool.query("DELETE FROM LaLiga WHERE ID = $1 RETURNING *", [ID]);
        if (result.rows.length === 0){
            return res.status(404).json({ status: "Not Found", message: "Data not found", response: null});
        }
        res.json({ status: "OK", message: "Club deleted", response: result.rows });
    } catch (err) {
        res.status(500).json({ status: "Error", message: "Error in database", error: err.message});
    }
});

module.exports = router;