import { useRef, useState, useEffect } from 'react'
import { useDataContext } from  '../context/DataContext'
import { Button, Container, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Student = () => {
  const { DarkMode, tests, setShownTest, getTest } = useDataContext()
  const [shownData, setShownData] = useState([])
  const search = useRef()
  const history = useNavigate()
  
  useEffect(()=>{
    setShownData(tests)
  }, [tests])
  const handleSearch = () => {
    let val = search.current.value
    const filteredData = tests.filter((el) => {
        if (val === '') {
            return el;
        }
        else {
            return (el.invite_code).toLowerCase().includes(val)
        }
    })
    setShownData(filteredData.sort((a, b) => a.name.localeCompare(b.name)))
  }

  const handleClick = async (test) => {
    await setShownTest(test)
    await getTest(test)
    history('/test')
  }
  return (
    <>
      <div style={{minHeight: "95.5vh"}} className={`bg-${DarkMode}`}>
        <Container>
        <div className="form-outline mx-3 d-flex justify-content-center">
            <input type="search" className="form-control w-50" placeholder="Kód pozvánky" onChange={handleSearch} ref={search}/>
        </div>
        <div className='m-3'>{shownData?.map((test) => {
          return <Card className='mt-3' key={test.id_test}>
          <Card.Body className='display-6 text-center'>
            <div>{test.name + ' '} 
            {test.invite_code + ' '}
            {test.quantity_of_questions}</div>
            <Button size={'lg'} variant={DarkMode} onClick={() => handleClick(test)}>Vyplnit</Button>
          </Card.Body>
        </Card>
        })}</div>
        </Container>
      </div>
    </>
  )
}

export default Student