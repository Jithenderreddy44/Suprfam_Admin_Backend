import {Request,Response} from 'express';
import User from '../models/user.model';
import AppliedCampaign from '../models/appledCampaign.model';
import {generateOtp} from '../utils/otp';
import bcrypt from 'bcryptjs';
import {sendEmailToUser} from '../services/user.service';
import {generateCampaignLink} from '../services/campaign.service';
import mongoose from 'mongoose';
import Campaign from '../models/campaign.model';
import freelancerModel from '../models/freelancer.model';
import AppliedCampaigns from '../models/appledCampaign.model';

// user creation route
export const createUser = async (req:Request,res:Response) =>
{
    try
    {
    const {email} = req.body;
    const otp = String(generateOtp());
    const saltRounds = 10;
    const hashedOtp = await bcrypt.hash(String(otp),saltRounds);
    const existUser = await User.findOneAndUpdate({email},{otp:hashedOtp},{new:true});
    if(!existUser)
    {
        await new User({ email,otp:hashedOtp}).save();
    };
    // const html = `<div>
    // <h4>Welcome to the suprfam ${email}.</h4>
    // <h4>This is your otp : <b>${otp}</b></h4>
    // </div>`;
    sendEmailToUser({email,otp});
    //sendEmail({email,subject:'Thanks for joining in!',html});
    res.send();
    }
    catch(e:any)
    {
        res.status(500).send({
            errorMessage:e.message
        })
    }   
};

// user verification route
export const verifyUser = async (req:Request,res:Response) =>
{
    try
    {
        const {email,otp} = req.body;
        const existUser = await User.findOne({email});
        const isValid = existUser ? await bcrypt.compare(otp,existUser?.otp) : false;
        if(!existUser)
        {
            throw new Error('email is invalid!')
        }
        else if(!isValid)
        {
            throw new Error('otp is incorrect!')
        }
        res.status(200).send('you have been successfully verified!')
    }
    catch(e:any)
    {
       res.status(400).send({
          errorMessage:e.message
       })
    }
};

//user update route
export const userUpdate = async (req:Request,res:Response) =>
{
    const updates= Object.keys(req.body);
    const allowedUpdates = ['type','email','fullName','whatsapp_number','city','bank_account_details','upi_id'];
    const isValid = updates.every(element => allowedUpdates.includes(element));
    if(!isValid)
    {
        return res.status(400).send({
            errorMessage:"Invalid Updates"
        })
    }
    try
    {
        const existingUser = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        res.status(200).send(existingUser);
    }
    catch(e:any)
    {
        res.status(400).send({
            errorMessage:"Invalid Objectid!"
        })
    }
};

export const applyForCampaigns = async (req:Request,res:Response) =>
{
    try
    {
        const {campaign_id,freelancer_id} = req.body;
        if(!campaign_id)
        {
            throw new Error("please provide campaign_id!");
        }
        else if(!freelancer_id)
        {
            throw new Error("please provide freelancer_id!");
        };

        const freelancerExists = await AppliedCampaign.findOne({freelancer_id:freelancer_id});
        if(freelancerExists)
        {
           await AppliedCampaign.updateOne({freelancer_id:freelancer_id},{$push:{campaign_ids:campaign_id}})
        }
        else
        {
            await new AppliedCampaign({
                campaign_ids:[campaign_id],
                freelancer_id
            }).save();
        }
        
        const generatedLink = await generateCampaignLink(campaign_id,freelancer_id);
        res.status(201).send(generatedLink);
    }
    catch(e:any)
    {
        res.status(400).send({
            errorMessage:e.message
        })
    }
};

// getting all applied campaigns for specific freelancer
export const getFreelancerCampaigns = async (req:Request,res:Response) =>
{
    try
    {
    const campaigns = await AppliedCampaign.aggregate([
        {
            $match:{
                freelancer_id:new mongoose.Types.ObjectId(req.params.id)
            }
        }
    ]);

    const campaign = await Campaign.find({_id:{$in:campaigns[0].campaign_ids}})
    res.status(200).send(campaign);
    }
    catch(e:any)
    {
        res.status(400).send(e.message);
    }
    
};

// getting all the freelancers with applied campaigns

export const getFreelancersWithAppliedCampaigns = async (req:Request,res:Response) =>
{
    try
    {
   const freelancersWithCampaigns = await AppliedCampaign.aggregate([
       {$match:{}},
       {
        $lookup:{
            from:"users",
            localField:"freelancer_id",
            foreignField:"_id",
            as:"freelancer"
        }
    },
       {
           $lookup:{
               from:"campaigns",
               localField:"campaign_ids",
               foreignField:"_id",
               as:"campaigns"
           }
       },
       {
        $project:{
            _id:0,
            freelancer:{
                $map:{
                    "input":"$freelancer",
                    as:"fre",
                    in:{
                        "name":"$$fre.fullName"
                    }
                }
            },
           campaigns:{
               $map:{
                   "input":"$campaigns",
                   as:"camp",
                   in:{
                    "name":"$$camp.name"       
                   }
               }
           }
        }
       }
      
    ]);
    res.status(200).send(freelancersWithCampaigns);
     }
    catch(e:any)
    {
        res.status(500).send(e.message);
    }
};

// export const randomController = async (req:Request,res:Response) =>
// {
//     res.render('otp_verification',{otp:'123456'});
// };










// export const createUser = async (req:Request,res:Response) =>
// {
//     try {
//         const {email,otp} = req.body;
//         const user = new User({
//             email,
//             otp
//         });

//         const token =  await user.generateAuthToken();
        
//         res.status(200).send({
//             user,
//             token
//         })
//     }
//     catch(e)
//     {
//         res.status(400).send({"error":e});
//     }
// };

// export const getUser = async (req:Request,res:Response) =>
// {
//     const user = res.locals.user;
//     res.status(200).send(user);
// };