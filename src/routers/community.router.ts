import express from 'express';
import {createCommunity,getAllCommunities,communityLinkGeneration} from '../controllers/community.controller';
const router = express.Router();

// create community endpoint
router.post('/communities',createCommunity);

// getting all the communities
router.get('/communities',getAllCommunities);

//community invite link generation
router.post('/communities/invite-link',communityLinkGeneration);
export default router;