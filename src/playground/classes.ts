class Department{
    private readonly name:string;
    private employees:string []=[]
    constructor(dept:string)
    {
        this.name = dept;
    }

    addEmployee(emp:string)
    {
        this.employees.push(emp);
    }

    //methods
    describe()
    {
        console.log('employees '+this.name)
    }
}
const inst = new Department('cse');
inst.addEmployee('jithu');
inst.addEmployee('rohith');
inst.describe()
