import { useState, useEffect } from 'react'
import { useDataContext } from  '../context/DataContext'
import { Button } from 'react-bootstrap'
import { PieChart } from 'react-minimal-pie-chart'
const Stats = () => {
    const { DarkMode, textDarkMode, grades, shownOwnTest } = useDataContext()
    const [percentageData, setPercentageData] = useState()
    const [gradeData, setGradeData] = useState()
    //{ title: 'Jednička', value: parseFloat(100 - two.current.value),range: `${100}% - ${two.current.value}%`, color: '#1fea00' },
    const fillPercentageData = () => {
      let data  = 0
      {grades.map((grade) => {
        data += grade.percentage
      })}
      setPercentageData(data)
    }

    const fillGradeData = () => {
      let data = 0
      {grades.map((grade) => {
        data += grade.grade
      })}
      setGradeData(data)  
    }

    useEffect(() => {
      fillPercentageData()
      fillGradeData()
    }, []);

    return (
    <div style={{minHeight: "97vh"}} className={`bg-${DarkMode} text-${textDarkMode} d-flex justify-content-center`}>
        <div>
          <h1 className='text-center'>{shownOwnTest.test.name}</h1>
          <h3>Průměrný procenta: {percentageData / grades.length}</h3>
          <h3>Průměrná známka: {(gradeData / grades.length).toFixed(2)}</h3>
          <h3>Počet známek: {grades.length}</h3>
        </div>
    </div>
  )
}

export default Stats