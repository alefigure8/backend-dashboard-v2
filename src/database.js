const mysql = require('mysql');
const { promisify } = require('util')
const { database } = require('./keys');


const mysqlConnection = mysql.createPool(database);

mysqlConnection.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TOO MANY CONNECTIONS');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }

    if (connection) connection.release();

    console.log('DB IS CONNECTED');

    return;
})

mysqlConnection.query = promisify(mysqlConnection.query); //Async await

module.exports = mysqlConnection;