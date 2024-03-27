// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

    development: {
        client: 'mysql2',
        connection: {
            host : 'localhost',
            port : 3306,
            user : 'mujo',
            password : 'Mujo123!',
            database : 'test_project'
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
        client: 'mysql2',
        connection: {
            host: 'localhost',
            port: 3306,
            user: 'lgproject',
            password: 'OrloviRanoLete22$',
            database: 'project'
        }
    }

};
