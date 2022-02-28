import {Request,Response} from 'express';
import Campaign from '../models/campaign.model';

export const createCampaign = (req:Request,res:Response) =>
{
    const campaign = new Campaign(req.body);

    campaign.save()
    .then((data) =>
    {
        res.status(201).send(campaign);
    })
    .catch((e) =>
    {
        res.status(400).send(e);
    })
};

export const getAllCampaigns = (req:Request,res:Response) =>
{
    Campaign.find({})
    .then((campaigns) =>
    {
        res.status(200).send(campaigns);
    })
    .catch((e) =>
    {
        res.status(500).send();
    })
};
