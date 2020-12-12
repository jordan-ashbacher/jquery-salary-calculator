console.log('js linked')

let employees = []
let monthlyExpenseTotal = 0

$(document).ready(handleReady)

function handleReady() {
    console.log('jq linked');
    //event listeners
    
    renderDOM()

    $('#submit-button').on('click', handleSubmit)
    

}

function renderDOM() {

    $('#employee-info').empty()

    for (let employee of employees) {
        let employeeID = employee.id
        let commaSalary = numWithCommas(employee.annualSalary)

        let employeeRow = $(`
        <tr class="employee align-middle">
            <td class"table-first-name">${employee.firstName}</td>
            <td class="table-last-name">${employee.lastName}</td>
            <td class="table-id">${employee.id}</td>
            <td class="table-title">${employee.title}</td>
            <td class="table-salary">$${commaSalary}</td>
            <td><button class="delete-employee btn btn-secondary">Delete</button></td>
        </tr>`)

        
        $('#employee-info').append(employeeRow)
        $('.delete-employee').on('click', deleteEmployee)
        $('.delete-employee').data('employeeID', employeeID)
        console.log($('.delete-employee').data())

    }

    calculateMonthlyExpenseTotal()
    console.log(monthlyExpenseTotal)

    //set totalMonthlyExpense to string so that it can be passed into numWithCommas
    let stringMonthlyExpense = String(monthlyExpenseTotal)
    let totalMonthlyExpenseCommas = numWithCommas(stringMonthlyExpense)

    // //Render monthly total to DOM
    $('#total-monthly-expense').text(`Total Monthly: $${totalMonthlyExpenseCommas}`)



}

function handleSubmit() {
    console.log('submit button clicked')

    //create new employee object from input fields
    let newEmployee = {
        firstName: $('#first-name-in').val(),
        lastName: $('#last-name-in').val(),
        id: $('#id-in').val(),
        title: $('#title-in').val(),
        annualSalary: $('#annual-salary-in').val(),
        monthlySalary: 0,
        calculateMonthlySalary: function (annualSalary) {
            this.monthlySalary = annualSalary / 12
            return this.monthlySalary = this.monthlySalary.toFixed(2)
        }
    }

    $('#first-name-in').val('')
    $('#last-name-in').val('')
    $('#id-in').val('')
    $('#title-in').val('')
    $('#annual-salary-in').val('')

    console.log(newEmployee)
    newEmployee.calculateMonthlySalary(newEmployee.annualSalary)
    console.log(newEmployee.monthlySalary)
    // monthlyExpenseTotal += Number(newEmployee.monthlySalary)

    employees.push(newEmployee)
    console.log(employees)


    renderDOM()
}

/*
function to add commas to strings after 3 digits:
https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
*/
function numWithCommas(num) {
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function deleteEmployee() {
    console.log(`delete button clicked`)
    let value = ($(this)).data('employeeID')
    console.log(value)

    for (let i = 0; i < employees.length; i++) {
        if (employees[i].id === value) {
            employees.splice(i, 1)
        }
        
    }

    console.log(employees)
    // let target = $(this).closest('.table-id')
    // console.log(target)
    $(this).closest('.employee').remove()
    
    

    renderDOM()

    // monthlyExpenseTotal -= value

    // let stringMonthlyExpense = String(monthlyExpenseTotal)
    // let totalMonthlyExpenseCommas = numWithCommas(stringMonthlyExpense)
    // $('#total-monthly-expense').text(`Total Monthly: $${totalMonthlyExpenseCommas}`)
    
}

function calculateMonthlyExpenseTotal() {
    monthlyExpenseTotal = 0
    for (employee of employees) {
        monthlyExpenseTotal += Number(employee.monthlySalary)
    }
}
