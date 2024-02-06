//Array
let numbers: number[] = [1,2,3,4,5];
console.log(numbers);
numbers = [10,20,30,40]
let firstElement: number = numbers[0];
console.log(firstElement);

let arrayLen: number = numbers.length;

numbers.push(50);

for (let num of numbers){
    console.log(num);
}

let doubleNumbers: number[] = numbers.map((num: number) => num / 10);
let evenNumbers: number[] = doubleNumbers.filter((num: number) => num % 2 == 0)
let sum: number = numbers.reduce((prev: number, next: number) => prev+next);
console.log(doubleNumbers);
console.log(evenNumbers);
console.log(sum);