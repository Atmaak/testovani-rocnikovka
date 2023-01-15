import { useState, useEffect, useRef } from 'react'
import { useDataContext } from '../context/DataContext'
import { Card, Form, Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import EditQuestion from './EditQuestion'

const ShowTest = () => {
  const history = useNavigate()
  const testToPdf = useRef()
  const [editing, setEditing] = useState(0)
  const { DarkMode, textDarkMode, onChangeDarkMode, shownOwnTest } = useDataContext()
  useEffect(() => {
    if(!shownOwnTest) return history('/')
  }, []);
  return (
    <div style={{minHeight: "97vh"}} className={`bg-${DarkMode}`}>
        <Container>
          {shownOwnTest && <Card className={`bg-${DarkMode} text-${textDarkMode} text-center d-flex justify-content-center flex-column border-0`} ref={testToPdf}>
            <Card.Title className='text-center display-4 text-capitalize'>{shownOwnTest.test.name}</Card.Title>
            <Card.Body className="text-center d-flex justify-content-center flex-column">
            {(shownOwnTest.test_questions).map((question => {
              if(question.id_question == editing){
                return <EditQuestion key={question.id_question} question={question} setEditing={setEditing}  />
              }
              return (<div key={question.id_question} className={`border border-2 border-${textDarkMode} w-100 mr-3 mt-3`}>
                <div className='display-5 text-capitalize'>{question.text}</div>
                  {(shownOwnTest.test_answers).map((answer) => {
                    return (
                        <div key={answer.id_answer} className="d-flex justify-content-center">
                            {answer.id_question === question.id_question && (
                                <div className="d-flex w-50 mt-3 mb-3 w-100 justify-content-center">
                                    <div className='h-100'><Form.Check
                                        type={"radio"}
                                        name="group"
                                        className='h-100 align-bottom'
                                    /></div>
                                    <div className='display-6 w-100'>{answer.answer_text}</div>
                                </div>
                            )}
                        </div>
                    )
                  })}
                  <Button onClick={() => setEditing(question.id_question)} variant={textDarkMode} className="m-3 w-50">Edit</Button>
              </div>)
            }))}
            </Card.Body> 
          </Card>}
        </Container>
    </div>
  )
}

export default ShowTest