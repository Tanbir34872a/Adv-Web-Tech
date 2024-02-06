//built-in types
//Any
var data;
data = 'Something';
console.log(data);
data = true;
console.log(data);
//Enum
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
var color = Color.Blue;
console.log(color);
//Tuple
var employee;
employee = [1, 'Steve'];
console.log(employee);
