import React from 'react'
import { useDataContext } from  '../context/DataContext'
import { Button, Container, Card } from 'react-bootstrap'

const Profile = () => {
    const { DarkMode, teacher, teacherLogOut } = useDataContext()
  return (
    <>
      <div style={{minHeight: "95.5vh"}} className={`bg-${DarkMode} `}>
        <Container>
          <Card className="w-100">
            <Card.Title className="display-1 text-center">
                Profil
            </Card.Title>
            <Card.Body className='display-6'>
                <div className="d-flex justify-content-center w-100" >
                    <div className='text-start m-3'>
                        <div className='m-2'>Jméno:</div>
                        <div className='m-2'>E-mail:</div>
                        <div className='m-2'>Založen:</div>
                    </div>
                    <div className='text-end m-3'>
                        <div className='m-2 text-capitalize'>{teacher.name}</div>
                        <div className='m-2'>{teacher.email}</div>
                        <div className='m-2'>{new Date(teacher.timestamp).toLocaleDateString()}</div>
                    </div>
                </div>
            </Card.Body>
            <Button onClick={teacherLogOut} variant={DarkMode} className={`border border-${DarkMode.toLowerCase() === 'light' ? 'dark' : 'light'}`}>Ohlásit se</Button>
          </Card>
        </Container>
      </div>
    </>
  )
}

export default Profile