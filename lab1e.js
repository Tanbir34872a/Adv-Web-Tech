function operateOnNumbers(a ,b, operations){
    return operations(a,b);
}

function add(x,y){
    return x + y;
}

function sub(x,y){
    return x - y;
}

function mul(x,y){
    return x * y;
}

function div(x,y){
    return x / y;
}

let resAdd = operateOnNumbers(5,3,add);
let resMul = operateOnNumbers(5,3,mul);

console.log(resAdd);
console.log(resMul);