import express from 'express';
import {createFreelancer,getAllFreelancers} from '../controllers/freelancer.controller';

const router = express.Router();

//create freelancer
router.post('/freelancers',createFreelancer);

//reading all freelancers
router.get('/freelancers',getAllFreelancers)

export default router;