import express from 'express';
import {createUser,getUser} from '../controllers/user.controller';
import auth from '../middlewares/auth';

const router = express.Router();

// campaign creation route
router.post('/users',createUser);

// // get all campaigns

router.get('/users/me',auth,getUser)

// router.get('/campaigns',getAllCampaigns);


export default router;
