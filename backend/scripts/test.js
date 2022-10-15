const mysql = require("mysql");
require('dotenv').config()

const con = mysql.createConnection({
  host: process.env.db_host,
  user: process.env.db_user,
  password: "",
  database: process.env.db_name,
});

con.connect();

const getAllTests = () => {
  return new Promise(resolve => {
    con.query('SELECT * FROM tests', (err, result) => {
      if(err) return resolve(err)
      resolve(result)
    })
  })
}

const createTest = async (data) => {
  con.query(`INSERT INTO tests(name, invite_code, id_user, id_grading, quantity_of_questions) VALUES ('${data.test.name}', '${makeInviteCode()}', ${data.teacher.id_user}, 1, ${data.test.quantity_of_questions})`)
  const id_test = await new Promise(resolve => {
    con.query('SELECT max(id_test) as id_test FROM tests', (err, result) => {
      resolve(result[0].id_test)
    })
  })
  let field = data.test.questions
  field.map((question) => (
    con.query(`INSERT INTO answers(id_test, text, correct) VALUES (${id_test}, '${question.text}', '${question.correct}')`)
  )) 
  return data;
}

const  makeInviteCode = (length = 16) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
 }
 return result;
}

module.exports = {
  getAllTests,
  createTest
}