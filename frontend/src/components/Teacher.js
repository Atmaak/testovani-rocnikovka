import React from 'react'
import { useDataContext } from  '../context/DataContext'
import { Container, Button } from 'react-bootstrap'
import CreateTest from './CreateTest'

import { useNavigate } from 'react-router-dom'
const Teacher = () => {
  const { DarkMode, textModeColor } = useDataContext() 
  const history = useNavigate()
  const goToLink = (link) => {
    history(link)
  }

  return (
    <>
      <div style={{minHeight: "95.5vh"}} className={`bg-${DarkMode} text-${textModeColor}`}>
        <Container className='d-flex'>        
          <div style={{textAlign: 'center'}} className="w-100 h-50"><Button size={'lg'} variant={textModeColor} className="w-50 h-25" onClick={() => goToLink('/createTest')}>Vytvořit nový test</Button></div>
        </Container>
      </div>
    </>
  )
}

export default Teacher