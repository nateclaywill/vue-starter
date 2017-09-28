// ------------------------------------------------------------------------------
// User Constraints
//
// Property constraints to validate a user model.
// ------------------------------------------------------------------------------

const constraints = {
    username: {
        presence: true,
        length: {
            minimum: 5,
            maximum: 20
        }
    },
    email: {
        presence: true,
        email: true
    },
    password: {
        presence: true,
        length: {
            minimum: 8
        }
    }
};

// ------------------------------------------------------------------------------

module.exports = constraints;

// ------------------------------------------------------------------------------

