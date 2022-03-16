import express from 'express';
import {createCampaign,getAllCampaigns,updateCampaign,deleteCampaign} from '../controllers/campaign.controller';


const router = express.Router();


// campaign creation route
router.post('/campaigns',createCampaign);

// get all campaigns
router.get('/campaigns',getAllCampaigns);

// updating the campaigns
router.patch('/campaigns/:id',updateCampaign);

// deleting an individual campaign
router.delete('/campaigns/:id',deleteCampaign);

// // generate campaign link for superlancer
// router.post('/campaigns/generate-link',generateLink);

export default router;













// const campaignData = new Campaign({
//     name: 'new',
//     type: 'my campaign',
//     description: 'This is the description',
//     deliverables: 'deliverables',
//     count: 25,
//     targetLocation: 'hyderabad',
//     startDate:'01-01-2022',
//     endDate:'12-12-2022',
//     ratingImage:'random123',
//     ratingDescription:'This is the rating description!'

//   });

//   campaignData.save().then(() =>
//   {
//       console.log('data inserted!')
//   });