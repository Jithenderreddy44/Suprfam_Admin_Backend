import {Request,Response} from 'express';
import Freelancer from '../models/freelancer.model';

//create freelancer
export const createFreelancer = (req:Request,res:Response) =>
{
    const freelancer = new Freelancer(req.body);
        
    freelancer.save()
    .then(() =>
    {
        res.status(201).send(freelancer);
    })
    .catch((e) =>
    {
        res.status(400).send(e);
    })
};

//get all freelancers
export const getAllFreelancers = async (req:Request,res:Response) =>
{
    try{
    const limit = !!req.query.limit ? Number(req.query.limit) : 50000;
    const skip = !!req.query.skip ? Number(req.query.skip) : 0;
    const freelancerName = req.query.name;

    //filters
    const nameFilter = !!freelancerName ? [{
        $match:{fullName:{$regex:`${freelancerName}`,$options:"i"}}
    }]:[{  $match:{} }];

    const pagination = [
        {$skip:skip},
        {$limit:limit}
    ];
    const data = await Freelancer.aggregate([...nameFilter,...pagination]);
    res.status(200).send(data);
    }
    catch(e)
    {
        res.status(500).send(e);
    }
};

