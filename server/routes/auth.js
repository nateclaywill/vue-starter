// ------------------------------------------------------------------------------
// auth.js
//
// Routes for authenticating and authorizing users.
// ------------------------------------------------------------------------------

// Node modules
const { Router } = require('express');
const jwt = require('jsonwebtoken');

// Services
const userService = require('../services/user');

// Router variables
const router = Router();

// ------------------------------------------------------------------------------
// Routes
// ------------------------------------------------------------------------------

// GET /auth/signup
router.get('/signup', (request, response) => response.render('signup'));

// POST /auth/signup
// Create a user and return a signed token stored in a cookie
router.post('/signup', async (request, response) => {
    let { username, email, password } = request.body;

    if (!(username && email && password)) {
        response.status(500).send('Please fill out all fields!');
    }

    try {
        let user = await userService.createUser({ username, email, password });
        user = user.getCleanObject();

        // TODO: Move secret to environment config
        let secret;

        if (process.env.NODE_ENV !== 'production') {
          secret = 'This is a development secret';
        }

        // Sign token and store in cookie
        let token = jwt.sign({ id: user.id }, secret, { expiresIn: 86400 });
        response.cookie('token', token, { maxAge: 86400, httpOnly: true, secure: true });

        response.status(200).send(user);
    }
    catch (error) {
        response.status(500).send(error);
    }
});

// GET /auth/login
router.get('/login', (request, response) => response.render('login'));

// POST /auth/login
// Log in user and return a signed token stored in a cookie
router.post('/login', async (request, response) => {
    let { username, password } = request.body;

    if (!(username && password)) {
        response.status(500).send('Please fill out all fields!');
    }

    let user = await userService.findByUsername(username);

    if (user) {
        let isValidated = await user.validatePassword(password);

        if (isValidated) {
            user = user.getCleanObject();

            // TODO: Move secret to environment config
            let secret;

            if (process.env.NODE_ENV !== 'production') {
                secret = 'This is a development secret';
            }

            // Sign token and store in cookie
            let token = jwt.sign({ id: user.id }, secret, { expiresIn: 86400 });
            response.cookie('token', token, { maxAge: 86400, httpOnly: true, secure: true });

            response.status(200).send(user);
        }
        else {
            response.status(401).send('Not Authorized');
        }
    }
    else {
        response.status(404).send('User not found');
    }
});

// ------------------------------------------------------------------------------

module.exports = router;

// ------------------------------------------------------------------------------

