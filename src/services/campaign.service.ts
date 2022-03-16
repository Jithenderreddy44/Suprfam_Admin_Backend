import {createShortLink} from './common.service';

export const generateCampaignLink = async (campaign_id:string,freelancer_id:string) =>
{
    // try
    // {
    if(!campaign_id)
    {
        throw new Error("Campaign Id is required!");
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