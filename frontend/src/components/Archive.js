import { useEffect } from 'react'
import { useDataContext } from '../context/DataContext'
import { Card, Container } from 'react-bootstrap'

const Archive = () => {
  const { DarkMode, textDarkMode, shownTest, getAnswers, answers } = useDataContext()
  useEffect(() => {
    getAnswers()
  }, [shownTest])
  return (
    <div style={{minHeight: "95.5vh"}} className={`bg-${DarkMode} p-3`}>
      <Container className='answers'>
      {answers?.map(answer => {
        return <Card className='m-1 p-3' key={answer.id_student_grade}>
          <Card.Title>{answer.email}</Card.Title>
          <Card.Body>Procenta: {answer.percentage}</Card.Body>
          <Card.Body>Známka: {answer.grade}</Card.Body>
        </Card>
      })}
      </Container>
    </div>
  )
}

export default Archive