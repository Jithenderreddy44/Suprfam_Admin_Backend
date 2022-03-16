import {Request,Response} from 'express';
import Campaign from '../models/campaign.model';

//create campaign
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

export const getAllCampaigns = async (req:Request,res:Response) =>
{
    try{
    //query parameters
    const limit = !!req.query.limit ?  Number (req.query.limit) : 50000;
    const skip = !!req.query.skip ? Number(req.query.skip) : 0;
    const campName = req.query.name;

    // const dateFilter = (req.query.start_date && req.query.end_date) ?
    // [{ $match:{start_date:{$gte:new Date(String(req.query.start_date))},end_date:{$lte:new Date(String(req.query.end_date))}} }]
    // : 
    // [{$match:{}}];
    
    //filters
    const nameFilter = !!campName ? [{
        $match: {
            name:{$regex:`${campName}`,$options:'i'},
            isDeleted:false
        }
    }]:[{$match:{
        isDeleted:false
    }}];

    const pagination = [
        {$skip:skip},
        {$limit:limit}
    ];

    const campaigns = await Campaign.aggregate([...nameFilter,...pagination]);
    const campaignsCount = await Campaign.aggregate([{$match:{isDeleted:false}},{$count:'count'}]);
    res.status(200).send({
        campaigns,
        campaignsCount:campaignsCount[0].count
    });
    }
    catch(e)
    {
        res.status(500).send(e);
    }
};

//updating campaign
export const updateCampaign = async (req:Request,res:Response) =>
{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name','campaign_types','campaign_deliverables','campaign_description','cover_image','start_date','end_date','influencer_details','min_influencers','order_delivery_screenshot','order_delivery_description','review_rating_screenshot','review_rating_description','sample_order_screenshot','sample_order_description','target_location','terms_and_conditions','sample_kyc_details','sample_signup_details','sample_purchase_order_details','sample_review_rating_details','sample_account_opening_details','sample_static_carousal_post_details','sample_static_post_details','sample_reel_post_details','sample_video_post_details','sample_story_details','sample_static_carousal_post_insights','sample_static_post_insights','sample_reel_post_insights','sample_video_post_insights','sample_story_insights'];
    const isValidOperation = updates.every(element => allowedUpdates.includes(element));
    if(!isValidOperation)
    {
        return res.status(400).send({
            error:"Invalid Updates!"
        })
    };

    try{
       const campaign = await Campaign.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
       if(!campaign)
       {
          return res.status(404).send({
               error:"campaign not found"
           })
       }
       res.status(200).send(campaign);
    }
    catch(e:any)
    {
        res.status(400).send({
            error:e.message
        })
    }
   
};

// soft delete campaign endpoint
export const deleteCampaign = async (req:Request,res:Response) =>
{
    try{
        const updatedCampaign = await Campaign.findByIdAndUpdate(req.params.id,{isDeleted:true},{new:true,runValidators:true});
        res.status(200).send("campaign successfully deleted!");
    }
    catch(e:any)
    {
        res.status(400).send({
            errorMessage:e.message
        })
    }
   
};

// // generate link
// export const generateLink = async (req:Request,res:Response):Promise<void> =>
// {
//     try
//     {
//         const {campaign_id,freelancer_id} = req.body;
//         const generatedLink = await generateCampaignLink(campaign_id,freelancer_id);
//         res.send(generatedLink);
//     }
//     catch(e:any)
//     {
//         res.status(400).send({
//             errorMessage:e.message
//         })
//     }
// };