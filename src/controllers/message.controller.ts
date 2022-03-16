import {Request,Response} from 'express';
import Message from '../models/message.model';

export const createMessage = async (req:Request,res:Response) =>
{
    try
    {
       const message = new Message(req.body);
       const savedMessage = await message.save();
       res.status(201).send(savedMessage);
    }
    catch(e:any)
    {
        res.status(400).send({
            error:e.message
        });
    }
    
};