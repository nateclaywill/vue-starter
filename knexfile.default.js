// ------------------------------------------------------------------------------
// knexfile.default.js
//
// Default configuration database connection and migrations by environment.
// Override with local knexfile.js
// ------------------------------------------------------------------------------

module.exports = {

    development: {
        client: 'pg',
        connection: {
            host: 'localhost',
            database: 'vend_tracker',
            user: 'postgres'
        },
        migrations: {
            directory: __dirname + '/server/db/migrations'
        }
    },

    test: {
        client: 'pg',
        connection: {
            host: 'localhost',
            database: 'vend_tracker_test',
            user: 'postgres'
        },
        migrations: {
            directory: __dirname + '/server/db/migrations'
        }
    }

};

// ------------------------------------------------------------------------------
