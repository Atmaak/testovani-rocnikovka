import { useEffect, useState, useRef } from 'react'
import CreateQuestion from './CreateQuestion'
import { useDataContext } from '../context/DataContext'
import { Container, Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const CreateTest = () => {
  const [numberOfQuestions, setNumberOfQuestions] = useState(0)
  const [CreateQuestions, setCreateQuestions] = useState([])
  const [questions, setQuestions] = useState([])
  
  const history = useNavigate()
  const { DarkMode, textDarkMode, createTest } = useDataContext()


  const name = useRef()

  useEffect(()=>{
    setCreateQuestions([...CreateQuestions, numberOfQuestions])
  }, [numberOfQuestions])

  useEffect(() => {
    console.log(questions)
  }, [questions]);

  const addQuestion = (question) => {
    /* console.log(questions.length)
    console.log(question) */
    if(questions.length > 0) return setQuestions([...questions, question])
    setQuestions([question])
  }

  const handleCreateTest = () => {
    console.log(questions)
    if(questions.length == 0) return
    createTest({name: name.current.value, quantity_of_questions: questions.length, questions: questions})
    history('/teacher')
  }

  return (
    <div style={{minHeight: "95.5vh"}} className={`bg-${DarkMode} text-${textDarkMode}`}>
      <Container>
      <div className='text-center display-2'>Vytvořit test</div>
      <div className='w-100 text-center'>
        <div className='p-3'>
          <div className='w-100 d-flex justify-content-center m-3'>
            <Form className='w-25'>
              <Form.Group id="text" className='w-100 mx-2 mb-2'>
                <Form.Control type="text" placeholder="Název testu" ref={name} required/>
              </Form.Group>
            </Form>
          </div>  
          {CreateQuestions?.map(q => (
            <CreateQuestion key={q} setNumberOfQuestions={setNumberOfQuestions} numberOfQuestions={numberOfQuestions} addQuestion={addQuestion} />
          ))}
          <div style={{textAlign: 'center'}} className="w-100 h-50 mt-3"><Button size={'lg'} variant={textDarkMode} className="w-25 h-25" onClick={handleCreateTest}>Vytvořit nový test</Button></div>
        </div>
      </div>
      </Container>
    </div>
  )
}

export default CreateTest