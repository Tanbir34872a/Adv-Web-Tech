//built-in types
//Any
let data: any;
data = 'Something';
console.log(data);
data = true;
console.log(data);

//Enum
enum Color {Red, Green, Blue};
let color: Color = Color.Blue;
console.log(color);

//Tuple
let employee: [number, string];
employee = [1, 'Steve'];
console.log(employee);