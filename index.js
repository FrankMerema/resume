#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');

const response = chalk.bold.green;

const resume = require('./resume.json');

const main = () => {
    console.log('Hello, my name is Frank Merema and welcome to my resume');
    resumeHandler();
};

const resumeHandler = () => {
    const resumePrompts = {
        type: 'list',
        name: 'mainOptions',
        message: "What do you want to know about me?",
        choices: [...Object.keys(resume), 'Exit']
    };

    inquirer.prompt(resumePrompts).then(answer => {
        switch (answer[resumePrompts.name]) {
            case 'Exit':
                break;
            case 'Working Experience':
                experienceHandler();
                break;
            default:
                printData(resume[answer[resumePrompts.name]]);

                resumeHandler();
                break;
        }
    });
};

const experienceHandler = () => {
    const experiencePrompt = {
        type: 'list',
        name: 'experienceOptions',
        message: "About which assignment do you want to see more info?",
        choices: [...resume['Working Experience'], 'Back']
    };

    inquirer.prompt(experiencePrompt).then(answer => {
        switch (answer[experiencePrompt.name]) {
            case 'Back':
                resumeHandler();
                break;
            default:
                printData([answer[experiencePrompt.name]]);
                experienceHandler();
                break;
        }
    });
};

const printData = (data) => {
    data.forEach(info => {
        if (Array.isArray(info)) {
            printData(info)
        } else {
            console.log(response(info));
        }
    });
};

main();