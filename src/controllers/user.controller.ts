import {Request,Response} from 'express';
import User from '../models/user.model';
import {generateOtp} from '../utils/otp';
import bcrypt from 'bcryptjs';
import {generateCampaignLink, sendEmailToUser} from '../services/user.service';

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

// generate link
export const generateLink = async (req:Request,res:Response):Promise<void> =>
{
    try
    {
        const {campaign_id,freelancer_id} = req.body;
        const generatedLink = await generateCampaignLink(campaign_id,freelancer_id);
        res.send(generatedLink);
    }
    catch(e:any)
    {
        res.status(400).send({
            errorMessage:e.message
        })
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