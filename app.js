// ------------------------------------------------------------------------------
// server.js
//
// Setup and run express application.
// ------------------------------------------------------------------------------

// Node modules
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const { Strategy } = require('passport-jwt');

// Server imports and config variables
const { appRouter } = require('./server/routes/app-router');
const authRoutes = require('./server/routes/auth');
const securePort = process.env.SSL_PORT || 3443;

// Services
const userService = require('./server/services/user');

// ------------------------------------------------------------------------------
// Configure Passport JWT strategy
// ------------------------------------------------------------------------------

const passportOptions = {};

passportOptions.jwtFromRequest = function (request) {
    let token = null;

    if (request && request.cookies) {
        token = request.cookies['token'];
    }

    return token;
};

passportOptions.secretOrKey = 'This is a development secret';

const strategy = new Strategy(passportOptions, async (payload, done) => {
    try {
        let user = userService.findById(payload.id);

        if (user) {
            done(null, user.getCleanObject());
        }
    }
    catch (error) {
        done(error, null);
    }
});

passport.use(strategy);

// ------------------------------------------------------------------------------
// Create and configure express server
// ------------------------------------------------------------------------------

const app = express();

// Setup app to use Passport for authentication
app.use(passport.initialize());

// Set views directory
app.set('views', 'server/views');

// Setup views for mostly static views in public site
app.set('view engine', 'pug');

// Parse requests and add to request.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

// ------------------------------------------------------------------------------
// Routes
// ------------------------------------------------------------------------------

// Make sure all requests to the server are secure and if not,
// redirect the request to use HTTPS.
app.all('*', (request, response, next) => {
    if (request.secure) {
        return next();
    }

    // If using the standard HTTPS port, don't add port to url
    if (securePort === 443) {
        response.redirect(`https://${ request.hostname }${ request.url }`)
    }
    else {
        response.redirect(`https://${ request.hostname }:${ securePort }${ request.url }`);
    }

});

// Set path for static files
app.use('/assets', express.static('public'));

// Set up routes for frontend application
app.use('/app', appRouter);

// GET /
// TODO: Route to public site or app depending the user's authentication.
app.get('/', (request, response) => response.render('index'));

app.use('/auth', authRoutes);

// ------------------------------------------------------------------------------

// Export server for testing
module.exports = {
    app
};

// ------------------------------------------------------------------------------

