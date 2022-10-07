import React, { useContext, useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import fetch from 'node-fetch'

const DataContext = React.createContext()

export function useDataContext(){
    return useContext(DataContext)
}

export function DataProvider({ children }){
    const [DarkMode, setDarkMode] = useState('dark')
    const [cookies, setCookies, removeCookies] = useCookies()
    
    //teacher
    const [teacher, setTeacher] = useState()
    
    //admin
    const [accounts, setAccounts] = useState()

    useEffect(()=> {
        if(cookies.teacher) setTeacher(cookies.teacher)
        getAccounts()
    }, [])

    const onChangeDarkMode = () => {
        if(DarkMode === 'dark') return setDarkMode('light')
        if(DarkMode === 'light') return setDarkMode('dark')
    }

    //teacher
    const teacherLogin = async (email, password) => {
        let res = await fetch('http://localhost:3001/teacher/loginToAccount',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: `{"email": "${email}", "password": "${password}"}`
        })
        let data = await res.json()
       
        if(data.done){
            setTeacher(data.user)
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
        setTeacher(null)
    }

    //admin

    const getAccounts = async () => {
        let res = await fetch('http://localhost:3001/admin/getAccounts')
        let data = await res.json()
        setAccounts(data)

    }
    const value = {
        DarkMode,
        onChangeDarkMode,
        teacher,
        teacherLogin,
        teacherRegister,
        teacherLogOut,
        accounts
    }
    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}