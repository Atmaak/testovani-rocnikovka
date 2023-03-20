import React from 'react'
import { useDataContext } from  '../context/DataContext'
import { Container, Button } from 'react-bootstrap'

import { useNavigate } from 'react-router-dom'
const Teacher = () => {
  const { DarkMode, textDarkMode, testOnAccount, getTeacherTest, getGrades } = useDataContext() 
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

  const handleStats = async (test) => {
    await getTeacherTest(test)
    history('/stats')
  }

  const handleChangeGrading = async (test) => {
    await getTeacherTest(test)
    history('/changeGrading')
  }
  
  const printTest = async (test) => {
    await getTeacherTest(test)
    history('/printTest')
  }

  const handleAnsvers = async (test) => {
    await getTeacherTest(test)
    history('/archive')
  }
  return (
    <>
      <div style={{minHeight: "97vh"}} className={`bg-${DarkMode} text-${textDarkMode}`}>
        <Container className='d-flex flex-column'>        
          <div style={{textAlign: 'center'}} className="w-100 h-50"><Button size={'lg'} variant={textDarkMode} className="w-50 h-25" onClick={() => goToLink('/createTest')}>Vytvořit nový test</Button></div>
          <div>
            {testOnAccount && <div>
              {testOnAccount.map(test => (
                <div key={test.id_test} className="border m-3">
                  <div className='display-4 text-capitalize mb-3 mx-3'>{test.name}</div>
                  <div className='m-3'>{test.invite_code}</div>
                  <div className='d-flex justify-content-end'>
                    {/* <Button size={'sm'} className='m-3' variant={textDarkMode} onClick={handleSend}>Poslat test</Button> */}
                    <Button size={'sm'} className='m-3' variant={textDarkMode} onClick={() => handleClick(test)}>Zobrazit</Button>
                    <Button size={'sm'} className='m-3' variant={textDarkMode} onClick={() => handleAnsvers(test)}>Odpovědi</Button>
                    <Button size={'sm'} className='m-3' variant={textDarkMode} onClick={() => handleChangeGrading(test)}>Změnit známkování</Button>
                    <Button size={'sm'} className='m-3' variant={textDarkMode} onClick={() => printTest(test)}>Vytisknout / Uložit jako PDF</Button>
                    <Button size={'sm'} className='m-3' variant={textDarkMode} onClick={() => handleStats(test)}>Statistiky</Button>
                    
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