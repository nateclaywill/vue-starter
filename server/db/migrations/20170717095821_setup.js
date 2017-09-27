
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', (table) => {
        table.uuid('id').primary();
        table.string('username').notNullable().unique();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
