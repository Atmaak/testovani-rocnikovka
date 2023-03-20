import React, { useContext, useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import fetch from 'node-fetch'

import { useNavigate } from 'react-router-dom'
const DataContext = React.createContext()

export function useDataContext(){
    return useContext(DataContext)
}

export function DataProvider({ children }){
    const history = useNavigate()

    const [DarkMode, setDarkMode] = useState('dark')
    const [textDarkMode, settextDarkMode] = useState('light')
    const [cookies, setCookies, removeCookies] = useCookies()
    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(false)

    //student
    const [tests, setTests] = useState([])
    const [shownTest, setShownTest] = useState()

    //teacher
    const [teacher, setTeacher] = useState()
    const [testOnAccount, setTestsOnAccount] = useState([])
    const [shownOwnTest, setShowOwnTest] = useState()
    const [answers, setAnswers] = useState()
    const [grades, setGrades] = useState()
    //admin
    const [accounts, setAccounts] = useState()

    useEffect(()=> {
        if(cookies.teacher) {
            setTeacher(cookies.teacher)
            setIsAdmin(cookies.teacher.admin == 1)
        }
        getAccounts()
        getTests()
    }, [])
    useEffect(() => {
        getTestsFromAccount()
    }, [teacher])

    const onChangeDarkMode = () => {
        if(DarkMode === 'dark') {
            settextDarkMode('dark')
            return setDarkMode('light')
        }
        if(DarkMode === 'light'){
            settextDarkMode('light')
            return setDarkMode('dark')
        }
    }

    //student

    const getTests = async () => {
        let res = await fetch('http://localhost:3001/student/getAllTests')
        let data = await res.json()
        setTests(await data)
    }

    const getTest = async (test) => {
        let res = await fetch('http://localhost:3001/student/getTest', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({test: test})
        })
        let data = await res.json()
        setShownTest(data)
    }

    const completeTest = async (data) => {
        fetch('http://localhost:3001/student/completeTest', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
    }

    //teacher

    const getTestsFromAccount = async () => {
        if(!teacher) return
        let res = await fetch('http://localhost:3001/teacher/getTestFromAccount',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({teacher})
        })
        let data = await res.json()
        await setTestsOnAccount(data)
    }

    const getTeacherTest = async (test) => {
        let res = await fetch('http://localhost:3001/student/getTest', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({test: test})
        })
        let data = await res.json()
        await getGrades(data)
        await setShowOwnTest(data)
    }

    const teacherLogin = async (email, password) => {
        let res = await fetch('http://localhost:3001/teacher/loginToAccount',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: `{"email": "${email}", "password": "${password}"}`
        })
        let data = await res.json()
       
        if(data.done){
            setTeacher(data.user)
            setIsAdmin(data.user.admin == 1)
            setCookies('teacher', data.user)
            return data
        }
        else{
            return data
        }
    }

    const teacherRegister = async (name, email, password) => {
        let res = await fetch('http://localhost:3001/teacher/createAccount', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: `{"name":"${name}","email":"${email}","password":"${password}"}`
        })
        let data = await res.json()
        return data
    }

    const teacherLogOut = () => {
        removeCookies('teacher')
        setIsAdmin(false)
        setTeacher(null)
        history('/')
    }

    const createTest = async (test) => {
        await fetch('http://localhost:3001/teacher/createTest', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({teacher, test})
        })
        await getTests()
        await getTestsFromAccount()
    }

    const addGrading = (data) => {
        let dataToSend = { user: teacher, grades: data }
        fetch('http://localhost:3001/teacher/addGradingToTest', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({teacher, grades: data, test: shownTest, test: shownOwnTest})
        })
    }

    const getAnswers = async () => {
        let res = await fetch('http://localhost:3001/teacher/getStudentAnsvers',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(shownOwnTest.test)
        })
        let data = await res.json()
        setAnswers(data)
    }

    //admin

    const getAccounts = async () => {
        let res = await fetch('http://localhost:3001/admin/getAccounts')
        let data = await res.json()
        setAccounts(data)
    }

    const adminDeleteAccount = async (id_user) => {
        setLoading(true)
        await fetch('http://localhost:3001/admin/deleteAccount', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: `{"id_user": ${id_user}}`
        })
        await getAccounts()
        setLoading(false)
    }

    const adminReinstateAccount = async (id_user) => {
        setLoading(true)
        await fetch('http://localhost:3001/admin/reinstateAccount', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: `{"id_user": ${id_user}}`
        })
        await getAccounts()
        setLoading(false)
    }

    const editQuestion = (question) => {
        fetch('http://localhost:3001/teacher/editQuestion', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(question)
        })
    }

    const getGrades = async (test) => {
        let res = await fetch('http://localhost:3001/teacher/grades', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(test)
        })
        let data = await res.json()
        await setGrades(data)
    }

    const value = {
        DarkMode,
        textDarkMode,
        onChangeDarkMode,
        isAdmin,
        teacher,
        teacherLogin,
        teacherRegister,
        teacherLogOut,
        createTest,
        accounts,
        getAccounts,
        adminDeleteAccount,
        adminReinstateAccount,
        loading,
        tests,
        shownTest, 
        setShownTest,
        getTest,
        testOnAccount,
        getTeacherTest,
        shownOwnTest,
        addGrading,
        completeTest,
        getAnswers,
        answers,
        editQuestion,
        getGrades,
        grades
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}