import { courses } from "./course";
import { student } from "./student";
// import { teacher } from "./teacher";
// import { course } from "./course";

let course1 = new courses(987, 'English', 285);
let course2 = new courses(984, 'Math', 264);
let course3 = new courses(658, 'Bangla', 275);

let student1 = new student(123, 'James', 987, 984, 658);

function showStudentDetails(s: student){
    console.log(`Student ID: ${s.id}`);
    console.log(`Student Name: ${s.name}`);
    console.
    console.log(`Student ID: ${s.id}`);
    
}