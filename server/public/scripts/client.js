console.log('js linked')


let monthlyExpenseTotal = 0

$(document).ready(handleReady)

function handleReady() {
    console.log('jq linked');


    renderDOM()

    //event listener for click on submit button
    $('#submit-button').on('click', handleSubmit)


}



function renderDOM() {

    $.ajax({
        url: '/employee',
        type: 'GET'
    }).then(function (response) {
        console.log(response)
        let employees = response
        $('#employee-info').empty()

        for (let employee of employees) {
            // let index = employee.id
            // console.log(index)
            let commaSalary = numWithCommas(employee.annualSalary)

            let employeeRow = $(`
        <tr class="employee align-middle">
            <td class"table-first-name">${employee.firstName}</td>
            <td class="table-last-name">${employee.lastName}</td>
            <td class="table-id">${employee.id}</td>
            <td class="table-title">${employee.title}</td>
            <td class="table-salary">$${commaSalary}</td>
            <td><button data-index=${employee.id} class="delete-employee btn btn-secondary">Delete</button></td>
        </tr>`)


            $('#employee-info').append(employeeRow)
            $('.delete-employee').on('click', deleteEmployee)

            //assign .delete-employee data of empoyee id. Keeps getting overwritten as new employees are added
            // $('.delete-employee').data('employeeID', employee.id)
            // console.log($('.delete-employee').data())

        }

        calculateMonthlyExpenseTotal()


    })

}

function handleSubmit() {
    console.log('submit button clicked')

    // Testing if conditional to ensure no duplicate IDs
    // if (employees.length > 0) {
    //     for (let employee of employees) {
    //         if ($('#id-in').val() === employee.id) {
    //             $('#first-name-in').val('')
    //             $('#last-name-in').val('')
    //             $('#id-in').val('')
    //             $('#title-in').val('')
    //             $('#annual-salary-in').val('')
    //             return alert(`Employee ID Number already in system`)
    //         }
    //     }
    // }

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
    // monthlyExpenseTotal += Number(newEmployee.monthlySalary)

    $.ajax({
        url: '/employee',
        type: 'POST',
        data: newEmployee
    }).then(function (response) {
        console.log(response)
        $('#first-name-in').val('')
        $('#last-name-in').val('')
        $('#id-in').val('')
        $('#title-in').val('')
        $('#annual-salary-in').val('')
    })




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

   $.ajax({
       url: '/delete',
       type: 'DELETE'
   }).then(function (response) {
       console.log(response)
       renderDOM()
   })
}

function calculateMonthlyExpenseTotal() {
    console.log('in calculateMonthlyExpenseTotal')
    $.ajax({
        url: '/employee',
        type: 'GET'
    }).then(function (response) {
        let employees = response
        monthlyExpenseTotal = 0
        for (employee of employees) {
            monthlyExpenseTotal += Number(employee.monthlySalary)
        }
        console.log(monthlyExpenseTotal)
        console.log(`Monthly Expense: ${monthlyExpenseTotal}`)

        //set totalMonthlyExpense to string so that it can be passed into numWithCommas
        let stringMonthlyExpense = String(monthlyExpenseTotal)
        let totalMonthlyExpenseCommas = numWithCommas(stringMonthlyExpense)

        // //Render monthly total to DOM
        $('#total-monthly-expense').text(`Total Monthly: $${totalMonthlyExpenseCommas}`)

        if (monthlyExpenseTotal >= 20000) {
            $('#total-monthly-expense').attr('class', 'highlight')
        } else {
            $('#total-monthly-expense').attr('class', '')
        }
    })


}
