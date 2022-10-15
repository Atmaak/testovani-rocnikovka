import { useRef, useState, useEffect } from 'react'
import { useDataContext } from  '../context/DataContext'
import { Button, Container, Card } from 'react-bootstrap'

const Student = () => {
  const { DarkMode, tests } = useDataContext()
  const [shownData, setShownData] = useState([])
  const search = useRef()

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
  return (
    <>
      <div style={{minHeight: "95.5vh"}} className={`bg-${DarkMode}`}>
        <Container>
        <div className="form-outline mx-3">
            <input type="search" className="form-control" placeholder="Hledej pičo" onChange={handleSearch} ref={search}/>
        </div>
        <div className='m-3'>{shownData?.map((test) => {
          return <><Card className='mt-3'>
          <Card.Body className='display-6'>
            {test.name + ' '} 
            {test.invite_code + ' '}
            {test.quantity_of_questions}
          </Card.Body>
        </Card></>
        })}</div>
        </Container>
      </div>
    </>
  )
}

export default Student