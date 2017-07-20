// ------------------------------------------------------------------------------
// db/index.js
//
// Setup knex configuration and connect to database.
// ------------------------------------------------------------------------------

// Node modules
const knex = require('knex');

// ------------------------------------------------------------------------------
// Get environment configuration from knexfile
// ------------------------------------------------------------------------------

const environment = process.env.NODE_ENV || 'development';

// Get config from local knexfile, if it exists
// Otherwise, use default settings
const knexConfig = require('../../knexfile') || require('../../knexfile.default');
const config = knexConfig[environment];

// Create database connection
const db = knex(config);

// ------------------------------------------------------------------------------

module.exports = {
    db
};

// ------------------------------------------------------------------------------

