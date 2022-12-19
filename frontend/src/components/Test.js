import { useState, useEffect } from 'react'
import { useDataContext } from '../context/DataContext'
import { Card, Form, Button, Container, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Test = () => {
  const { DarkMode, textDarkMode, shownTest, completeTest } = useDataContext()
  const [answers, setAnswers] = useState([])
  const [grade, setGrade] = useState(0)
  const [submited, setSubmited] = useState(false)
  const [err, setErr] = useState()
  const [grades, setGrades] = useState([])
  const [email, setEmail] = useState(null)
  const history = useNavigate()

  useEffect(() => {
    if(!shownTest) return history('/')
    setGrades([shownTest.test_grades[0].percentage, shownTest.test_grades[1].percentage, shownTest.test_grades[2].percentage, shownTest.test_grades[3].percentage])
  }, [])
  const handleSubmit = async () => {
    let right = 0
    let wrong = 0
    let mail = email
    let _grade
    answers.map((answer) => {
      if(answer == 'true') right++
      if(answer == 'false') wrong++
    })
    
    if(shownTest.test_questions.length !== wrong + right) return setErr('Nějaké otázky nejsou vyplněné')
    if(email == null || validateEmail(email) == null) {
      mail = prompt('Napiš svůj E-mail')
      setEmail(mail)
    }
    if(mail == null) return setErr('Musíš vyplnit E-Mail!')
    if(validateEmail(mail) == null) return setErr('Toto neni validní E-Mail!') 
    setSubmited(true)
    let percentage = right / shownTest.test_questions.length * 100
    if(percentage >= grades[0]) _grade = {grade: 1, percentage}
    else if(percentage >= grades[1]) _grade = {grade: 2, percentage}
    else if(percentage >= grades[2]) _grade = {grade: 3, percentage}
    else if(percentage >= grades[3]) _grade = {grade: 4, percentage}
    else if(percentage >= 0) _grade = {grade: 5, percentage}
    setGrade(_grade)
    setErr('')
    completeTest({grade: _grade, email: mail, test: shownTest.test})
  }
  const validateEmail = (email) => {
    return String(email).toLowerCase().match( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ )
  }

  const handleClick = (data) => {
    let newArr = []
    if(answers.length > 0) newArr = [...answers]
    newArr[data.id_question - shownTest.test_answers[0].id_question] = data.correct
    setAnswers(newArr)
  }

  return (
    <div style={{minHeight: "95.5vh"}} className={`bg-${DarkMode}`}>
        <Container>
        {shownTest && <Card className={`bg-${DarkMode} text-${textDarkMode} text-center d-flex justify-content-center flex-column border-0`}>
          <Card.Title className='text-center display-4 text-capitalize'>{shownTest.test.name}</Card.Title>
          <Card.Body className="text-center d-flex justify-content-center flex-column">
          {(shownTest.test_questions).map(((question, index) => {
            return (<div key={question.id_question} className={`border border-2 border-${textDarkMode} w-100 mr-3 mt-3`}>
              <div className='display-5 text-capitalize'>{question.text}</div>
              <Form>
                {(shownTest.test_answers).map((answer) => {
                  return (
                      <div key={answer.id_answer} className="d-flex justify-content-center">
                          {answer.id_question === question.id_question && (
                              <div className="d-flex w-50 mt-3 mb-3">
                                  <div className='h-100'><Form.Check
                                      type={"radio"}
                                      name="group"
                                      className='h-100 align-bottom'
                                      disabled={submited}
                                      onClick={() => handleClick(answer)}
                                  /></div>
                                  <div className='display-6 w-100'>{answer.answer_text}</div>
                              </div>
                          )}
                      </div>
                  )
                })}
                {submited && <>{answers[index] == 'true' ? <h1 className='text-success'>Správně</h1> : <h1 className='text-danger'>Špatně</h1>}</>}
              </Form>
            </div>)
          }))}
          <div className='mt-3'>{grade.grade > 0 && <Alert className={`w-100 display-1 text-dark`} variant={'success'}><div>Známka: {grade.grade}</div><div>Procenta: {grade.percentage} %</div></Alert> }</div>
          {err && <Alert className={`w-100 display-2 text-dark`} variant={'danger'}>{err}</Alert>}
          {!submited && <Button className='mt-3' variant={textDarkMode} onClick={handleSubmit} disabled={submited}>Odeslat</Button>}
          </Card.Body> 
        </Card>}
          
        </Container>
    </div>
  )
}

export default Test