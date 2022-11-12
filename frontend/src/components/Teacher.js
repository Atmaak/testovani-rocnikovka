import React from 'react'
import { useDataContext } from  '../context/DataContext'
import { Container, Button } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom'
const Teacher = () => {
  const { DarkMode, textDarkMode, testOnAccount, getTeacherTest } = useDataContext() 
  const history = useNavigate()
  const goToLink = (link) => {
    history(link)
  }
  const handleClick = async (test) => {
    await getTeacherTest(test)
    history('/showTest')
  }

  const handleSend = () => {
    
  }

  const handleChangeGrading = async (test) => {
    await getTeacherTest(test)
    history('/changeGrading')
  }
  return (
    <>
      <div style={{minHeight: "95.5vh"}} className={`bg-${DarkMode} text-${textDarkMode}`}>
        <Container className='d-flex flex-column'>        
          <div style={{textAlign: 'center'}} className="w-100 h-50"><Button size={'lg'} variant={textDarkMode} className="w-50 h-25" onClick={() => goToLink('/createTest')}>Vytvořit nový test</Button></div>
          <div>
            {testOnAccount && <div>
              {testOnAccount.map(test => (
                <div key={test.id_test} className="border m-3">
                  <div className='display-4 text-capitalize mb-3 mx-3'>{test.name}</div>
                  <div className='m-3'>{test.invite_code}</div>
                  <div className='d-flex justify-content-end'>
                    <Button size={'lg'} className='m-3' variant={textDarkMode} onClick={handleSend}>Poslat test</Button>
                    <Button size={'lg'} className='m-3' variant={textDarkMode} onClick={() => handleClick(test)}>Zobrazit</Button>
                    <Button size={'lg'} className='m-3' variant={textDarkMode} onClick={() => handleChangeGrading(test)}>Změnit známkování</Button>
                  </div>

                </div>
              ))}  
            </div>}
          </div>
        </Container>
      </div>
    </>
  )
}

export default Teacher