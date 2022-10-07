import React from 'react'
import { useDataContext } from  '../context/DataContext'
import { Button, Container } from 'react-bootstrap'

const Student = () => {
  const { DarkMode } = useDataContext()
  return (
    <>
      <div style={{minHeight: "95.5vh"}} className={`bg-${DarkMode} text-${DarkMode.toLowerCase() === 'light' ? 'dark' : 'light'}`}>
        <Container>
          Žák
        </Container>
      </div>
    </>
  )
}

export default Student