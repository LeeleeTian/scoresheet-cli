"use strict";

let sinon = require('sinon');
let Student = require('../lib/main').Student;
let generateTranscript = require('../lib/main').generateTranscript;
let split = require('../lib/main').split;
let isCorrectInput = require('../lib/main').isCorrectInput;
let completeGrades = require('../lib/main').completeGrades;
let isCorrectFormat = require('../lib/main').isCorrectFormat;
let isSidRepeat = require('../lib/main').isSidRepeat;

describe('Students\' transcript', () => {

    describe('Student', () => {
        let grade;

        beforeEach(() => {
            grade = {
                math: 75,
                chinese: 95,
                english: 80,
                programming: 80
            };
        });

        it('should have name, student id, class, ethnicity and grade', () => {
            const student = new Student('张三', 23, '汉族', 1, grade);
            expect(student.name).toEqual("张三");
            expect(student.id).toEqual(23);
            expect(student.klass).toEqual(1);
            expect(student.ethnicity).toEqual('汉族');
            expect(student.grade).toEqual({math: 75, chinese: 95, english: 80, programming: 80});
        });

        it('should have name, student id and grade', () => {
            const student = new Student('张三', 23, null, null, grade);
            expect(student.name).toEqual("张三");
            expect(student.id).toEqual(23);
            expect(student.klass).toEqual(null);
            expect(student.ethnicity).toEqual(null);
            expect(student.grade).toEqual({math: 75, chinese: 95, english: 80, programming: 80});
        });

        it('#getTotalGrade', () => {
            const student = new Student('张三', 23, null, null, grade);
            const totalGrade = student.getTotalGrade();
            expect(totalGrade).toEqual(330);
        });

        it('#getAverageGrade', () => {
            const student = new Student('张三', 23, null, null, grade);
            const averageGrade = student.getAverageGrade();
            expect(averageGrade).toEqual(82.5);
        });
    });

    describe('Add new student', () => {
        let input_1, input_2, input_3, input_4, input_5;

        beforeEach(() => {
            input_1 = 'tom, 23, han, 3, chinese: 34, english: 45, programming: 60, math: 99';
            input_2 = 'tom, 34, miao, 3, chinese: 23, programming: 100';
            input_3 = '1232, fjklsd, 434, dfdsf, sdfajklj: dsfsdfasdfa, sfjdsklsd';
            input_4 = 'tom, 34, chinese: 34, english: 45, programming: 60';
            input_5 = 'mark, 55, han, 5, chinese: 90, math: 100';
        });

        it('#split for input', () => {
            expect(split(input_1, 1)).toEqual(['tom', 23, 'han', 3, {chinese: 34, english: 45, programming: 60, math: 99}]);
            expect(split(input_2, 1)).toEqual(['tom', 34, 'miao', 3, {chinese: 23, programming: 100}]);
            expect(split(input_3, 1)).toEqual(['1232', NaN, '434', NaN, {sdfajklj: NaN, sfjdsklsd: undefined}]);
            expect(split(input_4, 2)).toEqual(['tom', 34, null, null, {chinese: 34, english: 45, programming: 60}]);
            expect(split(input_5, 2)).toEqual(['mark', 55, null, null, {han: undefined, '5': undefined, chinese: 90, math: 100}]);
        }); 

        it('#isCorrectInput', () => {
            let studentInfo_1 = split(input_1, 1);
            let studentInfo_2 = split(input_2, 1);
            let studentInfo_3 = split(input_3, 1);
            let studentInfo_4 = split(input_4, 2);
            let studentInfo_5 = split(input_5, 2);
            expect(isCorrectInput(studentInfo_1)).toEqual(true);
            expect(isCorrectInput(studentInfo_2)).toEqual(true);
            expect(isCorrectInput(studentInfo_3)).toEqual(false);
            expect(isCorrectInput(studentInfo_4)).toEqual(true);
            expect(isCorrectInput(studentInfo_5)).toEqual(false);
        });

        it('#completeGrades', () => {
            let grade = {chinese: 40, programming: 100};
            expect(completeGrades(grade)).toEqual({chinese: 40, programming: 100, english: 0, math: 0});
        });

        it('#isSidRepeat', () => {
            let [grade1, grade2] = [{math: 75, chinese: 95, english: 80, programming: 80}, {math: 85, chinese: 80, english: 70, programming: 90}];
            const student1 = new Student('张三', 23, '汉族', 1, grade1);
            const student2 = new Student('李四', 55, '苗族', 1, grade2); 
            expect(isSidRepeat(23, [student1, student2])).toEqual(true); 
        });

    });
    
    describe('Generate transcript', () => {
        it('#isCorrectForamat', () => {
            let input_1 = '23, 56, 34, 45';
            let input_2 = 'dfhjk, djklsdf34, 34';
            expect(isCorrectFormat(input_1)).toEqual(true);
            expect(isCorrectFormat(input_2)).toEqual(false);
        });

        it('Print transcript', () =>{
            let [grade1, grade2, grade3] = [{math: 75, chinese: 95, english: 80, programming: 80}, 
                                            {math: 85, chinese: 80, english: 70, programming: 90},
                                            {math: 100, chinese: 90, english: 60, programming: 88}];
            const student1 = new Student('张三', 23, '汉族', 1, grade1);
            const student2 = new Student('李四', 55, null, null, grade2); 
            const student3 = new Student('小花', 45, '苗族', 1, grade3);
            sinon.spy(console, 'log');
            generateTranscript('23, 23, 100, 55', [student1, student2, student3]);
            expect(console.log.args.join()).toBe(`成绩单
姓名|数学|语文|英语|编程|平均分|总分
========================
张三|75|95|80|80|82.5|330
李四|85|80|70|90|81.25|325
========================
全班总分平均数：327.5
全班总分中位数：327.5`);
        });
    });
});



