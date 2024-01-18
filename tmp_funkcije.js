const database = require('./config/db.js')

exports.uzmiKomitente = function(callback) {
    database('komitent').select().then((rows) => {
        callback(rows);
    });
}
