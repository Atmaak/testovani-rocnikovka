import React, { useEffect, useRef, useState } from 'react'

import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import { useDataContext } from  '../context/DataContext'

const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setErr] = useState('')
    const [loading, setLoading] = useState(true)

    const { DarkMode, teacherLogin } = useDataContext()
    const history = useNavigate()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!checkForm()) return
        let data = await teacherLogin(emailRef.current.value, passwordRef.current.value)
        if(!data.done)return setErr(data.message)
        history('/teacher')
    }
    const checkForm = () => {
        if((passwordRef.current.value).length < 6 && (emailRef.current.value).length < 6) {
            setErr('Vše musí být vyplněno')
            setLoading(true)
            return false
        }
        if((passwordRef.current.value).length < 6) {
            setErr('Heslo musí mít minimálně 6 znaků!')
            setLoading(true)
            return false
        }
        setErr('')
        setLoading(false)
        return true
    }
    
  return (
    <>
    <div className={`bg-${DarkMode} d-flex align-items-center justify-content-center h-75`} style={{minHeight: "95.5vh"}}> 
        <div className="w-100" style={{maxWidth: "400px"}}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Přihlášení</h2>
                    {error && <Alert variant="danger">{error} </Alert>}
                    <Form onSubmit={(e)=> handleSubmit(e)}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required onChange={checkForm}/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Heslo</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required onChange={checkForm}/>
                        </Form.Group>
                        <Button type="submit" className="w-100 mt-3" disabled={loading}>Přihlásit</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className={`w-100 text-center mt-2 text-${DarkMode.toLowerCase() === 'light' ? 'dark' : 'light'}`}>
                Nemáte účet? <Link to="/signup">Vytvořit účet</Link>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login