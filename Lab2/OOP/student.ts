export class student{
    public id: number;
    public name: string;
    public courses: number[];
    display(): void{
        console.log(`Student ID: ${this.id}, Name: ${this.name}`);
    }
    constructor(id: number, name: string, ...courses: number[]){
        this.id = id;
        this.name = name;
        this.courses = courses;
    }
}