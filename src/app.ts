import express from 'express';
const cors = require('cors');
import './db/mongoose';
import campaignRouter  from './routers/campaign.router';
import freelancerRouter from './routers/freelancer.router';
import userRouter from './routers/user.router';
import adminUserRouter from './routers/adminUser.router';

const app = express();

// middleware registration
app.use(express.json());
app.use(cors());
app.use(adminUserRouter);
app.use(campaignRouter);
app.use(freelancerRouter);
app.use(userRouter);

export default app;
