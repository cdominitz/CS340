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


// Function to execute a query with error handling
async function executeQuery(query) {
    try {
        const result = await db.pool.query(query);
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/*
    ROUTES
*/
// Pages
// Route for '/'
app.get('/', function(req, res){
    res.render('index');
});

// Route for '/users'
app.get('/users', async function(req, res) {
    try {
        const query = "SELECT * FROM Users;";
        const users = await executeQuery(query);
        res.render('users', { data: users });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});
    

// Route for '/outfits'
app.get('/outfits', async function(req, res) {
    try {
        const outfitsQuery = `SELECT Outfits.outfit_id, Outfits.name, Tops.name as tops, Bottoms.name as bottoms, 
                                Shoes.name as shoes, Jackets.name as jackets, Outfits.formality, Outfits.last_worn
                                FROM Outfits JOIN Tops ON Outfits.top_id = Tops.top_id JOIN Bottoms ON 
                                Outfits.bottom_id = Bottoms.bottom_id JOIN Shoes ON Outfits.shoe_id = Shoes.shoe_id
                                LEFT JOIN Jackets ON Outfits.jacket_id = Jackets.jacket_id ORDER BY Outfits.outfit_id ASC;`;

        const outfits = await executeQuery(outfitsQuery);
        res.render('outfits', { data: outfits });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

app.get('/tops', async function(req, res) {
    try {
        const query = `
            SELECT Tops.*, Users.first_name, Users.last_name
            FROM Tops
            JOIN Users ON Tops.user_id = Users.user_id;
        `;

        const data = await executeQuery(query);

        res.render('tops', { data });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

app.get('/bottoms', async function(req, res) {
    try {
        const query = `
            SELECT Bottoms.*, Users.first_name, Users.last_name
            FROM Bottoms
            JOIN Users ON Bottoms.user_id = Users.user_id;
        `;

        const data = await executeQuery(query);

        res.render('bottoms', { data });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

app.get('/shoes', async function(req, res) {
    try {
        const shoesQuery = `
            SELECT Shoes.*, Users.first_name, Users.last_name
            FROM Shoes
            JOIN Users ON Shoes.user_id = Users.user_id;
        `;

        const shoes = await executeQuery(shoesQuery);

        res.render('shoes', { data: shoes });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

app.get('/jackets', async function(req, res) {
    try {
        const query = `
            SELECT Jackets.*, Users.first_name, Users.last_name
            FROM Jackets
            JOIN Users ON Jackets.user_id = Users.user_id;
        `;

        const data = await executeQuery(query);

        res.render('jackets', { data });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

app.get('/tops', async function(req, res) {
    try {
        const query = `
            SELECT Tops.*, Users.first_name, Users.last_name
            FROM Tops
            JOIN Users ON Tops.user_id = Users.user_id;
        `;

        const data = await executeQuery(query);

        res.render('tops', { data });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

app.get('/bottoms', async function(req, res) {
    try {
        const query = `
            SELECT Bottoms.*, Users.first_name, Users.last_name
            FROM Bottoms
            JOIN Users ON Bottoms.user_id = Users.user_id;
        `;

        const data = await executeQuery(query);

        res.render('bottoms', { data });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

app.get('/jackets', async function(req, res) {
    try {
        const query = `
            SELECT Jackets.*, Users.first_name, Users.last_name
            FROM Jackets
            JOIN Users ON Jackets.user_id = Users.user_id;
        `;

        const data = await executeQuery(query);

        res.render('jackets', { data });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

app.get('/accessories', async function(req, res) {
    try {
        const query = `
            SELECT Accessories.*, Users.first_name, Users.last_name
            FROM Accessories
            JOIN Users ON Accessories.user_id = Users.user_id;
        `;

        const data = await executeQuery(query);

        res.render('accessories', { data });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});


app.get('/occasions', async function(req, res) {
    try {
        const query = `
            SELECT Occasions.*, Users.first_name, Users.last_name
            FROM Occasions
            JOIN Users ON Occasions.user_id = Users.user_id;
        `;

        const data = await executeQuery(query);

        res.render('occasions', { data });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

// Route to outfitsOccasions
app.get('/outfitsOccasions', async function(req, res) {
    try {
        const outfitsOccasionsQuery = `
            SELECT OutfitsOccasions.outfit_occ_id, Outfits.name as outfit, 
                Occasions.name as occasion 
            FROM OutfitsOccasions 
            JOIN Outfits ON OutfitsOccasions.outfit_id = Outfits.outfit_id 
            JOIN Occasions ON OutfitsOccasions.occasion_id = Occasions.occasion_id;
        `;

        const outfitsQuery = `SELECT * FROM Outfits;`;

        const occasionsQuery = `SELECT * FROM Occasions;`;

        const [occasions, outfits, outfitsOccasions] = await Promise.all([
            executeQuery(occasionsQuery),
            executeQuery(outfitsQuery),
            executeQuery(outfitsOccasionsQuery)
        ]);

        res.render('outfitsOccasions', { data: outfitsOccasions, outfits, occasions });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

    
app.get('/outfitsAccessories', async function(req, res) {
    try {
        const outfitsAccessoriesQuery = `
            SELECT OutfitsAccessories.outfit_acc_id, Outfits.name as outfit,
                Accessories.name as accessory 
            FROM OutfitsAccessories 
            JOIN Outfits ON OutfitsAccessories.outfit_id = Outfits.outfit_id 
            JOIN Accessories ON OutfitsAccessories.accessory_id = Accessories.accessory_id 
            ORDER BY OutfitsAccessories.outfit_acc_id;
        `;

        const outfitsQuery = `SELECT * FROM Outfits;`;

        const accessoriesQuery = `SELECT * FROM Accessories;`;

        const [accessories, outfits, outfitsAccessories] = await Promise.all([
            executeQuery(accessoriesQuery),
            executeQuery(outfitsQuery),
            executeQuery(outfitsAccessoriesQuery)
        ]);

        res.render('outfitsAccessories', { data: outfitsAccessories, outfits, accessories });
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
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