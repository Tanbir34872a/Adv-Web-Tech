//type annotation and decralration
//type alias
type Student = {id: number, name: string};
let s1: Student = {id: 21443941, name: 'Tanbir'};
console.log(s1);

// type union
let x: number | string;
x = 10;
console.log(x);
x = "Days"
console.log(x);

//Literal Type
let z: "Red"|"Green"|"Blue";
z = "Red";
console.log(z);