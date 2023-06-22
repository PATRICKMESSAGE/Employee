export class Employee {
    id: number;
    name: string;
    email: string;
    phone: string;
    salary: number;
    performance: number; // add performance field
    leaveDays: number; // add leave days field

    constructor(){
        this.id = 0;
        this.name = '';
        this.email='';
        this.phone= '';
        this.salary = 0;
        this.performance = 0;
        this.leaveDays = 0;
        
    }
}
