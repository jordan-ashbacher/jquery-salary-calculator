console.log('js linked')

let employees = []
let monthlyExpenseTotal = 0

$(document).ready(handleReady)

function handleReady() {
    console.log('jq linked');

    renderDOM()

    //event listeners
    $('#submit-button').on('click', handleSubmit)

}

function renderDOM() {

    $('#employee-info').empty()

    for (let employee of employees) {

        let commaSalary = numWithCommas(employee.annualSalary)

        let employeeRow = $(`
        <tr class="employee">
            <td class"table-first-name">${employee.firstName}</td>
            <td class="table-last-name">${employee.lastName}</td>
            <td class="table-id">${employee.id}</td>
            <td class="table-title">${employee.title}</td>
            <td class="table-salary">$${commaSalary}</td>
            <td><button class="delete-employee">Delete</button>
        </tr>`)


        $('#employee-info').append(employeeRow)
    }

    console.log(monthlyExpenseTotal)

    

    //checking to make sure monthly expense will render at 0 when page initially loads

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
    monthlyExpenseTotal += Number(newEmployee.monthlySalary)

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

function calculateTotalMonthlyExpense() {
    // totalMonthlyExpense = 0
    // for (let employee of employees) {
    //     return totalMonthlyExpense += Number(employee.monthlySalary)
    // }

    // return totalMonthlyExpense

}
