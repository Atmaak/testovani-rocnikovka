import { useState, useEffect } from 'react'
import { useDataContext } from '../context/DataContext'
import { Card, Form, Button, Container, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Test = () => {
  const { DarkMode, textDarkMode, shownTest } = useDataContext()
  const [answers, setAnswers] = useState([])
  const [grade, setGrade] = useState(0)
  const [submited, setSubmited] = useState(false)
  const [err, setErr] = useState()
  const [grades, setGrades] = useState([])
  const history = useNavigate()

  useEffect(() => {
    if(!shownTest) return history('/')
    setGrades([shownTest.test_grades[0].percentage, shownTest.test_grades[1].percentage, shownTest.test_grades[2].percentage, shownTest.test_grades[3].percentage])
  }, [])
  const handleSubmit = () => {
    let right = 0
    let wrong = 0
    answers.map((answer) => {
      if(answer == 'true') right++
      if(answer == 'false') wrong++
    })

    if(shownTest.test_questions.length !== wrong + right) return setErr('Nějaké otázky nejsou vyplněné')
    setSubmited(true)
    let percantage = right / shownTest.test_questions.length * 100
    if(percantage >= grades[0]) setGrade({grade: 1, percantage})
    else if(percantage >= grades[1]) setGrade({grade: 2, percantage})
    else if(percantage >= grades[2]) setGrade({grade: 3, percantage})
    else if(percantage >= grades[3]) setGrade({grade: 4, percantage})
    else if(percantage >= 0) setGrade({grade: 5, percantage})
    setErr('')
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
          {(shownTest.test_questions).map((question => {
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
              </Form>
            </div>)
          }))}
          <div className='mt-3'>{grade.grade > 0 && <Alert className={`w-100 display-1 text-dark`} variant={'success'}><div>Známka: {grade.grade}</div><div>Procenta: {grade.percantage} %</div></Alert> }</div>
          {err && <Alert className={`w-100 display-2 text-dark`} variant={'danger'}>{err}</Alert>}
          {!submited && <Button className='mt-3' variant={textDarkMode} onClick={handleSubmit} disabled={submited}>Odeslat</Button>}
          </Card.Body> 
        </Card>}

        </Container>
    </div>
  )
}

export default Test