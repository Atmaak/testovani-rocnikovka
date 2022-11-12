import { useRef, useState, useEffect } from 'react'
import { Form, Dropdown, DropdownButton, Container, Button } from 'react-bootstrap'
import { CgAdd, CgOrganisation } from 'react-icons/cg'
import { useDataContext } from '../context/DataContext'
const CreateQuestion = ({ setNumberOfQuestions, numberOfQuestions, addQuestion}) => {
    const { textDarkMode } = useDataContext()

    const [used, setUsed] = useState(false)
    const [rightAnswer, setRightAnswer] = useState('')
    const [checkIt, setCheckIt] = useState(true)
    const question = useRef()

    const answer1 = useRef('')
    const answer2 = useRef('')
    const answer3 = useRef('')
    const answer4 = useRef('')
    
    useEffect(()=> {
        setCheckIt(!checkIt)
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        setUsed(true)
        setNumberOfQuestions(numberOfQuestions+1)
        if(answer1.current.value != '' && answer2.current.value != '' && answer3.current.value != '' && answer4.current.value != ''){
            return addQuestion({text: question.current.value, answers: [{ text: answer1.current.value, correct: `${rightAnswer === 'answer1'}` }, { text: answer2.current.value, correct: `${rightAnswer === 'answer2'}` },{ text: answer3.current.value, correct: `${rightAnswer === 'answer3'}` }, { text: answer4.current.value, correct: `${rightAnswer === 'answer4'}` }] })
        }if(answer1.current.value != '' && answer2.current.value != '' && answer3.current.value != ''){
            return addQuestion({text: question.current.value, answers: [{ text: answer1.current.value, correct: `${rightAnswer === 'answer1'}` }, { text: answer2.current.value, correct: `${rightAnswer === 'answer2'}` },{ text: answer3.current.value, correct: `${rightAnswer === 'answer3'}` }] })
        }if(answer1.current.value != '' && answer2.current.value != ''){
            return addQuestion({text: question.current.value, answers: [{ text: answer1.current.value, correct: `${rightAnswer === 'answer1'}` }, { text: answer2.current.value, correct: `${rightAnswer === 'answer2'}` }] })
        }
    }
    
    const handleCheck = (e) => {
        setRightAnswer(e.target.id)
        setCheckIt(!checkIt)
    }

    const handleTyping = () => {
        if(rightAnswer === 'answer3' && answer3.current.value === '') return setRightAnswer('answer1') 
        if(rightAnswer === 'answer4' && answer4.current.value === '') return setRightAnswer('answer1')
        answer2.current.value === '' ? answer3.current.value = '' : answer3.current.value = answer3.current.value
        answer3.current.value === '' ? answer4.current.value = '' : answer4.current.value = answer4?.current.value
        setCheckIt(!checkIt)
    }

  return (
    <div className='m-2 p-3 w-100 border'>
        <Form onSubmit={handleSubmit}>
            <div className="d-flex">
                <Form.Group id="text" className='w-100 mx-2 mb-2'>
                    <Form.Control type="text" ref={question} required placeholder="Otázka" disabled={used}/>
                </Form.Group>
            </div>

            <Container>
                <div className="mt-3">
                <Form.Group>
                    <div className='d-flex'>
                        <Form.Check id="answer1" type={'radio'} name="group" onChange={handleCheck} disabled={used} required checked={rightAnswer === 'answer1'} />
                        <Form.Group id="text1" className='w-100 m-2'> <Form.Control type="text" placeholder="Odpověď" ref={answer1} disabled={used} required onChange={handleTyping}/> </Form.Group>
                    </div>
                    <div className='d-flex'> 
                        <Form.Check id="answer2" type={'radio'} name="group" onChange={handleCheck} disabled={used} required checked={rightAnswer === 'answer2'} />
                        <Form.Group id="text2" className='w-100 m-2'> <Form.Control type="text" placeholder="Odpověď" ref={answer2} disabled={used} required onChange={handleTyping}/> </Form.Group>
                    </div>
                    <div className='d-flex'>
                        <Form.Check id="answer3" type={'radio'} name="group" onChange={handleCheck} disabled={used || answer3?.current.value === ''} checked={answer3?.current.value === '' ? false : rightAnswer === 'answer3'} />
                        <Form.Group id="text3" className='w-100 m-2'> <Form.Control type="text" placeholder="Odpověď" ref={answer3} disabled={used || answer2?.current.value === ''} onChange={handleTyping}/> </Form.Group>
                    </div>
                    <div className='d-flex'>
                        <Form.Check id="answer4" type={'radio'} name="group" onChange={handleCheck} disabled={used || answer4?.current.value === ''} checked={answer4?.current.value === '' ? false : rightAnswer === 'answer4'}/>
                        <Form.Group id="text4" className='w-100 m-2'> <Form.Control type="text" placeholder="Odpověď" ref={answer4} disabled={used || answer3?.current.value === ''} onChange={handleTyping} /></Form.Group>
                    </div>
                </Form.Group>
                {!used && <Button size={'lg'} variant={textDarkMode} className="w-25 h-25" type="submit">Pridat otázku</Button>}
                </div>
            </Container>
        </Form>
    </div>
  )
}

export default CreateQuestion