import {Request,Response} from 'express';
import Community from '../models/community.model';
import User from '../models/user.model';
import {generateCommunityLink} from '../services/community.service';

// create community endpoint
export const createCommunity = async (req:Request,res:Response) =>
{
    try
    {
        const community = new Community(req.body);
        const savedCommunity = await community.save();
        const updatedUser = await User.findByIdAndUpdate(req.body.admin,{type:'freelancer'},{new:true,runValidators:true});
        res.status(201).send(savedCommunity);
    } 
    catch(e:any)
    {
        res.status(400).send({
            error:e.message
        })
    }
};

// get all communities endpoint
export const getAllCommunities = async (req:Request,res:Response) =>
{
    try
    {
    const limit = !!req.query.limit ? Number(req.query.limit) : 50000;
    const skip = !!req.query.skip ? Number(req.query.skip) : 0;

    // pagnation
    const pagination = [
        {$skip:skip},
        {$limit:limit}
    ];

    const communities = await Community.aggregate([... pagination]);
    res.status(200).send(communities);
    }
    catch(e:any)
    {
        res.status(500).send({
            error:e.message
        });
    }
};

// generate community-link
export const communityLinkGeneration = async (req:Request,res:Response) =>
{
    try
    {
        const link = await generateCommunityLink(req.body.community_id);       
        res.status(201).send(link);  
    }
    catch(e:any)
    {
        res.status(400).send({
            error:e.message
        });
    }
};


