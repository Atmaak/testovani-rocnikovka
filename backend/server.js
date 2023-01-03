const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')

const account = require('./scripts/account')
const admin = require('./scripts/admin')
const test = require('./scripts/test')

app.use(express.json())

app.use(cors())

app.listen(process.env.port, () => {
    console.log('server running on port: ' + process.env.port)
})

app.get('/admin/getAccounts', async (req, res) => {
    res.send(await admin.getAccounts())
})

app.post('/admin/deleteAccount', (req, res) => {
    admin.deleteAccount(req.body)
    res.sendStatus(200)
})

app.post('/admin/reinstateAccount', (req, res) => {
    admin.reinstateAccount(req.body)
    res.sendStatus(200)
})




app.get('/student/getAllTests', async (req, res) => {
    res.send(await test.getAllTests())
})

app.post('/student/getTest' , async (req, res) => {
    res.send(await test.getTest(req.body))
})

app.post('/student/completeTest', async (req, res) => {
    res.send(test.completeTest(req.body))
})



app.post('/teacher/createAccount', async (req, res) => {
    res.send(await account.createAccount(req.body))
})

app.post('/teacher/loginToAccount', async (req, res) => {
    res.send(await account.loginToAccount(req.body))
})

app.post('/teacher/createTest', async (req, res) => {
    res.send(await test.createTest(req.body))
})

app.post('/teacher/getTestFromAccount', async (req, res) => {
    res.send(await account.getTestsFromAccount(req.body))
})

app.post('/teacher/addGradingToTest', (req, res) => {
    test.addGrading(req.body)
    res.sendStatus(200)
})

app.post('/teacher/getStudentAnsvers', async (req, res) => {
    res.send(await test.getStudentAnsvers(req.body))
})

app.post('/teacher/editQuestion', async (req, res) => {
    test.editQuestion(req.body)
    res.sendStatus(200)
})