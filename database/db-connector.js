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
  connectionString: process.env.DATABASE_URL, // Use the DATABASE_URL environment variable provided by Heroku
  ssl: {
    rejectUnauthorized: false, // Allow self-signed certificates (remove in production)
  },
});

module.exports = pool;

// Export it for use in our application
module.exports.pool = pool;