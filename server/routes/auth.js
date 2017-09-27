const { Router } = require('express');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

// Services
const userService = require('../services/user');

const router = Router();

// GET /signup
router.get('/signup', (request, response) => response.render('signup'));

// POST /signup
// Create a user
router.post('/signup', async (request, response) => {
    let { username, email, password } = request.body;

    let errors = {};

    if (!(username && _.isString(username) && validator.isLength(username, { min: 5, max: 20 }))) {
        errors.username = {
            type: 'Invalid username',
            message: 'Please enter a valid username.'
        };
    }

    if (!(email && _.isString(email) && validator.isEmail(email))) {
        errors.email = {
            type: 'Invalid email address',
            message: 'Please enter a valid email address'
        };
    }

    if (!(password && _.isString(password) && validator.isLength(password, { min: 8 }))) {
        errors.password = {
            type: 'Invalid password',
            message: 'Please enter a valid password'
        };
    }

    if (Object.keys(errors).length > 0) {
        response.status(500).send(errors);
    }
    else {
        try {
            let user = await userService.createUser({ username, email, password });
            user = user.getCleanObject();

            let secret;

            if (process.env.NODE_ENV !== 'production') {
              secret = 'This is a development secret';
            }

            let token = jwt.sign({ id: user.id }, secret, { expiresIn: 86400 });
            response.cookie('token', token, { maxAge: 86400, httpOnly: true });

            response.status(200).send(user);
        }
        catch (error) {
            response.status(500).send(error.message);
        }
    }
});

module.exports = router;

