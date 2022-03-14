import {createShortLink} from './common.service';
import path from 'path';
import ejs from 'ejs';
import { readFileSync } from 'fs';
import { sendEmail } from './email.service';

export const generateCampaignLink = async (campaign_id:string,freelancer_id:string) =>
{
    // try
    // {
    if(!campaign_id)
    {
        throw new Error("Campaign Id is required!")
    }
    else if(!freelancer_id)
    {
        throw new Error("Freelancer Id is required");                    
    };

    let url = `https://suprfam.com?campaign_id=${campaign_id}&freelancer_id=${freelancer_id}`;
    console.log(url);
    const shortLink = await createShortLink(url);
    
    return shortLink; 
    
};

interface UserDetails{
    email:string;
    otp:string;
}

export const sendEmailToUser = async (userDetails:UserDetails) =>
{
    let rootDir = __dirname.split('Backend')[0] + 'Backend/';
    let html = readFileSync(path.resolve(rootDir + 'src/templates/otp_verification.ejs'),{
     encoding: 'utf8',
     flag: 'r',
    });
    
   html = ejs.render(html,{
        otp:userDetails.otp
    });
    sendEmail({
        email:userDetails.email,
        subject:'Thanks for joining in ...',
        html:html
    })
};
