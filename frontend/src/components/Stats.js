import { useState, useEffect } from 'react'
import { useDataContext } from  '../context/DataContext'
import { PieChart } from 'react-minimal-pie-chart'
const Stats = () => {
    const { DarkMode, textDarkMode, grades, shownOwnTest } = useDataContext()
    const [percentageData, setPercentageData] = useState()
    const [gradeData, setGradeData] = useState()
    const [pieChartData, setPieChartData] = useState([])
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

    const fillPieChartData = () => {
      let gradesS = [0,0,0,0,0]
      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < grades.length; j++) {
          if(grades[j].grade == i){
            console.log(grades[j].grade)
            gradesS[i] += 1
          }
        }
        
      }
      setPieChartData([
        { title: 'Jednička', value: grades.length / 100 * gradesS[0],range: `100% - ${grades.length / 100 * gradesS[0]}%`, color: '#1fea00' },
        { title: 'Dvojka', value: grades.length / 100 * gradesS[1], color: '#27a102' },
        { title: 'Trojka', value: grades.length / 100 * gradesS[2], color: '#1c6000' },
        { title: 'Čtyřka', value: grades.length / 100 * gradesS[3], color: '#002f06' },
        { title: 'Pětka', value: grades.length / 100 * gradesS[4],  color: '#000000' }
      ])
      console.log(pieChartData)
    }

    const doIt =() => {
      console.log('tisk')
      let printContents = document.getElementById("kolacek").innerHTML;
			let originalContents = document.body.innerHTML;

			document.body.innerHTML = printContents;

			window.print();

			document.body.innerHTML = originalContents;

    }

    useEffect(() => {
      fillPercentageData()
      fillGradeData()
      fillPieChartData()
    }, []);

    return (
    <div style={{minHeight: "97vh"}} className={`bg-${DarkMode} text-${textDarkMode} text-center`}>
        <div>
          <h1 className='text-center'>{shownOwnTest.test.name}</h1>
          <h3>Průměrný procenta: {(percentageData / grades.length).toFixed(2)}</h3>
          <h3>Průměrná známka: {(gradeData / grades.length).toFixed(2)}</h3>
          <h3>Počet známek: {grades.length}</h3>
        </div>
        <div id="kolacek">
          <div className='d-flex flex-wrap'>
          {pieChartData.map(data => (
            <div key={data.title}>
            <div className='d-flex justify-content-between p-3 m-3 rounded' style={{backgroundColor: data.color}}>
              <h1 className='m-3 text-light'>{data.title}</h1>
              <h1 className='m-3 text-light'>{data.value * 100 / grades.length}</h1>
            </div>
            </div>
          ))}
          </div>
          <PieChart
            style={{height: "500px"}}
            data={pieChartData}
          />
        <button onClick={doIt}>Tisk</button>
        </div>
    </div>
  )
}

export default Stats