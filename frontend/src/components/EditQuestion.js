import React, { createRef, useRef, useState, useEffect } from 'react'

import { Card, Form, Button, Container, Alert } from 'react-bootstrap'
import { useDataContext } from '../context/DataContext'

const EditQuestion = ( { question, setEditing } ) => {
  const { DarkMode, textDarkMode, onChangeDarkMode, shownOwnTest, editQuestion } = useDataContext()
  const questionText = useRef()
  const answerTexts = useRef([useRef(), useRef(), useRef(), useRef()])
  const answerCorrects = useRef([useRef(), useRef(), useRef(), useRef()])

  const [err, setErr] = useState('')

  const handleEdit = (question) => {
    let answers = shownOwnTest.test_answers.filter(answer => {
      if(answer.id_question == question.id_question) return answer
    })

    var count = 0;
    for (let i = 0; i < 4; i++) {
      try{
        let xd = answerCorrects.current[i].current.checked
        count++
      }
      catch(e){}
    }
    if(count == 2){
      answerCorrects.current.splice(3)
      answerTexts.current.splice(3)
      answerCorrects.current.splice(2)
      answerTexts.current.splice(2)
    }
    if(count == 3){
      answerCorrects.current.splice(3)
      answerTexts.current.splice(3)
    }
    if(allEqual(answerCorrects.current)) return setErr('Vyber správnou odpověď!')

    setErr('')

    for (let j = 0; j < count; j++) {
      answers[j].correct = answerCorrects.current[j].current.checked
      answers[j].answer_text = answerTexts.current[j].current.value
    }
    question.text = questionText.current.value
    const json = {
      question,
      answers
    }

    editQuestion(json)
    setEditing(0)
  }

  const allEqual = (array) => {
      let areEqual = true;
      for (let element of array) {
        if (element.current.checked !== array[0].current.checked) {
          areEqual = false;
          break;
        }
      }
      return areEqual;
  }

  let i = 0
  return (
    <div className={`border border-2 border-${textDarkMode} w-100 mr-3 mt-3 pt-3`}>
      {err && <Alert variant='danger' className='m-3'>{err}</Alert>}
      <input className='display-5 text-capitalize rounded' defaultValue={question.text} ref={questionText} />
        {(shownOwnTest.test_answers).map((answer) => {
          return (
            <div key={answer.id_answer} className="d-flex justify-content-center">
                {answer.id_question === question.id_question && (
                  <div className="d-flex w-50 mt-3 mb-3 w-100">
                      <div className='h-100 d-flex'><Form.Check
                          type={"radio"}
                          name={question.text}
                          className='h-100 align-bottom'
                          ref={answerCorrects.current[i]}
                          defaultChecked={answer.correct}
                          /></div>
                      <input type="text" ref={answerTexts.current[i]} defaultValue={answer.answer_text} className="w-100 mx-3 rounded" />
                    <span style={{display: 'none'}}>{i++}</span>
                  </div>
                )}
              </div>
          )
        })}
        <Button variant={textDarkMode} className="m-3 w-75" onClick={() => handleEdit(question)}>Uložit</Button>
      </div>
  )
}

export default EditQuestion