import React, { useEffect, useRef, useState } from 'react'

import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import { useDataContext } from  '../context/DataContext'

const SignUp = () => {
  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef('')
  const passwordAgainRef = useRef('')
  const [error, setErr] = useState('')
  const [loading, setLoading] = useState(true)

  const { DarkMode, teacherRegister } = useDataContext()
  const history = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!checkPass()) return console.log('xd')
    let res = await teacherRegister(nameRef.current.value, emailRef.current.value, passwordRef.current.value)
    if(!res.done) return setErr(res.message)
    history('/teacher')
  }

  const checkPass = () => {
    if((passwordRef.current.value).length < 6 || (passwordAgainRef.current.value).length < 6) {
      setLoading(true)
      setErr('Heslo musí mít aspoň 6 znaků!')
      return false
    }
    
    if(passwordRef.current.value !== passwordAgainRef.current.value){
      setLoading(true)
      setErr('Hesla se neschodují!')
      return false
    }

    setErr('')
    setLoading(false)
    return true
  }

  return (
    <div className={`bg-${DarkMode} d-flex align-items-center justify-content-center h-75`} style={{minHeight: "95.5vh"}}> 
        <div className="w-100" style={{maxWidth: "400px"}}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Vytvoření účtu</h2>
                    {error && <Alert variant="danger">{error} </Alert>}
                    <Form onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group id="text">
                            <Form.Label>Jméno a Příjmení</Form.Label>
                            <Form.Control type="text" ref={nameRef} required />
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Heslo</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required onChange={checkPass}/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Heslo znovu</Form.Label>
                            <Form.Control type="password" ref={passwordAgainRef} required onChange={checkPass}/>
                        </Form.Group>
                        <Button type="submit" className="w-100 mt-3" disabled={loading}>Vytvořit účet</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className={`w-100 text-center mt-2 text-${DarkMode.toLowerCase() === 'light' ? 'dark' : 'light'}`}>
                Již máte účet? <Link to="/login">Přihlašte se</Link>
            </div>
        </div>
    </div>
  )
}

export default SignUp