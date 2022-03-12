import jwt from 'jsonwebtoken';
import {Request,Response,NextFunction} from 'express';
import AdminUser from '../models/adminUser.model';


const auth = async function (req:Request,res:Response,next:NextFunction) 
{
    console.log("executing!!!")
    const token = req.headers.authorization?.split(' ')[1];
    //console.log(token);
    if(token)
    {
    jwt.verify(token,process.env?.JWT_SECRET!,async (error,decoded) =>
    {
        if(error)
        {
            res.status(400).send({
                error:'Invalid Token!'
            })
        }
        else
        {
        try{
         res.locals.jwt = decoded;
         console.log(res.locals.jwt.userId);

         //const userDoc = await AdminUser.findById({_id:res.locals.jwt.userId, 'tokens.token':token});
         const userDoc = await AdminUser.findOne({_id:res.locals.jwt.userId});
         if(!userDoc)
         {
             throw new Error();
         }
         res.locals.user = userDoc;
         res.locals.token = token;
         next();
        }
         catch(e)
         {
             res.status(401).send({
                 error:'Please Authenticate!'
             });
         }
        }
       
        // const user =  User.findById({_id:decoded?._id})

    })
    }
};

export default auth;

