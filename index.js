//Packages needed for an application
const fs = require("fs");
const inquirer = require("inquirer");

// array of questions for user
const questions = [
    //github question
    {
        type: 'input',
        name: 'github',
        message: 'To start generating your README file, please enter your GitHub username:',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('GitHub username is required!');
                return false;
            }
        }
    },
    //full name question
    {
        type: 'input',
        name: 'name',
        message: 'Enter your full name:',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Your full name is required!');
                return false;
            }
        }
    },
    // email question
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address:',
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log('Your email address is required!');
                return false;
            }
        }
    },
    // contact instruction question
    {
        type: 'input',
        name: 'contact',
        message: 'Please, provide instructions on how users may contact you regarding project:',
        validate: (contactInput) => {
            if (contactInput) {
                return true;
            } else {
                return false;
            }
        }
    },
    // project name question
    {
        type: 'input',
        name: 'project',
        message: 'Please, provide the name of your project:',
        validate: projectInput => {
            if (projectInput) {
                return true;
            } else {
                console.log('What is the name of your project?');
                return false;
            }
        }
    },
    // project description question
    {
        type: 'input',
        name: 'description',
        message: 'Please, provide the description of your project:',
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                console.log('Describe your project, please!');
                return false;
            }
        }
    },
    // installation question
    {
        type: 'input',
        name: 'installation',
        message: 'Please, provide some instructions for installation:',
        validate: installationInput => {
            if (installationInput) {
                return true;
            } else {
                console.log('Instructions for installation is required!');
                return false;
            }
        }
    },
    // usage question
    {
        type: 'input',
        name: 'usage',
        message: 'Please, provide some instructions for usage:',
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log('Instructions for usage is required!');
                return false;
            }
        }
    },
    // contributing confirmation
    {
        type: 'confirm',
        name: 'confirmContributing',
        message: 'Would you like other developers contribute to your project?'
    },
    // contribution question
    {
        type: 'input',
        name: 'contributing',
        message: 'Please, provide explanation on how the user can contribute on the project:',
        when: ({ confirmContributing }) => {
            if (confirmContributing) {
                return true;
            } else {
                return false;
            }
        },
        validate: contributingInput => {
            if (contributingInput) {
                return true;
            } else {
                console.log('Contribution explanation is required!');
                return false;
            }
        },
    },
    // testing question
    {
        type: 'input',
        name: 'testing',
        message: 'Please, provide testing description:',
        validate: testingInput => {
            if (testingInput) {
                return true;
            } else {
                console.log('Testing description is required!');
                return false;
            }
        }
    },
    // license confirmation
    {
        type: 'confirm',
        name: 'confirmLicense',
        message: 'Would you like to include a license to your project?',
    },
    // license pick
    {
        type: 'list',
        name: 'licenses',
        message: 'Choose the license you would like to include to your project:',
        choices: ['MIT', 'Apache 2.0', 'Mozilla', 'IBM', 'Exlipse'],
        when: ({ confirmLicense }) => {
            if (confirmLicense) {
                return true;
            } else {
                return false;
            }
        }
    },

];

// function to initialize program
function init() {
    inquirer
        .prompt(questions)
        .then((answers) => {
            const readMeFile = generateMarkdown(answers);
            fs.writeFile('generated-README.md', readMeFile, err =>
                err ? console.error(err) : console.log('All done, your README file is ready!'))
        })
};

// function call to initialize program
init();

// render licence badge
function renderLicense(license) {
    if (!license) {
        return ``;
    } if (license === 'MIT') {
        return '[![License:MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'
    } if (license === 'Apache 2.0') {
        return '[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)'
    } if (license === 'Mozilla') {
        return '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)'
    } if (license === 'IBM') {
        return '[![License: IPL 1.0](https://img.shields.io/badge/License-IPL_1.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)'
    } if (license === 'Exlipse') {
        return '[![License](https://img.shields.io/badge/License-EPL_1.0-red.svg)](https://opensource.org/licenses/EPL-1.0)'
    }
};

// function to generate readme file
function generateMarkdown(data) {
    return `
# ${data.project} 

 ${renderLicense(data.licenses)}

## Table of Contents
  * [Description](#description)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Contributing](#contributing)
  * [Testing](#testing)
  * [Contact](#contact)
  * [License](#license)
  * [Credits](#credits)

## Description
${data.description}

## Installation
${data.installation}

## Usage
${data.usage}

## Contributing
${data.contributing}

## Testing
${data.testing}

## Contact
${data.contact} </br>
[Email](mailto:${data.email}) </br>
[GitHub](https://github.com/${data.github}) 

## License
${data.licenses}

## Author
${data.name}

  
  `;
};