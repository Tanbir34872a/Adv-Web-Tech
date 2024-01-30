let numbers = [1,2,3,4,5];
let fruits = ['apple','banana','orange'];
let mixedArray = [1, 'two', {name: 'Alice'}, [7,8,9]];

let firstNumber = numbers[0];
let secondFruit = fruits[1];
let thirdElement = mixedArray[2];

numbers.push(6);
fruits.pop();
fruits.unshift('pear')
numbers.shift();

numbers.forEach(function(number){
    console.log(number);
});

let doubleNumbers = numbers.map(function(number){
    return number*2;
});
console.log(doubleNumbers);

const evenNumbers = doubleNumbers.filter(function(num){
    return num % 4 === 0;
});
console.log(evenNumbers);