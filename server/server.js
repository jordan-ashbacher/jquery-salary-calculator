const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 5000

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('server/public'))

let employees = []

app.post('/employee', (req, res) => {
    console.log('in POST /employee')
    let newEmployee = req.body
    console.log(newEmployee)
    employees.push(newEmployee)
    console.log(employees)
    res.sendStatus(201)
})

app.listen(PORT, () => {
    console.log('server is running on PORT', PORT)
})