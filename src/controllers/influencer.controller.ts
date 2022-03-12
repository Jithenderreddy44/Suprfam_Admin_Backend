import {Request,Response} from 'express';
import Influencer from '../models/influencer.model';

//create influencer
export const createInfluencer = (req:Request,res:Response) =>
{
    const influencer = new Influencer(req.body);
    influencer.save()
    .then((data) =>
    {
        res.status(201).send(data)
    })
    .catch((e) =>
    {
        res.status(400).send(e);
    })
};

//get all influencers
export const getAllInfluencers = async (req:Request,res:Response) =>
{
    try
    {
        //query parameters
        const limit = !!req.query.limit ?  Number (req.query.limit) : 50000;
        const skip = !!req.query.skip ? Number(req.query.skip) : 0;
        const influencerName = req.query.name;
        //pagination
        const pagination = [
            {$skip:skip},
            {$limit:limit}
        ];
        //name filter
        const nameFilter = !!influencerName ? [{ $match:{ fullName:{ $regex:`${influencerName}` ,$options:"i"} } }]
        :[{ $match:{} }];

        const data = await Influencer.aggregate([...nameFilter, ...pagination]);
        res.status(200).send(data);
    }
    catch(e)
    {
        res.status(500).send(e);
    }

};

