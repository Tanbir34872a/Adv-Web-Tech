"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.student = void 0;
var student = /** @class */ (function () {
    function student(id, name) {
        var courses = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            courses[_i - 2] = arguments[_i];
        }
        this.id = id;
        this.name = name;
        this.courses = courses;
    }
    student.prototype.display = function () {
        console.log("Student ID: ".concat(this.id, ", Name: ").concat(this.name));
    };
    return student;
}());
exports.student = student;
