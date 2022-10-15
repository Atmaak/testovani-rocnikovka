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

app.post('/teacher/createAccount', async (req, res) => {
    res.send(await account.createAccount(req.body))
})

app.post('/teacher/loginToAccount', async (req, res) => {
    res.send(await account.loginToAccount(req.body))
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

app.post('/teacher/createTest', async (req, res) => {
    res.send(await test.createTest(req.body))
})

app.get('/student/getAllTests', async (req, res) => {
    res.send(await test.getAllTests())
})