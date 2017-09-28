// ------------------------------------------------------------------------------
// User Model
//
// Creates and validates users in the system.
// ------------------------------------------------------------------------------

// Node modules
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const validate = require('validate.js');

// User property validations
const constraints = require('./validations/userConstraints');

// ------------------------------------------------------------------------------

class User {

    // Create a new user if given a password, create an exisiting
    // user if given a password hash and salt
    constructor ({ id, username, email, password, password_hash, password_salt }) {
        if (password) {
            // Use property constraints to check for errors before
            // creating the user
            let errors;
            errors = validate({ username, email, password }, constraints);

            if (errors) {
                throw errors;
            }

            this.password = password;
        }
        else {
            // Set these properties if the user exists
            this.id = id;
            this.password_salt = password_salt;
            this.password_hash = password_hash;
        }

        this.username = username;
        this.email = email;
    } // end constructor

    // Creates a new UUID for a new user
    generateId () {
        if (!this.id) {
            this.id = uuidv4();
        }
    } // end save

    // Take a plain text password and generate a salt and hash for
    // the user
    async generateSaltAndHash (password) {
        this.password_salt = await bcrypt.genSalt(10);
        this.password_hash = await bcrypt.hash(password, this.password_salt);

        // Plain text password no longer needed after hashing
        delete this.password;
    } // end generateSaltAndHash

    // Returns a simple user object with sensitive data removed
    getCleanObject () {
        let { id, username, email } = this;

        return { id, username, email };
    } // end getCleanObject

    // Returns a simplified object with only data needed
    // to send to database
    getDbObject () {
        let user = this.getCleanObject();

        return {
            ...user,
            password_hash: this.password_hash,
            password_salt: this.password_salt
        };
    } // end getDbObject

    // Check if a plain text password is valid for this user
    async validatePassword (password) {
        return bcrypt.compare(password, this.password_hash);
    } // end validatePassword

} // end User class

// ------------------------------------------------------------------------------

module.exports = User;

// ------------------------------------------------------------------------------

