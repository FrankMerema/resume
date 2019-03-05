#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');

const response = chalk.bold.green;

const resume = require('./resume.json');

const resumePrompts = {
    type: 'list',
    name: 'resumeOptions',
    message: "What do you want to know about me?",
    choices: [...Object.keys(resume), 'Exit']
};

const main = () => {
    console.log('Hello, my name is Frank Merema and welcome to my resume');
    resumeHandler();
};

const resumeHandler = () => {
    inquirer.prompt(resumePrompts).then(answer => {
        if (answer.resumeOptions === 'Exit') {
            return;
        }

        const option = answer.resumeOptions;

        console.log(response("--------------------------------------"));

        resume[`${option}`].forEach(info => {
            console.log(response("| " + info));
        });

        console.log(response("--------------------------------------"));

        inquirer
            .prompt({
                type: "list",
                name: "exitBack",
                message: "Go back or Exit?",
                choices: ["Back", "Exit"]
            })
            .then(choice => {
                if (choice.exitBack === 'Back') {
                    resumeHandler();
                }
            });
    });
};

main();