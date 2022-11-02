//require("dotenv").config();
const mySql = require("mysql2");

module.exports = mySql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port: process.env.port
});