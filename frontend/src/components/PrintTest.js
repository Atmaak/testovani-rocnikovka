import { useDataContext } from '../context/DataContext'
import { useNavigate } from 'react-router-dom'
const PrintTest = () => {
    const { shownOwnTest } = useDataContext()
    const history = useNavigate()
    const doIt = () => {
      document.title = shownOwnTest.test.name
      window.print()
      document.title = "Testovac"
      history('/teacher')
    }
    return (
        <>
         {shownOwnTest && <div id="testToPdf">
                <h1 className='text-center text-capitalize'>{shownOwnTest.test.name}</h1>
                <button onClick={doIt}>Vytisknout test</button>
                {(shownOwnTest.test_questions).map((question => {
              return (<div key={question.id_question} >
                <h1>{question.text}</h1>
                  {(shownOwnTest.test_answers).map((answer) => {
                    return (
                        <div key={answer.id_answer}>
                            {answer.id_question === question.id_question && (
                                <div className="d-flex w-50">
                                    <div><input
                                        type="checkbox"
                                    /></div>
                                    <h6 className='px-2'>{answer.answer_text}</h6>
                                </div>
                            )}
                        </div>
                    )
                  })}
              </div>)
            }))}
            </div>}  
        </>
  )
}

export default PrintTest