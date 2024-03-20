// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

    development: {
        client: 'mysql',
        connection: {
            host : 'localhost',
            port : 3306,
            user : 'root',
            password : '',
            database : 'projekat_test'
        }
    },

    staging: {
        client: 'mysql',
        connection: {
            host : 'localhost',
            port : 3306,
            user : 'root',
            password : '',
            database : 'projekat'
        }
    },

    production: {
        client: 'mysql',
        connection: {
            host : 'localhost',
            port : 3306,
            user : 'root',
            password : '',
            database : 'projekat'
        }
    }

};
