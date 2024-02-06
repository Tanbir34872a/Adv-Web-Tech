var addNumbers = function (a, b) { return a + b; };
console.log(addNumbers(10, 20));
function mulNumbers(a, b, c) {
    return a * b * (c !== null && c !== void 0 ? c : 1);
}
console.log(mulNumbers(10, 20));
console.log(mulNumbers(10, 20, 0.5));
function subNumbers(a, b) {
    if (b === void 0) { b = 0; }
    return a - b;
}
console.log(subNumbers(50));
console.log(subNumbers(50, 20));
function addMultipleNumber() {
    var nums = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        nums[_i] = arguments[_i];
    }
    var sum = 0;
    for (var _a = 0, nums_1 = nums; _a < nums_1.length; _a++) {
        var num = nums_1[_a];
        sum += num;
    }
    return sum;
}
console.log(addMultipleNumber(50, 20, 30, 10, 3, 7));
function overloadedFn(a, b) {
    return a + b;
}
console.log(overloadedFn(10, 20));
console.log(overloadedFn("Hello ", "World"));
