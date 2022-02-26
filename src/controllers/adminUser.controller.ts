import {Request,Response} from 'express';
import AdminUser from '../models/adminUser.model';
import bcrypt from 'bcryptjs';

//admin user creation
export const createAdminUser = async (req:Request,res:Response) =>
{
    const {name,email,password,superAdmin} = req.body;
    try{
        let adminUser = new AdminUser({
            name,
            email,
            password,
            superAdmin
        });
        // hashed password
        const hashedPassword = await bcrypt.hash(password,10);
        adminUser.password = hashedPassword;
        const token = await adminUser.generateAuthToken();
        res.status(201).send({
            user:adminUser,
            token
        })
    }
    catch(e)
    {
        res.status(400).send(e);
    }
};
//admin user login
export const adminUserLogin = async (req:Request,res:Response) =>
{
    try{
        const {email,password} = req.body;
        const adminUser = await AdminUser.findByCredentials(email,password);
        const token = await adminUser.generateAuthToken();

        res.status(200).send({
            user:adminUser,
            token
        })
    }
    catch(e)
    {
        res.status(400).send({
            error:"Unable to login!"
        });
    }
};

//admin user logout
export const adminUserLogout = async (req:Request,res:Response) =>
{
    try{
        res.locals.user.tokens = res.locals.user.tokens.filter((token:any) =>
        {
            return token.token !== res.locals.token
        });
        await res.locals.user.save();
        res.status(200).send()
    }
   catch(e)
   {
     res.status(500).send()
   }
};