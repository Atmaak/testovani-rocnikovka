import { useRef, useState, useEffect, createRef } from 'react'
import { PieChart } from 'react-minimal-pie-chart';
import { Container, Form, Button, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import { useDataContext } from  '../context/DataContext'

const AddGrading = () => {
  const history = useNavigate()
  const { DarkMode, textDarkMode, addGrading, shownOwnTest } = useDataContext()
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(true)
  const [pieChartData, setPieChartData] = useState([])

  const one = /* useRef() */ createRef()
  const two = /* useRef() */ createRef()
  const three = /* useRef() */ createRef()
  const four = /* useRef() */ createRef()
  const five = /* useRef() */ createRef()
  
  useEffect(() => {
    if(!shownOwnTest) return history('/teacher')
    let _grades = shownOwnTest.test_grades
    const xdddddd= async () => {
      setPieChartData([
        { title: 'Jednička', value: parseFloat(100 - _grades[0].percentage),range: `100% - ${_grades[0].percentage}%`, color: '#1fea00' },
        { title: 'Dvojka', value: parseFloat(_grades[0].percentage - _grades[1].percentage), range: `${_grades[0].percentage}% - ${_grades[1].percentage}%`, color: '#27a102' },
        { title: 'Trojka', value: parseFloat(_grades[1].percentage - _grades[2].percentage), range: `${_grades[1].percentage}% - ${_grades[2].percentage}%`, color: '#1c6000' },
        { title: 'Čtyřka', value: parseFloat(_grades[2].percentage - _grades[3].percentage), range: `${_grades[2].percentage}% - ${_grades[3].percentage}%`, color: '#002f06' },
        { title: 'Pětka', value: parseFloat(_grades[3].percentage - _grades[4].percentage), range: `${_grades[3].percentage} % - 0%`, color: '#000000' }
      ])

      setLoading(false)
    }
    xdddddd()
  }, [loading])
  

  const handleClick = () => {
    if(two.current.value <= 0 ) return setErr('Špatně zadána 2!')
    if(three.current.value <= 0 || two.current.value < three.current.value ) return setErr('Špatně zadána 3!')
    if(four.current.value <= 0 || three.current.value < four.current.value) return setErr('Špatně zadána 4!')
    if(five.current.value <= 0 || four.current.value < five.current.value) return setErr('Špatně zadána 5!')
    setPieChartData([
      { title: 'Jednička', value: parseFloat(100 - two.current.value),range: `${100}% - ${two.current.value}%`, color: '#1fea00' },
      { title: 'Dvojka', value: parseFloat(two.current.value - three.current.value), range: `${two.current.value}% - ${three.current.value}%`, color: '#27a102' },
      { title: 'Trojka', value: parseFloat(three.current.value - four.current.value), range: `${three.current.value}% - ${four.current.value}%`, color: '#1c6000' },
      { title: 'Čtyřka', value: parseFloat(four.current.value - five.current.value), range: `${four.current.value}% - ${five.current.value}%`, color: '#002f06' },
      { title: 'Pětka', value: parseFloat(five.current.value), range: `${five.current.value}% - ${0}%`, color: '#000000' }
    ])

    addGrading([two.current.value, three.current.value, four.current.value, five.current.value, 0])

    setErr('')
  }
  return (
    <div style={{minHeight: "97vh"}} className={`bg-${DarkMode}`}>
    {!loading && <Container className={`text-${textDarkMode}`}>
      {pieChartData && <div className='d-flex w-100'>
        <div style={{minWidth: "500px", minHeight: "500px"}}>
          {pieChartData.map(data => (
            <div key={data.title}>
            <div className='d-flex justify-content-between p-3 m-3 rounded' style={{backgroundColor: data.color}}>
              <h1 className='m-3 text-light'>{data.title}</h1>
              <h1 className='m-3 text-light'>{data.range}</h1>
            </div>
            </div>
          ))}
        </div>
      <PieChart
        style={{height: "500px"}}
        data={pieChartData}
      />
      </div>}
      <Form onSubmit={(e) => e.preventDefault()}>
        {err && <Alert variant="danger">{err}</Alert>}
        {/* <Form.Group id="email" className="d-flex m-3">
          <Form.Label className="mx-3">1: </Form.Label>
          <Form.Control className="mx-3" type="number" ref={one} min={grades[1].percentage} max={100} required />
        </Form.Group> */}
        <Form.Group id="email" className="d-flex m-3">
          <Form.Label className="mx-3">2: </Form.Label>
          <Form.Control className="" type="number" ref={two} required />
        </Form.Group>
        <Form.Group id="email" className="d-flex m-3">
          <Form.Label className="mx-3">3: </Form.Label>
          <Form.Control className="" type="number" ref={three} required />
        </Form.Group>
        <Form.Group id="email" className="d-flex m-3">
          <Form.Label className="mx-3">4: </Form.Label>
          <Form.Control className="" type="number" ref={four} required />
        </Form.Group>
        <Form.Group id="email" className="d-flex m-3">
          <Form.Label className="mx-3">5: </Form.Label>
          <Form.Control className="" type="number" ref={five} required />
        </Form.Group>
        <Button onClick={handleClick} type="submit" className='w-100 m-3' variant={textDarkMode}>Přidat známkování</Button>
    </Form>
  
    </Container>}
    </div>
    )
}

export default AddGrading