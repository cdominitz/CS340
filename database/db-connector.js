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

const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, //change to your own string
    ssl: {
      rejectUnauthorized: false // For self-signed certificates, remove this line if you have a valid certificate
    }
  });

// Test the connection
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Error connecting to the database', err);
    } else {
      console.log('Connected to the database');
    }
  });

module.exports = pool;

// Export it for use in our application
module.exports.pool = pool;