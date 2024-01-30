let age = 16;
if(age >= 18){
console.log("Adult");
}
else if(age >= 13){
    console.log("Teen");
}
else{
    console.log("Minor");
}

let status;

switch(true){
    case age>= 18:
        status = "Adult";
        break;
    case age >= 13:
        status = 'Teenager';
        break;
    default:
        status = 'Minor';
        break;
}
console.log(status);
