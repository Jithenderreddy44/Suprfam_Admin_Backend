import express from 'express';
import {createInfluencer,getAllInfluencers} from '../controllers/influencer.controller';
const router = express.Router();

//create influencer route
router.post('/influencers',createInfluencer);

//get all influencers
router.get('/influencers',getAllInfluencers);

export default router;
