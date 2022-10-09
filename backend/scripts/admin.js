const mysql = require("mysql");
require('dotenv').config()
const passwordHash = require("password-hash");

const con = mysql.createConnection({
  host: process.env.db_host,
  user: process.env.db_user,
  password: "",
  database: process.env.db_name,
});

con.connect();

const getAccounts = () => {
    return new Promise((resolve) => {
        con.query('SELECT id_user, admin, name, email, timestamp, isDeleted FROM users', (err, result) => {
            if(err) return resolve(err)
            return resolve(result)
        })
    })
}

const deleteAccount = (data) => {
    con.query(`UPDATE users SET isDeleted = '1' WHERE users.id_user = ${data.id_user}`)
}

const reinstateAccount = (data) => {
    con.query(`UPDATE users SET isDeleted = '0' WHERE users.id_user = ${data.id_user}`)
}

module.exports = {
    getAccounts,
    deleteAccount,
    reinstateAccount
}