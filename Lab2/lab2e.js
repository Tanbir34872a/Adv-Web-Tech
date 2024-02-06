//Array
var numbers = [1, 2, 3, 4, 5];
console.log(numbers);
numbers = [10, 20, 30, 40];
var firstElement = numbers[0];
console.log(firstElement);
var arrayLen = numbers.length;
numbers.push(50);
for (var _i = 0, numbers_1 = numbers; _i < numbers_1.length; _i++) {
    var num = numbers_1[_i];
    console.log(num);
}
var doubleNumbers = numbers.map(function (num) { return num / 10; });
var evenNumbers = doubleNumbers.filter(function (num) { return num % 2 == 0; });
var sum = numbers.reduce(function (prev, next) { return prev + next; });
console.log(doubleNumbers);
console.log(evenNumbers);
console.log(sum);
