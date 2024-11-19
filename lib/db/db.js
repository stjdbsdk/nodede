const DBs = require("./dbs.js");

const DB = DBs.DB_ENV();
DB.connect();

module.exports = DB;