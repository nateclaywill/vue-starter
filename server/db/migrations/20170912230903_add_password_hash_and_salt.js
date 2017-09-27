
exports.up = function(knex, Promise) {
    return knex.schema.table('users', (table) => {
        table.renameColumn('password', 'password_hash');
        table.string('password_salt').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('users', (table) => {
        table.renameColumn('password_hash', 'password');
        table.dropColumn('password_salt');
    });
};
