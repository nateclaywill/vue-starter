// ------------------------------------------------------------------------------
// User Repository
//
// Resource access for managing users.
// ------------------------------------------------------------------------------

// Knex connection
const { db } = require('../index');

// Models
const User = require('../../models/user');

// ------------------------------------------------------------------------------

class UserRepository {

    constructor () {}

    // Create a user
    async create (newUser) {
        let user = newUser.getDbObject();
        await db('users').insert(user);
    } // end create

    // Find a user by an id, and return props for user model
    // Create and return the model
    async getById (id) {
        let [ foundUser ] = await db('users').where({ id })
            .select('id', 'username', 'email', 'password_hash', 'password_salt');

        if (foundUser) {
            return new User(foundUser);
        }

        return null;
    } // end getById

    // Find a user by their username and return props for user
    // model, create and return the model
    async getByUsername (username) {
        let [ foundUser ] = await db('users').where({ username })
            .select('id', 'username', 'email', 'password_hash', 'password_salt');

        if (foundUser) {
            return new User(foundUser);
        }

        return null;
    } // end getByUsername

} // end UserRepository class

// ------------------------------------------------------------------------------

module.exports = new UserRepository();

// ------------------------------------------------------------------------------

