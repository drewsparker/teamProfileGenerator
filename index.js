// add requires for each type of employee

const inquirer = require('inquirer');
const fs = require('fs');
const { resolve } = require('path');
const Manager = require('./library/manager');
const Engineer = require('./library/engineer');
const Intern = require('./library/intern');


var employees = [];

const promptForTeamManagerQuestions = [
    {
        type: 'input',
        message: 'What is the team manager\'s name?',
        name: 'name',
    },
    {
        type: 'input',
        message: 'What is the team manager\'s employee ID?',
        name: 'id',
    },
    {
        type: 'input',
        message: 'What is the team manager\'s email address?',
        name: 'email',
    },
    {
        type: 'input',
        message: 'What is the team manager\'s office number?',
        name: 'officeNumber',
    },
]

const promptForAdditionalTeamMemberQuestion = [
    {
        type: 'confirm',
        message: 'Would you like to add an additional team member?',
        name: 'hasAdditional',
    },
    {
        type: 'list',
        message: 'What is the team member\'s role?',
        choices: ["Engineer", "Intern"],
        name: 'role',
        when: (answers) => answers.hasAdditional,
    },
    {
        type: 'input',
        message: 'What is the employee\'s name?',
        name: 'name',
        when: (answers) => answers.hasAdditional,
    },
    {
        type: 'input',
        message: 'What is the employee\'s employee ID?',
        name: 'id',
        when: (answers) => answers.hasAdditional,
    },
    {
        type: 'input',
        message: 'What is the employee\'s email address?',
        name: 'email',
        when: (answers) => answers.hasAdditional,
    },
    {
        type: 'input',
        message: 'What is the employee\'s github username?',
        name: 'github',
        when: (answers) => answers.hasAdditional && answers.role === 'Engineer',
    },
    {
        type: 'input',
        message: 'What is the employee\'s school?',
        name: 'school',
        when: (answers) => answers.hasAdditional && answers.role === 'Intern',
    },
]

function generateHtmlBlock(employee) {
    switch (employee.getRole()) {
        case 'Manager': {
            return `<div class="card border border-dark mb-5" style="box-shadow: 10px 5px 5px black; width: 18rem;">
        <div class="card-body bg-primary">
        <h3 class="text-light">${employee.name}</h3>
        <h5 class="text-light">☕ ${employee.getRole()}</h5>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">ID: ${employee.getId()}</li>
        <li class="list-group-item">Email: <a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></li>
        <li class="list-group-item">Office Number: ${employee.getOfficeNumber()}</li>
    </ul>
</div>`
        }

        case 'Engineer': {
            return `<div class="card border border-dark mb-5" style="box-shadow: 10px 5px 5px black; width: 18rem;">
        <div class="card-body bg-primary">
        <h3 class="text-light">${employee.name}</h3>
        <h5 class="text-light">👓 ${employee.getRole()}</h5>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">ID: ${employee.getId()}</li>
        <li class="list-group-item">Email: <a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></li>
        <li class="list-group-item">Github: <a href="https://github.com/${employee.getGithub()}">${employee.getGithub()}</a></li>
    </ul>
</div>`
        }

        case 'Intern': {
            return `<div class="card border border-dark mb-5" style="box-shadow: 10px 5px 5px black; width: 18rem;">
        <div class="card-body bg-primary">
        <h3 class="text-light">${employee.name}</h3>
        <h5 class="text-light">🎓 ${employee.getRole()}</h5>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">ID: ${employee.getId()}</li>
        <li class="list-group-item">Email: <a href="mailto:${employee.getEmail()}">${employee.getEmail()}</a></li>
        <li class="list-group-item">School: ${employee.getSchool()}</li>
    </ul>
</div>`
        }
    }
}

function promptForAdditionalTeamMembers() {
    return inquirer.prompt(promptForAdditionalTeamMemberQuestion)
        .then((data) => {
            switch (data.role) {
                case 'Engineer': {
                    const engineer = new Engineer(data.name, data.id, data.email, data.github);
                    employees.push(engineer);
                    break;
                }

                case 'Intern': {
                    const intern = new Intern(data.name, data.id, data.email, data.school);
                    employees.push(intern);
                    break;
                }
            }

            return data;
        })
        .then((data) => {
            if (data.hasAdditional) {
                return promptForAdditionalTeamMembers();
            } else {
                return null;
            }
        });
}

function init() {
    inquirer.prompt(promptForTeamManagerQuestions)
        .then((data) => {
            const manager = new Manager(data.name, data.id, data.email, data.officeNumber);
            employees.push(manager);
        })
        .then(() => {
            return promptForAdditionalTeamMembers()
        })
        .then(() => {
            return generateHTML(employees);
        })
        .then((html) => {
            writeToFile(html);
        });
}

function writeToFile(content) {
    fs.writeFile('dist/index.html', content, (err) =>
        err ? console.error(err) : console.log('Success'))
};

function generateHTML(employees) {
    const data = employees.map(employee => generateHtmlBlock(employee)).join("\n");
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,400i,700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
            integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
        <link rel="stylesheet" href="./assets/style.css" />
        <title>My Team</title>
    </head>
    
    <body>
        <header class="container-fluid bg-danger text-light mb-3 p-1">
            <h1 class="text-center ml-5"> My Team
            </h1>
        </header>
    
    
        <main>
            <div class="container" style="display:flex; flex-wrap: wrap; justify-content: space-evenly;">
                ${data}
            </div>
    
        </main>
    
    </body>
    
    </html>`
}

init();
