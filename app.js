// INFO
/*
	Developers: Calista Dominitz and Matthew Beitler
	Project: Personal outfit manager
    Class: CS 340
*/

// Citation
/*
    Citation for code insperation and control flow
    Date: 8/13/2023
    Based on: https://github.com/osu-cs340-ecampus/nodejs-starter-app
    Type: source code
    Authors (github usernames):
        gkochera
        Cortona1
        currym-osu
        dmgs11
*/

/*
    SETUP
*/
PORT = process.env.PORT || 4895;

// Express
var express = require('express');
var app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

// Database
var db = require('./database/db-connector');
const sqlQueries = require('./sqlQueries');

// Handlebars
const moment = require('moment');
// var exphbs = require('express-handlebars');     // Import express-handlebars
const { engine } = require('express-handlebars');
app.engine('.hbs', engine({                     // Create an instance of the handlebars engine to process templates
    extname: ".hbs",
    helpers: {
        moment: function(date, format) {
            return moment(date).format(format);
        }
    }
}));                                    
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

/*
    ROUTES
*/
// Pages
app.get('/', function(req, res)
    {
        res.render('index');
    });

app.get('/users', function(req, res)
    {
        let query1 = "SELECT * FROM Users;";                    // Define query
        db.pool.query(query1, function(error, rows, fields) {
            if (error) {
                console.error("Error executing query:", error);
            } else {
                res.render('users', { data: rows });
            }
        });
    });

// Populate dropdowns for all items in outfits
app.get('/outfits', function(req, res) {
    let outfits = `SELECT Outfits.outfit_id, Outfits.name, Tops.name as tops, Bottoms.name as bottoms, 
                Shoes.name as shoes, Jackets.name as jackets, Outfits.formality, Outfits.last_worn
                FROM Outfits JOIN Tops ON Outfits.top_id = Tops.top_id JOIN Bottoms ON 
                Outfits.bottom_id = Bottoms.bottom_id JOIN Shoes ON Outfits.shoe_id = Shoes.shoe_id
                LEFT JOIN Jackets ON Outfits.jacket_id = Jackets.jacket_id ORDER BY Outfits.outfit_id ASC;`;
    let tops = `SELECT * FROM Tops;`;
    let bottoms = `SELECT * FROM Bottoms;`;
    let shoes = `SELECT * FROM Shoes;`;
    let jackets = `SELECT * FROM Jackets;`;
    let accessories = `SELECT * FROM Accessories;`;
    let occasions = `SELECT * FROM Occasions;`;

    db.pool.query(outfits, function(error, rows, fields){   // execute query
        let outfits = rows;
    
        db.pool.query(tops, (error, rows, fields) => {
            let tops = rows;

            db.pool.query(bottoms, (error, rows, fields) => {
                let bottoms = rows;

                db.pool.query(shoes, (error, rows, fields) => {
                    let shoes = rows;

                    db.pool.query(jackets, (error, rows, fields) => {
                        let jackets = rows;

                        db.pool.query(accessories, (error, rows, fields) => {
                            let accessories = rows;
                            
                            db.pool.query(occasions, (error, rows, fields) => {
                                let occasions = rows;

                                return res.render('outfits', {data: outfits, tops: tops, bottoms: bottoms,
                                shoes: shoes, jackets: jackets, accessories: accessories, occasions: occasions});
                            })
                        })
                    })
                })
            })
        })
    })
    });

app.get('/tops', function(req, res)
{
    let query1 = `SELECT * FROM Tops;`;                    // Define query
    let query2 = `SELECT * FROM Users`;
    db.pool.query(query2, function(error, rows, fields){   // execute query
        let users = rows;

        db.pool.query(query1, function(error, rows, fields){
            let tops = rows;
            res.render('tops', {data: tops, users: users});
        })
        })
    });

app.get('/bottoms', function(req, res)
    {
        let query1 = `SELECT * FROM Bottoms;`;                  // Define query
        let query2 = `SELECT * FROM Users`;
        db.pool.query(query2, function(error, rows, fields){   // execute query
            let users = rows;

            db.pool.query(query1, function(error, rows, fields){
                let bottoms = rows;
                res.render('bottoms', {data: bottoms, users: users});
            })
            })
    });

app.get('/shoes', function(req, res)
    {
        let query1 = `SELECT * FROM Shoes;`;                    // Define query
        let query2 = `SELECT * FROM Users`;
        db.pool.query(query2, function(error, rows, fields){   // execute query
            let users = rows;

            db.pool.query(query1, function(error, rows, fields){
                let shoes = rows;
                res.render('shoes', {data: shoes, users: users});
            })
        })
    });

app.get('/jackets', function(req, res)
    {
        let query1 = `SELECT * FROM Jackets;`;                 // Define query
        let query2 = `SELECT * FROM Users`
        db.pool.query(query2, function(error, rows, fields){   // execute query
            let users = rows;

            db.pool.query(query1, function(error, rows, fields){
                let jackets = rows;
                res.render('jackets', {data: jackets, users: users});
            })
        })
    });

app.get('/accessories', function(req, res)
    {
        let query1 = `SELECT * FROM Accessories;`;             // Define query
        let query2 = `SELECT * FROM Users;`;
        db.pool.query(query2, function(error, rows, fields){   // execute query
            let users = rows;

            db.pool.query(query1, function(error, rows, fields){
                let accessories = rows;
                res.render('accessories', {data: accessories, users: users});
            })
        })
    });

app.get('/occasions', function(req, res)
    {
        let query1 = `SELECT * FROM Occasions;`;               // Define query
        let query2 = `SELECT * FROM Users;`;
        db.pool.query(query2, function(error, rows, fields){   // execute query
            let users = rows;

            db.pool.query(query1, function(error, rows, fields){
                let occasions = rows;
                res.render('occasions', {data: occasions, users: users});
            })
        })
    });

app.get('/outfitsOccasions', function(req, res)
    {
        let query1 = `SELECT OutfitsOccasions.outfit_occ_id, Outfits.name as outfit, 
                    Occasions.name as occasion FROM OutfitsOccasions JOIN Outfits ON 
                    OutfitsOccasions.outfit_id = Outfits.outfit_id JOIN Occasions ON 
                    OutfitsOccasions.occasion_id = Occasions.occasion_id;`;
        let query2 = `SELECT * FROM Outfits;`;  
        let query3 = `SELECT * FROM Occasions;`;
        db.pool.query(query3, function(error, rows, fields){  
            let occasions = rows
            
            db.pool.query(query2, function(error, rows, fields){ 
                let outfits = rows

                db.pool.query(query1, function(error, rows, fields){  
                    res.render('outfitsOccasions', {data: rows, outfits: outfits, occasions: occasions});
                })
            })
        })
    });
    
app.get('/outfitsAccessories', function(req, res)
    {
        let query1 = `SELECT OutfitsAccessories.outfit_acc_id, Outfits.name as outfit,
                    Accessories.name as accessory FROM OutfitsAccessories JOIN Outfits 
                    ON OutfitsAccessories.outfit_id = Outfits.outfit_id JOIN Accessories 
                    ON OutfitsAccessories.accessory_id = Accessories.accessory_id 
                    ORDER BY OutfitsAccessories.outfit_acc_id;`;
        let query2 = `SELECT * FROM Outfits;`;
        let query3 = `SELECT * FROM Accessories;`;   
        db.pool.query(query3, function(error, rows, fields){                  
            let accessories = rows;

            db.pool.query(query2, function(error, rows, fields){ 
                let outfits = rows

                db.pool.query(query1, function(error, rows, fields){  
                    res.render('outfitsAccessories', {data: rows, outfits: outfits, accessories: accessories});
                })
            })
        })
    });

// Generic route for adding an item
app.post('/add-item/:page', function(req, res) {
    let page = req.params.page;
    const data = req.body;
    const insertQuery = sqlQueries[page].insert(data); // Call the insert query function with data
    db.pool.query(insertQuery, function(error, rows, fields) {
        if (error) {
            console.log(error);
            return res.sendStatus(400);
        } else {
            // After successful insertion, redirect to appropriate page
            res.redirect(`/${page}`);
        }
    });
});

// Generic route for updating an item
app.post('/update-item/:page', function(req, res) {
    let page = req.params.page;
    const data = req.body;
    const updateQuery = sqlQueries[page].update(data); // Call the update query function with data
    db.pool.query(updateQuery, function(error, rows, fields) {
        if (error) {
            console.log(error);
            return res.sendStatus(400);
        } else {
            // After successful update, redirect to appropriate page
            res.redirect(`/${page}`);
        }
    });
});

// Generic route for deleting an item
app.post('/delete-item/:page', function(req, res) {
    let page = req.params.page;
    const data = req.body;
    const deleteQuery = sqlQueries[page].delete(data); // Call the delete query function with data
    db.pool.query(deleteQuery, function(error, rows, fields) {
        if (error) {
            console.log(error);
            return res.sendStatus(400);
        } else {
            // After successful deletion, redirect to appropriate page
            res.redirect(`/${page}`);
        }
    });
});

// Generic route handler for fetching data by ID for different pages
app.get('/:page/:id', function(req, res) {
    const page = req.params.page;
    const id = req.params.id;
    // Check if the page is valid
    if (!sqlQueries.hasOwnProperty(page)) {
        return res.status(404).send('Page not found');
    }

    // Construct the query based on the page and ID
    const query = `Select * FROM ${sqlQueries[page].tableName} WHERE ${sqlQueries[page].pkName} = ${id}`

    // Execute the query
    db.pool.query(query, function(error, result) {
        if (error) {
            console.error(`Error fetching data for ${page} with ID ${id}:`, error);
            return res.status(500).send(`Error fetching data for ${page} with ID ${id}`);
        }

        // Check if any data was returned
        if (result.rows.length === 0) {
            return res.status(404).send(`No ${page} found with ID ${id}`);
        }

        // Return the fetched data
        const responseData = result.rows[0];
        res.send(responseData);
    });
});


/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log(`Server started on port ${PORT}\n press Ctrl-C to terminate.`)
});