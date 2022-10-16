import React from 'react'
import { useDataContext } from '../context/DataContext'
import { Card, Form, Button } from 'react-bootstrap'

const ShowTest = () => {
  const { DarkMode, textModeColor, shownTest } = useDataContext()
  return (
    <div style={{minHeight: "95.5vh"}} className={`bg-${DarkMode}`}>
        {shownTest && <Card className={`bg-${DarkMode} text-${textModeColor} text-center d-flex justify-content-center flex-column`}>
          <Card.Title className='text-center display-4 text-capitalize'>{shownTest.test.name}</Card.Title>
          <Card.Body className="text-center d-flex justify-content-center flex-column">
            {console.log(shownTest)}
          {(shownTest.test_questions).map((question => {
            return (<div key={question.id_question} className={`border border-2 border-${textModeColor} w-100 mr-3 mt-3`}>
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
                                  /></div>
                                  <div className='display-6 w-100'>{answer.answer_text}</div>
                              </div>
                          )}
                      </div>
                  )
                })}
                <Button className='m-3' variant={textModeColor}>Odeslat</Button>
              </Form>
            </div>)
          }))}
          </Card.Body> 
        </Card>}
    </div>
  )
}

export default ShowTest