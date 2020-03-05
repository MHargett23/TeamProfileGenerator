const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const teamArr = []
const init = () => {
    const checkAgain = () => {
        inquirer.prompt([{
            type: "list",
            name: "choices",
            message: "What type of team member would you like to add?",
            choices: [
                "Engineer",
                "Intern",
                "I don't want to add any more team members"
            ]
        }]).then(answers => {
            if (answers.choices === "Engineer") {
                makeEng()
            } else if (answers.choices === "Intern") {
                makeInt()
            } else makeTeam()
        })
    }
    const makeTeam = () => {
        fs.writeFile(outputPath, render(teamArr), err => {
            if (err) throw err
            console.log("...saving ")
        })
    }
    const makeInt = () => {
        inquirer.prompt([{
            type: "input",
            name: "internName",
            message: "What is your intern name?"

        }, {
            type: "input",
            name: "internID",
            message: "What is your intern ID?"

        }, {
            type: "input",
            name: "internEmail",
            message: "What is your intern email?"

        }, {
            type: "input",
            name: "school",
            message: "What is interns school?"
        }]).then(answers => {
            const int = new Intern(answers.internName, answers.internID, answers.internEmail, answers.school)
            teamArr.push(int)
            checkAgain()
        })
    }
    const makeEng = () => {
        inquirer.prompt([{
            type: "input",
            name: "engineerName",
            message: "What is your engineer name?"

        }, {
            type: "input",
            name: "engineerID",
            message: "What is your engineer ID?"

        }, {
            type: "input",
            name: "engineerEmail",
            message: "What is your engineer email?"

        }, {
            type: "input",
            name: "username",
            message: "What is engineers github username?"
        }]).then(answers => {
            const eng = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.username)
            teamArr.push(eng)
            checkAgain()
        })
    }



    inquirer.prompt([{
        type: "input",
        name: "managerName",
        message: "What is your managers name?"

    }, {
        type: "input",
        name: "managerID",
        message: "What is your managers ID?"

    }, {
        type: "input",
        name: "managerEmail",
        message: "What is your managers email?"

    }, {
        type: "input",
        name: "officeNumber",
        message: "What is your manager's office number?"
    }]).then(answers => {
        const mang = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.officeNumber)
        teamArr.push(mang)
        checkAgain()
    })
}




init()

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
