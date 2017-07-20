// ------------------------------------------------------------------------------
// app-router.js
//
// Configure router for Vue application.
// ------------------------------------------------------------------------------

// Node modules
const express = require('express');
const history = require('connect-history-api-fallback');
const path = require('path');

// ------------------------------------------------------------------------------
// Setup and configure router
// ------------------------------------------------------------------------------

const router = express.Router();

// Setup router to use HTML5 History API for Vue app.
router.use(history());

// ------------------------------------------------------------------------------
// Routes
// ------------------------------------------------------------------------------

// Serve index.html with frontend application
router.use('/', (request, response) => {
    response.sendFile(path.join(__dirname, '../../public/index.html'));
});

// ------------------------------------------------------------------------------

module.exports = {
    appRouter: router
};

// ------------------------------------------------------------------------------

