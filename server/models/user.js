// ------------------------------------------------------------------------------
// user.js
// ------------------------------------------------------------------------------

const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');

class User {

    constructor ({ id, username, email, password, password_hash, password_salt}) {
        this.username = username;
        this.email = email;

        if (password) {
            this.password = password;
        }
        else {
            this.password_salt = password_salt;
            this.password_hash = password_hash;
        }

        if (id) {
            this.id = id;
        }
    } // end constructor

    generateId () {
        this.id = uuidv4();
    } // end save

    async generateSaltAndHash (password) {
        this.password_salt = await bcrypt.genSalt(10);
        this.password_hash = await bcrypt.hash(password, this.password_salt);

        delete this.password;
    } // end generateSaltAndHash

    getCleanObject () {
        let { id, username, email } = this;

        return { id, username, email };
    } // end getCleanObject

    getDbObject () {
        let user = this.getCleanObject();

        return {
            ...user,
            password_hash: this.password_hash,
            password_salt: this.password_salt
        };
    } // end getDbObject

} // end User class

// ------------------------------------------------------------------------------

module.exports = User;

// ------------------------------------------------------------------------------

