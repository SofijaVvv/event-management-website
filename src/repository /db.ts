

 const dbEngine = "production"
 const config = require("./knexfile")[dbEngine]
 const knex = require("knex")(config)

export default knex