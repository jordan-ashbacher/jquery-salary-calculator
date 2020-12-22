const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 5000

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('server/public'))

let employees = []

const deleteEmployee = (employeeID, employees) => {
    for (i=0; i < employees.length; i++) {
        if (employees[i].id === employeeID.id) {
            employees.splice(i, 1)
        }
    }
}

app.post('/employee', (req, res) => {
    console.log('in POST /employee')
    let newEmployee = req.body
    console.log(newEmployee)
    employees.push(newEmployee)
    console.log(employees)
    res.sendStatus(201)
})

app.get('/employee', (req, res) => {
    console.log('in GET /employee')
    res.send(employees)
})

app.delete('/delete', (req, res) => {
    console.log('in DELETE /delete')
    let employeeID = req.body
    console.log(employeeID)
    console.log(employees)
    deleteEmployee(employeeID, employees)
    console.log(employees)
    res.send(employees)

})

app.listen(PORT, () => {
    console.log('server is running on PORT', PORT)
})