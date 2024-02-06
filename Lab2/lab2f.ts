let addNumbers = (a: number, b: number):number => a + b;
console.log(addNumbers(10, 20));

function mulNumbers(a: number, b: number, c?: number): number {
    return a * b * (c ?? 1);
}
console.log(mulNumbers(10, 20));
console.log(mulNumbers(10, 20, 0.5));

function subNumbers(a: number, b: number = 0): number {
    return a - b; 
}
console.log(subNumbers(50));
console.log(subNumbers(50, 20));

function addMultipleNumber(...nums: number[]): number {
    let sum: number = 0;
    for (let num of nums){
        sum += num;
    }
    return sum;
}
console.log(addMultipleNumber(50, 20, 30, 10, 3, 7));

function overloadedFn(a: number, b: number): number;
function overloadedFn(a: string, b: string): string;
function overloadedFn(a: any, b: any): any{
    return a + b;
}
console.log(overloadedFn(10,20));
console.log(overloadedFn("Hello ","World"));