import mongoose from 'mongoose';

mongoose.connect(`mongodb://127.0.0.1:27017/SuprFam`)
.then(() =>
{
    console.log('database is connected!');
})
.catch((e) =>
{
    console.log('database error!');
})

// const db = mongoose.connection;

// db
// .once('open',() =>
// {
//     console.log('database is connected!');
// });

// function jithu(num:string):undefined
// {
//     return;
// }
// console.log(jithu('5'))

// let combine:(a:number) => number;
// combine=(num:number) =>{return num};
// combine(5);

// function something (a:string,cb:(d:number) => void)
// {
//     console.log(a);
//     cb(5);
// };

// something('1',(abc) =>{console.log(abc);});

// function throwError(errorMsg: string) : never { 
//     throw new Error(errorMsg); 
// } 

// console.log(throwError('error'));





