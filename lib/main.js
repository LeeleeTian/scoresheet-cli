"use strict";

const subjectList = new Array('math', 'chinese', 'english', 'programming');

class Student {
    constructor(name, sid, ethnicity, klass, grade) {
        this.name = name;
        this.id = sid;
        this.ethnicity = ethnicity;
        this.klass = klass;
        this.grade = grade;
    }

    getTotalGrade() {
        return subjectList.reduce((sum, subject) => sum += this.grade[subject], 0);
    }

    getAverageGrade() {
        return this.getTotalGrade() / Object.keys(this.grade).length;
    }
}

function computeGrades(students) {
    let averageGrade = students.reduce((totalGrade, student) => totalGrade += student.getTotalGrade(), 0) / students.length;
    let grades = students.map((student) => student.getTotalGrade()).sort((a, b) => a - b);
    let middleGrade = ((grades.length % 2 == 0)? (grades[grades.length / 2] + grades[grades.length / 2 - 1]) / 2
                    : grades[Math.floor(grades.length / 2)]); 
    return [averageGrade, middleGrade];
}

function generateTranscript(input, studentList) {
    let student = selectStudent(format(input), studentList);
    let [averageGrade, middleGrade] = computeGrades(student);
    print(averageGrade, middleGrade, student);
}

function selectStudent(selectedSid, studentList) {
    selectedSid = [...new Set(selectedSid)];
    return studentList.filter((student) => (selectedSid.includes(student.id))? student : null);
}

function print(averageGrade, middleGrade, students) {
    let transcript = `成绩单
姓名|数学|语文|英语|编程|平均分|总分
========================`;
    for(var student of students) 
        transcript += `\n${student.name}` + subjectList.reduce((string, subject) => string += `|${student.grade[subject]}`, '') 
                   + `|${student.getAverageGrade()}|${student.getTotalGrade()}`;
    transcript += `\n========================
全班总分平均数：${averageGrade}
全班总分中位数：${middleGrade}`;
    console.log(transcript);
}

function split(input, times) {
    let grade = new Object();
    input = input.split(', '); 
    (times !== 1)? input.splice(2, 0, null, null) : null;
    return input.map((eachInfo, index) => {
        if(index === 1 || (index === 3 && times === 1)) 
            return parseInt(eachInfo);
        else if(index > 3){
            eachInfo = eachInfo.split(': ').map((e,i) => (i === 1)? parseInt(e) : e);
            grade[eachInfo[0]] = eachInfo[1];
            return grade;
        }
        return eachInfo;
    }).slice(0,5);
}

function isCorrectInput(studentInfo) {
    return (studentInfo.length === 5 && studentInfo.every((eachInfo, index) => {
        if(index === 1 || index === 3) 
            return !isNaN(eachInfo);
        else if(index === 4){
            let flag = true;
            for(var subject in eachInfo){
                if(subjectList.includes(subject) && !isNaN(eachInfo[subject]) && (eachInfo[subject] !== undefined))
                    flag = flag && true;
                else
                    flag = flag && false;
            }
            return flag;
        }else 
            return true;
    }));
}

function completeGrades(grades) {
    subjectList.forEach((subject) => (!Object.keys(grades).includes(subject))? grades[subject] = 0 : null);
    return grades;
} 

function isSidRepeat(sid, studentList) {
    return studentList.some((student) => student.id === sid);
}

function format(input) {
    return input.split(', ').map((e) => parseInt(e));
}

function isCorrectFormat(input) {
    return format(input).every((e) => !isNaN(e));
}

module.exports = {
    Student: Student,
    generateTranscript: generateTranscript,
    split: split,
    isCorrectInput: isCorrectInput,
    completeGrades: completeGrades,
    isCorrectFormat: isCorrectFormat,
    isSidRepeat: isSidRepeat
}; 



