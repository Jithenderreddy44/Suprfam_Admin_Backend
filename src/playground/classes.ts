// class Department{
//     private readonly name:string;
//     private employees:string []=[]
//     constructor(dept:string)
//     {
//         this.name = dept;
//     }

//     addEmployee(emp:string)
//     {
//         this.employees.push(emp);
//     }

//     //methods
//     describe()
//     {
//         console.log('employees '+this.name)
//     }
// }
// const inst = new Department('cse');
// inst.addEmployee('jithu');
// inst.addEmployee('rohith');
// inst.describe();

class Person {
    private _age: number = 0;
    private _firstName: string = '';
    private _lastName: string = '';
    // constructor(age:number,firstName:string,lastName:string)
    // {
    //     this._age = age;
    //     this._firstName = firstName;
    //     this._lastName = lastName;
    // }
    public set age(theAge:number)
    {
        if(theAge<=0 && theAge>100)
        {
             throw new Error("age is invalid!")
        }
        this._age = theAge;
    }
    public get age()
    {
        return this._age;
    }
};

const person = new Person();
console.log(person);
person.age = 100;
console.log(person.age);

// console.log(person);
//const age = 180;
// if(age > 0 && age<=100)
// {
//     person.age = age;
// }
// else
// {
//     throw new Error('age is invalid')
// }
