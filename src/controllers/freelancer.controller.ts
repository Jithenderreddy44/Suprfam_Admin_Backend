import express from 'express';
import Freelancer from '../models/freelancer.model';

export const createFreelancer = (req:express.Request,res:express.Response) =>
{
    const freelancer = new Freelancer(req.body);
    
    freelancer.save()
    .then((data) =>
    {
        res.status(200).send(freelancer);
    })
    .catch((e) =>
    {
        res.status(400).send(e);
    })
};