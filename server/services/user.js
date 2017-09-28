// ------------------------------------------------------------------------------
// User Service
//
// Service for creating and finding users.
// ------------------------------------------------------------------------------

// Repositories
const userRepository = require('../db/repositories/user');

// Models
const User = require('../models/user');

// ------------------------------------------------------------------------------

class UserService {

    constructor () {}

    // Create a new user, generate a new id, and hash the password
    // Then send the user to the repository to be stored in db
    // Returns the created user
    async createUser (newUser) {
        let user = new User(newUser);

        user.generateId();
        await user.generateSaltAndHash(user.password);
        await userRepository.create(user);

        return user;
    } // end createUser

    // Find a user by their id
    async findById (id) {
        let user = await userRepository.getById(id);

        if (user) {
            return user;
        }
        else {
            return null;
        }
    } // end findById

    // Find a usr by their username
    async findByUsername (username) {
        let user = await userRepository.getByUsername(username);

        if (user) {
            return user;
        }
        else {
            return null;
        }
    }

} // end UserService class

// ------------------------------------------------------------------------------

module.exports = new UserService();

// ------------------------------------------------------------------------------

