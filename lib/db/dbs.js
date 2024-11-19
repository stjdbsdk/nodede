const mysql = require('mysql2');

const DBs = {
    // DB_LOCAL: () => {
    //     return mysql.createConnection({
    //         host: 'localhost',
    //         port: '3306',
    //         user: 'root',
    //         password: '1234',
    //         database: 'DB_MEMBER1004', 
    //         dateStrings: true,
    //     });
    // }, 

    // DB_DEV: () => {
    //     return mysql.createConnection({
    //         host: '192.168.56.101',
    //         port: '3306',
    //         user: 'root',
    //         password: '1234',
    //         database: 'DB_MEMBER1004', 
    //         dateStrings: true,
    //     });
    // },

    // DB_PROD: () => {
    //     return mysql.createConnection({
    //         host: '52.79.134.125',
    //         port: '3306',
    //         user: 'root',
    //         password: '1234',
    //         database: 'DB_MEMBER1004', 
    //         dateStrings: true,
    //     });
    // },

    DB_ENV: () => {
        return mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE, 
            dateStrings: process.env.DB_DATESTRINGS,
        });
    }

}

module.exports = DBs;