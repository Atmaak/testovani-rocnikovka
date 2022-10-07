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

const createAccount = async (data) => {
    return new Promise((resolve) => {
        con.query(`SELECT * FROM users WHERE email = '${data.email}' limit 1`, (err, result)=>{
            if(err) resolve(err)
            if(result.length > 0) return resolve({message: 'Email již používán', done: false})
            else {
                con.query(`INSERT INTO users(name, email, password) VALUES ('${data.name}', '${data.email}', '${passwordHash.generate(data.password)}')`, (err, result) => {
                    if(err) throw err
                })
                return resolve({message: 'Účet vytvořen', done: true})
            }
        })
    })
}

const loginToAccount = async (data) => {
    console.log(data)
    return new Promise((resolve) => {
        con.query(`SELECT * FROM users WHERE email = "${data.email}"`, (err, result) => {
            if(err) resolve(err)
            if(result.length == 0) return resolve({done: false, message: "Špatně zadané informace nebo účet neexistuje!"})
            if(passwordHash.verify(data.password, result[0].password)){
                resolve({done: true, user: result[0]})
            }
            else resolve({done: false, message: "Špatné heslo!"})
        })
    })
}
module.exports = {
    createAccount,
    loginToAccount
}