import React from 'react'

import { useNavigate } from 'react-router-dom'

import { Card } from 'react-bootstrap'

import StudentImg from '../images/student.jpg'
import TeacherImg from '../images/teacher.jpg'

import { useDataContext } from  '../context/DataContext'

const LandingPage = () => {
  const { DarkMode } = useDataContext()
  const history = useNavigate()

  const imageStylesCustom = {height: '75%', 'objectFit': 'cover'}
  const cardStylesCustom = { width: '50vw', height: '80vh', 'textAlign': 'center', cursor: "pointer", border: "1px solid black"}

  const goToLink = (link) => {
    history(link)
  }

  return (
    <div style={{minHeight: "97vh"}} className={`bg-${DarkMode} d-flex align-items-center justify-content-center`}>
      <Card onClick={() => goToLink('/student')} className="m-3" style={cardStylesCustom} bg={DarkMode.toLowerCase()} text={DarkMode.toLowerCase() === 'light' ? 'dark' : 'white'}>
        <Card.Img variant="top" src={StudentImg} style={imageStylesCustom}/>
        <Card.Body>
          <Card.Title className="display-2 font-weight-bold">Žák</Card.Title>
        </Card.Body>
      </Card>
      <Card onClick={() => goToLink('/teacher')} className="m-3" style={cardStylesCustom} bg={DarkMode.toLowerCase()} text={DarkMode.toLowerCase() === 'light' ? 'dark' : 'white'}>
        <Card.Img variant="top" src={TeacherImg} style={imageStylesCustom} />
        <Card.Body>
          <Card.Title className="display-2 font-weight-bold">Učitel</Card.Title>
        </Card.Body>
      </Card>
    </div>
  )
}

export default LandingPage