import React from 'react'
import { useDataContext } from  '../context/DataContext'
import { Button, Container } from 'react-bootstrap'

const Teacher = () => {
  const { teacherLogOut, teacher, DarkMode } = useDataContext() 
  return (
    <>
      <div style={{minHeight: "95.5vh"}} className={`bg-${DarkMode} text-${DarkMode.toLowerCase() === 'light' ? 'dark' : 'light'}`}>
        <Container>
          <h1>Učitel: {teacher.name}</h1>
          <Button onClick={teacherLogOut}>LogOut</Button>
        </Container>
      </div>
    </>
  )
}

export default Teacher