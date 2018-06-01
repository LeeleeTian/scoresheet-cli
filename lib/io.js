"use strict";

let	queryNumber = require('cli-interact').getNumber;
let	query = require('cli-interact').question;
let Student = require('./main').Student;
let generateTranscript = require('./main').generateTranscript;
let split = require('./main').split;
let isCorrectInput = require('./main').isCorrectInput;
let completeGrades = require('./main').completeGrades;
let isCorrectFormat = require('./main').isCorrectFormat;
let isSidRepeat = require('./main').isSidRepeat;

let option, input;
let studentList = new Array();

while(true) {
    console.log(`1. 添加学生
2. 生成成绩单
3. 退出`);
    option = queryNumber(`请输入你的选择（1～3）： `, true);
    switch(option){
        case 1:
            input = query(`\n请输入学生信息（格式：姓名, 学号, 民族, 班级, 学科: 成绩, ...），按回车提交：\n`);
            let studentInfo = split(input, 1);
            while(!isCorrectInput(studentInfo) || isSidRepeat(studentInfo[1], studentList)){
                if(isCorrectInput(studentInfo) && isSidRepeat(studentInfo[1], studentList))
                    console.log(`\n学号${studentInfo[1]}的学生已存在。`);
                input = query(`\n请按正确的格式输入（格式：姓名, 学号, 学科: 成绩, ...）：\n`);
                studentInfo = split(input, 2);
            }
            console.log(`\n学生${studentInfo[0]}的成绩被添加\n`);
            let student = new Student(studentInfo[0], studentInfo[1], studentInfo[2],studentInfo[3], completeGrades(studentInfo[4]));
            studentList.push(student);
            break;
        case 2:
            do{
                input = query('\n请输入要打印的学生的学号（格式： 学号, 学号,...），按回车提交：\n');
            }while(!isCorrectFormat(input))
            generateTranscript(input, studentList);
            console.log('');
            break;
        case 3:
            process.exit();
        default:
            console.log(`\n选择范围为1～3，请重新选择。\n`);
            break;
    }
}




