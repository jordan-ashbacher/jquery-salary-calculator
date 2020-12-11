console.log('js linked')

let employees = []

$(document).ready(handleReady)

function handleReady() {
    console.log('jq linked');

    // renderDom()

    //event listeners
    $('#submit-button').on('click', handleSubmit)
    
}

function renderDOM() {

    $('#employee-info').empty()

    for (let employee of employees) {
        
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
        annualSalary: $('#annual-salary-in').val()
    }
    console.log(newEmployee)

    employees.push(newEmployee)
    console.log(employees)
}