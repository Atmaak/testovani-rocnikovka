import React, { useContext, useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import fetch from 'node-fetch'

const DataContext = React.createContext()

export function useDataContext(){
    return useContext(DataContext)
}

export function DataProvider({ children }){
    const [DarkMode, setDarkMode] = useState('dark')
    const [textModeColor, setTextModeColor] = useState('light')
    const [cookies, setCookies, removeCookies] = useCookies()
    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(false)
    
    //teacher
    const [teacher, setTeacher] = useState()
    
    //admin
    const [accounts, setAccounts] = useState()

    useEffect(()=> {
        if(cookies.teacher) setTeacher(cookies.teacher)
        setIsAdmin(cookies.teacher.admin == 1)
        getAccounts()
    }, [])

    const onChangeDarkMode = () => {
        if(DarkMode === 'dark') {
            setTextModeColor('dark')
            return setDarkMode('light')
        }
        if(DarkMode === 'light'){
            setTextModeColor('light')
            return setDarkMode('dark')
        }
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

    const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const value = {
        DarkMode,
        textModeColor,
        onChangeDarkMode,
        isAdmin,
        teacher,
        teacherLogin,
        teacherRegister,
        teacherLogOut,
        accounts,
        adminDeleteAccount,
        adminReinstateAccount,
        loading
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}