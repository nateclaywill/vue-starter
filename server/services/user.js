const userRepository = require('../db/repositories/user');
const User = require('../models/user');

class UserService {
    constructor() {}

    async createUser (newUser) {
        let user = new User(newUser);

        user.generateId();
        await user.generateSaltAndHash(user.password);
        await userRepository.create(user);

        return user;
    } // end createUser

    async findById (id) {
        let user = await userRepository.getById(id);

        if (user) {
            return user;
        }
        else {
            return null;
        }
    } // end findById
}

// ------------------------------------------------------------------------------

module.exports = new UserService();

// ------------------------------------------------------------------------------

