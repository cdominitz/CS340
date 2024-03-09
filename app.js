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

// Express
var express = require('express');
var app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))


PORT = process.env.PORT || 4895; // Use the port provided by Heroku or fallback to 4895

// Database
var db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
const { precompile } = require('handlebars');
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
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

// Add Item
app.post('/add-outfit', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    let accessory = req.body.accessory;
    let occasion = req.body.occasion;

    // Create the query and run it on the database
    outfit = `INSERT INTO Outfits (name, top_id, bottom_id, shoe_id, jacket_id, formality, last_worn)
            VALUES ('${data.name}', ${data.topID}, ${data.bottomID}, ${data.shoeID}, ${data.jacketID},
                    '${data.formality}', '${data.lastWorn}')`;

    db.pool.query(outfit, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else{
            // Get outfit_id for outfit just created
            let find_outfit = `SELECT outfit_id FROM Outfits WHERE name = '${data.name}' AND top_id = ${data.topID} AND
                         bottom_id = ${data.bottomID} AND shoe_id = ${data.shoeID} AND jacket_id = ${data.jacketID} 
                         AND formality = '${data.formality}' AND last_worn = '${data.lastWorn}'`;
            db.pool.query(find_outfit, function(error, results, fields){
                let outfit_id = results[0]['outfit_id'];

                // Add entries to OutfitsAccessories Intersection Table
                for (ind in accessory){
                    let outfit_acc = `INSERT INTO OutfitsAccessories (outfit_id, accessory_id)
                                VALUES (${outfit_id}, ${accessory[ind]})`;
                    db.pool.query(outfit_acc, function(error, rows, fields){
                        if (error) {
                            console.log(error)
                            res.sendStatus(400);
                        }
                    })
                }
                // Add entries to OutfitsOccasions Intersection Table
                for (ind in occasion){
                    let outfit_occ = `INSERT INTO OutfitsOccasions (outfit_id, occasion_id)
                                VALUES (${outfit_id}, ${occasion[ind]})`;
                    db.pool.query(outfit_occ, function(error, rows, fields){
                        if (error) {
                            console.log(error)
                            res.sendStatus(400);
                        }
                    })
                }
            })
            res.redirect('/outfits');
        }
    })
    }); 

app.post('/add-user', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    user = `INSERT INTO Users (first_name, last_name, email, password) 
            VALUES ('${data.firstName}', '${data.lastName}', '${data.email}', '${data.password}')`;
    db.pool.query(user, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else{
            // If there was no error, perform a SELECT * on users
            all_users = `SELECT * FROM Users;`;
            db.pool.query(all_users, function(error, rows, fields){

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                // send the results of the query back.
                else{
                    res.redirect('/users');
                }
            })
        }
    })
    });

app.post('/add-top', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        // Create the query and run it on the database
        top = `INSERT INTO Tops (user_id, name, type, color)
                VALUES ('${data.addUserID}', '${data.name}', '${data.type}', '${data.color}')`;
        db.pool.query(top, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else{
                // If there was no error, perform a SELECT * on Tops
                all_tops = `SELECT * FROM Tops;`;
                db.pool.query(all_tops, function(error, rows, fields){
    
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // send the results of the query back.
                    else{
                        res.redirect('/tops');
                    }
                })
            }
        })
    });

app.post('/add-bottom', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        // Create the query and run it on the database
        bottom = `INSERT INTO Bottoms (user_id, name, type, color)
                VALUES ('${data.addUserID}', '${data.name}', '${data.type}', '${data.color}')`;
        db.pool.query(bottom, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else{
                // If there was no error, perform a SELECT * on Tops
                all_bottoms = `SELECT * FROM Bottoms;`;
                db.pool.query(all_bottoms, function(error, rows, fields){
    
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // send the results of the query back.
                    else{
                        res.redirect('/bottoms');
                    }
                })
            }
        })
    });

app.post('/add-shoe', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    shoe = `INSERT INTO Shoes (user_id, name, type, color)
            VALUES ('${data.addUserID}', '${data.name}', '${data.type}', '${data.color}')`;
    db.pool.query(shoe, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else{
            // If there was no error, perform a SELECT * on Tops
            all_shoes = `SELECT * FROM Shoes;`;
            db.pool.query(all_shoes, function(error, rows, fields){

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                // send the results of the query back.
                else{
                    res.redirect('/shoes');
                }
            })
        }
    })
    });

app.post('/add-jacket', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        // Create the query and run it on the database
        jacket = `INSERT INTO Jackets (user_id, name, type, color)
                VALUES ('${data.addUserID}', '${data.name}', '${data.type}', '${data.color}')`;
        db.pool.query(jacket, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else{
                // If there was no error, perform a SELECT * on Tops
                all_jackets = `SELECT * FROM Jackets;`;
                db.pool.query(all_jackets, function(error, rows, fields){
    
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // send the results of the query back.
                    else{
                        res.redirect('/jackets');
                    }
                })
            }
        })
    });

app.post('/add-accessory', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        // Create the query and run it on the database
        accessories = `INSERT INTO Accessories (user_id, name, type, color)
                VALUES ('${data.addUserID}', '${data.name}', '${data.type}', '${data.color}')`;
        db.pool.query(accessories, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else{
                // If there was no error, perform a SELECT * on Tops
                all_accessories = `SELECT * FROM Accessories;`;
                db.pool.query(all_accessories, function(error, rows, fields){
    
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // send the results of the query back.
                    else{
                        res.redirect('/accessories');
                    }
                })
            }
        })
    });

app.post('/add-occasion', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        // Create the query and run it on the database
        occasions = `INSERT INTO Occasions (user_id, name, formality)
                VALUES ('${data.addUserID}', '${data.name}', '${data.formality}')`;
        db.pool.query(occasions, function(error, rows, fields){
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else{
                // If there was no error, perform a SELECT * on Tops
                all_occasions = `SELECT * FROM Occasions;`;
                db.pool.query(all_occasions, function(error, rows, fields){
    
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // send the results of the query back.
                    else{
                        res.redirect('/occasions');
                    }
                })
            }
        })
    });

app.post('/add-outfitsOccasions', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        // Create the query and run it on the database
        intersection = `INSERT INTO OutfitsOccasions (outfit_id, occasion_id)
                VALUES ('${data.addOutfitID}', '${data.addOccasionID}')`;

        db.pool.query(intersection, function(error, rows, fields){
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else{
                // If there was no error, perform a SELECT * on Tops
                all_intersections =  `SELECT OutfitsOccasions.outfit_occ_id, Outfits.name as outfit, 
                                    Occasions.name as occasion FROM OutfitsOccasions JOIN Outfits ON 
                                    OutfitsOccasions.outfit_id = Outfits.outfit_id JOIN Occasions ON 
                                    OutfitsOccasions.occasion_id = Occasions.occasion_id;`;
                db.pool.query(all_intersections, function(error, rows, fields){
    
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // send the results of the query back.
                    else{
                        res.redirect('/outfitsOccasions');
                    }
                })
            }
        })
    });

app.post('/add-outfitsAccessories', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        // Create the query and run it on the database
        intersection = `INSERT INTO OutfitsAccessories (outfit_id, accessory_id)
                VALUES ('${data.addOutfitID}', '${data.addAccessoryID}')`;

        db.pool.query(intersection, function(error, rows, fields){
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
            else{
                // If there was no error, perform a SELECT * on Tops
                all_intersections =  `SELECT OutfitsAccessories.outfit_acc_id, Outfits.name as outfit,
                                    Accessories.name as accessory FROM OutfitsAccessories JOIN Outfits 
                                    ON OutfitsAccessories.outfit_id = Outfits.outfit_id JOIN Accessories 
                                    ON OutfitsAccessories.accessory_id = Accessories.accessory_id 
                                    ORDER BY OutfitsAccessories.outfit_acc_id;`;
                db.pool.query(all_intersections, function(error, rows, fields){
    
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // send the results of the query back.
                    else{
                        res.redirect('/outfitsAccessories');
                    }
                })
            }
        })
    });

// Update Item
app.post('/update-user', function(req, res) 
{
    let data = req.body;

    let update_user = `UPDATE Users SET first_name = '${data.firstName}', last_name = '${data.lastName}', 
        email = '${data.email}', password = '${data.password}' WHERE user_id = ${data.updateUserID};`;

    db.pool.query(update_user, function(error, rows, fields){
        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
        }
        else{
            // If there was no error, perform a SELECT * on users
            all_users = `SELECT * FROM Users;`;
            db.pool.query(all_users, function(error, rows, fields){

                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                // send the results of the query back.
                else{
                    res.redirect('/users');
                }
            })
        }
    })
});

app.post('/update-outfit', function(req, res) {
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    let accessory = req.body.updateAccessory;
    let occasion = req.body.updateOccasion;

    // Create the query and run it on the database
    update_outfit = `UPDATE Outfits SET name = '${data.name}', top_id = ${data.topID}, bottom_id = ${data.bottomID}, 
                shoe_id = ${data.shoeID}, jacket_id = ${data.jacketID}, formality = '${data.formality}', 
                last_worn = '${data.lastWorn}' WHERE outfit_id = ${data.updateOutfitID};`;

    db.pool.query(update_outfit, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {
            // Log the error to the terminal, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
        else{
            // Update OutfitsAccessories
            delete_out_acc = `DELETE FROM OutfitsAccessories WHERE outfit_id = ${data.updateOutfitID}`
            db.pool.query(delete_out_acc, function(error, rows, fields){

                // Add entries to OutfitsAccessories Intersection Table
                for (ind in accessory){
                    let outfit_acc = `INSERT INTO OutfitsAccessories (outfit_id, accessory_id)
                                VALUES (${data.updateOutfitID}, ${accessory[ind]})`;
                    db.pool.query(outfit_acc, function(error, rows, fields){
                        if (error) {
                            console.log(error)
                            res.sendStatus(400);
                        }
                    })
                }
            })

            // Update OutfitsOccasions
            delete_out_occ = `DELETE FROM OutfitsOccasions WHERE outfit_id = ${data.updateOutfitID}`
            db.pool.query(delete_out_occ, function(error, rows, fields){
                
            // Add entries to OutfitsOccasions Intersection Table
                for (ind in occasion){
                    let outfit_occ = `INSERT INTO OutfitsOccasions (outfit_id, occasion_id)
                                VALUES (${data.updateOutfitID}, ${occasion[ind]})`;
                    db.pool.query(outfit_occ, function(error, rows, fields){
                        if (error) {
                            console.log(error)
                            res.sendStatus(400);
                        }
                    })
                }
            })
            res.redirect('/outfits');
        }
})
});  


// Delete Item
app.post('/delete-item/:tableName', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
        let tableName = req.params.tableName;
        let idName = data.idName;
    
        // Create the query and run it on the database
        query = `DELETE FROM ${tableName} WHERE ${idName} = ${data.deleteItemID}`;
        db.pool.query(query, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
                console.log(error)
                res.sendStatus(400);}
            else{
                all_items = `SELECT * FROM ${tableName};`;
                db.pool.query(all_items, function(error, rows, fields){
    
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);}
                    else{
                            res.redirect(`/${tableName.toLowerCase()}`);
                    }
                })
            }
        })
    });
    
app.post('/delete-outfit', function(req, res) 
{
// Capture the incoming data and parse it back to a JS object
let data = req.body;

// Create the query and run it on the database
outfit = `DELETE FROM Outfits WHERE outfit_id = ${data.deleteOutfitID}`;
db.pool.query(outfit, function(error, rows, fields){

    // Check to see if there was an error
    if (error) {

        // Log the error to the terminal, and send the visitor an HTTP response 400 indicating it was a bad request.
        console.log(error)
        res.sendStatus(400);
    }
    else{
        res.redirect('/outfits');
    }
})
});

app.post('/delete-accessory', function(req, res) 
    {
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        // Create the query and run it on the database
        accessory = `DELETE FROM Accessories WHERE accessory_id = ${data.deleteAccessoryID}`;
        db.pool.query(accessory, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
                console.log(error)
                res.sendStatus(400);}
            else{
                all_accessories = `SELECT * FROM Accessories;`;
                db.pool.query(all_accessories, function(error, rows, fields){
    
                    if (error) {
                        console.log(error);
                        res.sendStatus(400);}
                    else{
                            res.redirect('/accessories');
                    }
                })
            }
        })
    });

app.post('/delete-user', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    user = `DELETE FROM Users WHERE user_id = ${data.deleteUserID}`;
    db.pool.query(user, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {
            console.log(error)
            res.sendStatus(400);}
        else{
            all_users = `SELECT * FROM Users;`;
            db.pool.query(all_users, function(error, rows, fields){

                if (error) {
                    console.log(error);
                    res.sendStatus(400);}
                else{ 
                    res.redirect('/users');}
            })
        }
    })
});
    
/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});