import express from 'express';
import { createUser,verifyUser,userUpdate,applyForCampaigns,getFreelancerCampaigns, getFreelancersWithAppliedCampaigns} from '../controllers/user.controller';

const router = express.Router();

// user creation route
router.post('/users',createUser);

// verify user route

router.post('/users/verify',verifyUser);

// update user
router.patch('/users/:id',userUpdate);

// apply campaign
router.post('/users/apply-campaign',applyForCampaigns);

// get all freelancers with all applied campaigns
router.get('/freelancers/applied-campaigns',getFreelancersWithAppliedCampaigns);

// get all campaigns for specif freelancer
router.get('/freelancers/:id',getFreelancerCampaigns);




// router.get('/users/template',randomController);


export default router;
