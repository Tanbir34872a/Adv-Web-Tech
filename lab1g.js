let x = ['a','b','c','d','e','f'];
for(let i = 0; i < 5; i++){
    console.log(x[i]);
}

let i = 0;
while(i<4){
    console.log(x[i]);
    i++;
}

let j = 0
do{
    console.log(x[j]);
    j++;
} while (j < 2);

for(let i in x){
    console.log(i);
}

for(let i of x){
    console.log(i);
}