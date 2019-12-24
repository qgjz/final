var express = require('express');
var router = express.Router();

function connect(){
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'123456',
        database:'final_zl'
    });
    return connection;
}
module.exports = {
    connect
}