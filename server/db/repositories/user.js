const { db } = require('../index');
const User = require('../../models/user');

class UserRepository {

    constructor () {}

    async create (newUser) {
        let user = newUser.getDbObject();
        await db('users').insert(user);
    } // end create

    async getById (id) {
        let [ foundUser ] = await db('users').where({ id })
            .select('id', 'username', 'password_hash', 'password_salt');

        if (foundUser) {
            return new User(foundUser);
        }

        return null;
    } // end getById

}

// ------------------------------------------------------------------------------

module.exports = new UserRepository();

// ------------------------------------------------------------------------------

