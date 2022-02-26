import {Request,Response} from 'express';
import User from '../models/user.model';

export const createUser = async (req:Request,res:Response) =>
{
    try {
        const {email,otp} = req.body;
        const user = new User({
            email,
            otp
        });

        const token =  await user.generateAuthToken();
        
        res.status(200).send({
            user,
            token
        })
    }
    catch(e)
    {
        res.status(400).send({"error":e});
    }
};

export const getUser = async (req:Request,res:Response) =>
{
    const user = res.locals.user;
    res.status(200).send(user);
};