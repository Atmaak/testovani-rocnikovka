import { useRef, useState, useEffect } from 'react'
import { PieChart } from 'react-minimal-pie-chart';
import { Container, Form, Button, Alert } from 'react-bootstrap'

import { useDataContext } from  '../context/DataContext'
const AddGrading = () => {
  const { DarkMode, textModeColor } = useDataContext()
  const [err, setErr] = useState('')

  const one = useRef('80')
  const two = useRef('60')
  const three = useRef('40')
  const four = useRef('20')
  const five = useRef('0')

  const [pieChartData, setPieChartData] = useState([
    { title: 'Jednička', value: 20,range: '100% - 80%', color: '#1fea00' },
    { title: 'Dvojka', value: 20, range: '80% - 60%', color: '#27a102' },
    { title: 'Trojka', value: 20, range: '60% - 40%', color: '#1c6000' },
    { title: 'Čtyřka', value: 20, range: '40% - 20%', color: '#002f06' },
    { title: 'Pětka', value: 20, range: '20% - 0%', color: '#000000' }
  ])
  
  const handleClick = () => {
    if(one.current.value <= 0 || 100 < one.current.value) return setErr('Špatně zadána 1!')
    if(two.current.value <= 0 || one.current.value < two.current.value) return setErr('Špatně zadána 2!')
    if(three.current.value <= 0 || two.current.value < three.current.value) return setErr('Špatně zadána 3!')
    if(four.current.value <= 0 || three.current.value < four.current.value) return setErr('Špatně zadána 4!')
    //if(five.current.value < 0 || four.current.value < 0)  return setErr('kokot')
    setPieChartData([
      { title: 'Jednička', value: parseFloat(100 - one.current.value),range: `${100}% - ${one.current.value}%`, color: '#1fea00' },
      { title: 'Dvojka', value: parseFloat(one.current.value - two.current.value), range: `${one.current.value}% - ${two.current.value}%`, color: '#27a102' },
      { title: 'Trojka', value: parseFloat(two.current.value - three.current.value), range: `${two.current.value}% - ${three.current.value}%`, color: '#1c6000' },
      { title: 'Čtyřka', value: parseFloat(three.current.value - four.current.value), range: `${three.current.value}% - ${four.current.value}%`, color: '#002f06' },
      { title: 'Pětka', value: parseFloat(four.current.value - 0), range: `${four.current.value}% - ${0}%`, color: '#000000' }
    ])
    setErr('')
  }
  return (
    <Container className={`text-${textModeColor}`}>
      {pieChartData && <div className='d-flex w-100'>
        <div style={{minWidth: "500px", minHeight: "500px"}}>
          {pieChartData.map(data => (
            <div key={data.title}>
            <div className='d-flex justify-content-between p-3 m-3' style={{backgroundColor: data.color}}>
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
       <Form.Group id="email" className="d-flex m-3">
          <Form.Label className="mx-3">1: </Form.Label>
          <Form.Control className="mx-3" type="number" ref={one} min={two.current.value} max={100} required />
        </Form.Group>
       <Form.Group id="email" className="d-flex m-3">
          <Form.Label className="mx-3">2: </Form.Label>
          <Form.Control className="mx-3" type="number" ref={two} min={three.current.value} max={100} required />
        </Form.Group>
       <Form.Group id="email" className="d-flex m-3">
          <Form.Label className="mx-3">3: </Form.Label>
          <Form.Control className="mx-3" type="number" ref={three} min={four.current.value} max={100} required />
        </Form.Group>
       <Form.Group id="email" className="d-flex m-3">
          <Form.Label className="mx-3">4: </Form.Label>
          <Form.Control className="mx-3" type="number" ref={four} min={five.current.value} max={100} required />
        </Form.Group>
       {/* <Form.Group id="email" className="d-flex m-3">
          <Form.Label className="mx-3">5: </Form.Label>
          <Form.Control className="mx-3" type="number" ref={five} min={0} max={100} required />
        </Form.Group> */}
        <Button onClick={handleClick} type="submit">Klik</Button>
    </Form>
  
    </Container>
    )
}

export default AddGrading