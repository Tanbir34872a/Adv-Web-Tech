export class courses{
    public id: number;
    public courseName: string;
    public teacher: number;
    display(): void{
        console.log(`Student ID: ${this.id}, Name: ${this.courseName}`);
    }
    constructor(id: number, courseName: string, teacher: number){
        this.id = id;
        this.courseName = courseName;
        this.teacher = teacher;
    }
}