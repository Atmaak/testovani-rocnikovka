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
  field.map(async (question) => {
    con.query(`INSERT INTO questions(id_test, text) VALUES (${id_test},'${question.text}')`)

    let id_question = await new Promise(resolve => {
      con.query('SELECT max(id_question) as id_question FROM questions', (err, result) => {
        resolve(result[0].id_question)
      })
    })
    let xd = question.answers
    xd.map((answer) => {
      return con.query(`INSERT INTO answers(id_question, text, correct) VALUES (${id_question}, '${answer.text}', '${answer.correct}')`)
    })
    
  
  }) 
  return data;
}

const completeTest = async (data) => {
  try{con.query(`INSERT INTO students_grades(id_test, email, grade, percentage) VALUES (${data.test.id_test}, '${data.email}', ${data.grade.grade}, ${data.grade.percentage} )`)}
  catch(err) {console.log(err)}
}

const getStudentAnsvers = async (data) => {
  return new Promise(resolve => {
    con.query(`SELECT * FROM students_grades WHERE id_test = ${data.id_test}`, (err, result) => {
      return resolve(result)
    })
  })
}

const getTest = async (data) =>  {
  const getAnswers = () => {
    return new Promise(resolve => {
      con.query(`SELECT * FROM answers_to_test where id_test = ${data.test.id_test}`, (err, result) => {
        return resolve(result)
      })
    })
  }

  const getQuestions = () => {
    return new Promise(resolve => {
      con.query(`SELECT * FROM questions where id_test = ${data.test.id_test}`, (err, result) => {
        return resolve(result)
      })
    })
  }

  const getGrading = () => {
    return new Promise(resolve => {
      con.query(`SELECT * FROM grades where id_grading = ${data.test.id_grading}`, (err, result) => {
        return resolve(result)
      })
    })
  }

  return {
    test: data.test,
    test_questions: await getQuestions(),
    test_answers: await getAnswers(),
    test_grades: await getGrading()
  }
}

const addGrading = async (data) => {
  con.query(`INSERT INTO grading(id_user) VALUES (${data.teacher.id_user})`)
  let id_grading = await new Promise(resolve => {
    con.query('SELECT max(id_grading) as id_grading FROM grading', (err, result) => {
      resolve(result[0].id_grading)
    })
  })

  data.grades.map((grade, index) => {
    con.query(`INSERT INTO grades(id_grading, grade, percentage) VALUES (${id_grading}, ${index+1}, ${grade})`)
  })

  con.query(`UPDATE tests SET id_grading=${id_grading} WHERE id_test = ${data.test.test.id_test}`)

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
  createTest,
  getTest,
  addGrading,
  completeTest,
  getStudentAnsvers
}