import { useEffect, useState } from 'react'
import { CgAdd } from 'react-icons/cg'
import CreateQuestion from './CreateQuestion'


const CreateTest = () => {
  const [numberOfQuestions, setNumberOfQuestions] = useState(0)
  const [arrayQuestions, setArrayQuestions] = useState([])

  useEffect(()=>{
    setArrayQuestions([...arrayQuestions, numberOfQuestions])
  }, [numberOfQuestions])

  return (
    <>
      <div className='text-center display-2'>Vytvořit test</div>
      <div className='w-100 text-center'>
        <button className='rounded-circle p-0' onClick={()=>setNumberOfQuestions(numberOfQuestions+1)}><CgAdd size='4rem'/></button>
        <div className='p-3'>
          {arrayQuestions?.map(q => (
            <CreateQuestion key={q} />
          ))}
        </div>
      </div>
    </>
  )
}

export default CreateTest