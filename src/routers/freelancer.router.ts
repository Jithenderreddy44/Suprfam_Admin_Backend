import express from 'express';
import {createFreelancer} from '../controllers/freelancer.controller';

const router = express.Router();

//create freelancer
router.post('/freelancers',createFreelancer);

export default router;