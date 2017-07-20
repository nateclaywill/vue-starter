// ------------------------------------------------------------------------------
// server.js
//
// Setup and run express application.
// ------------------------------------------------------------------------------

// Node modules
const express = require('express');
const history = require('connect-history-api-fallback');

// Server imports and config variables
const { db } = require('./server/db');
const { appRouter } = require('./server/routes/app-router');
const port = process.env.PORT || 3000;

// ------------------------------------------------------------------------------
// Create and configure express server
// ------------------------------------------------------------------------------

const app = express();

// Set views directory
app.set('views', 'server/views');

// Setup views for mostly static views in public site.
app.set('view engine', 'pug');

// ------------------------------------------------------------------------------
// Routes
// ------------------------------------------------------------------------------

// Set path for static files
app.use('/assets', express.static('public'));

// Set up routes for frontend application
app.use('/app', appRouter);

// GET /
// TODO: Route to public site or app depending the user's authentication.
app.get('/', (request, response) => response.render('index'));

// GET /users
// Create a user
// TODO: Remove. This method only tests inserting into database.
app.get('/users', (request, response) => {
    const user = {
        username: 'testuser1',
        email: 'testuser@example.com',
        password: 'testpassword'
    };

    db('users')
        .insert(user)
        .then((user) => {
            response.send(user);
        });
});

// ------------------------------------------------------------------------------

// Start server
app.listen(port, () => console.log(`Server running on port ${ port }`));

// Export server for testing
module.exports = {
    app
};

// ------------------------------------------------------------------------------

