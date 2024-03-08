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
    connectionString: "postgres://u1dsaiuvc3tl9s:pa457fbbc641307c24223e7656fa171729cde5c858f00a1100db49130d418df49@ceu9lmqblp8t3q.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com:5432/d58n6lfurskcol",
    ssl: {
      rejectUnauthorized: false // For self-signed certificates, remove this line if you have a valid certificate
    }
  });

module.exports = pool;

// Export it for use in our application
module.exports.pool = pool;