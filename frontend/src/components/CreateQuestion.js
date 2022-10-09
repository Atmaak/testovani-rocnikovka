import { useRef, useState, useEffect } from 'react'
import { Form, Dropdown, DropdownButton, Container } from 'react-bootstrap'
const CreateQuestion = () => {
    const question = useRef()

    const answer1 = useRef()
    const answer2 = useRef()
    const answer3 = useRef()
    const answer4 = useRef()
    const [questions, setQuestions] = useState([{id: 0, right: false, text: '', ref: answer1}])
    
    const handleTyping = () => {
        if(questions.length > 5) return
        if(questions[questions.lenght-1]?.text !== null){} return setQuestions([...questions, {id: questions.length, right: false, text: '', ref: `answer + ${questions.length}`}])
    }
  return (
    <div className='m-2 p-3 w-100 border'>
        <Form>
            <div className="d-flex">
                <Form.Group id="text" className='w-100 mx-2 mb-2'>
                    <Form.Control type="text" ref={question} required placeholder="Otázka"/>
                </Form.Group>
            </div>

            <Container>
                <div className="mt-3">
                    {questions.map(question => (
                        <div className='d-flex'>
                            <Form.Check
                                type={'radio'}
                            />
                            <Form.Group id="text" className='w-100 m-2'> <Form.Control type="text" placeholder="Odpověď" onChange={handleTyping} ref={`question.ref`} /> </Form.Group>
                        </div>
                    ))}
                </div>
            </Container>
        </Form>
    </div>
  )
}

export default CreateQuestion