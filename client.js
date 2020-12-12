console.log('js linked')

let employees = []

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

        let commaSalary = salaryWithCommas(employee.annualSalary)

        let employeeRow = $(`
        <tr class="employee">
            <td>${employee.firstName}</td>
            <td>${employee.lastName}</td>
            <td>${employee.id}</td>
            <td>${employee.title}</td>
            <td>$${commaSalary}</td>
            <td><button class="delete-employee">Delete</button>
        </tr>`)


        $('#employee-info').append(employeeRow)
    }



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
    console.log(newEmployee)
    newEmployee.calculateMonthlySalary(newEmployee.annualSalary)
    console.log(newEmployee.monthlySalary)

    employees.push(newEmployee)
    console.log(employees)

    renderDOM()
}

/*
function to add commas to strings after 3 digits:
https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
*/

function salaryWithCommas(salary) {
    return salary.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}


