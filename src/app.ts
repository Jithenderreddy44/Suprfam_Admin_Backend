import express from 'express';
import path from 'path';
import cors from 'cors';
import './db/mongoose';
import campaignRouter  from './routers/campaign.router';
import freelancerRouter from './routers/freelancer.router';
import userRouter from './routers/user.router';
import adminUserRouter from './routers/adminUser.router';
import influencerRouter from './routers/influencer.router';
import fileUploadRouter from './routers/fileUpload.router';

// paths
const viewsPath = path.join(__dirname,'./templates');
console.log(viewsPath);

const app = express();

// middleware registration
app.use(express.json());
app.use(cors());
app.use(adminUserRouter);
app.use(campaignRouter);
app.use(freelancerRouter);
app.use(userRouter);
app.use(influencerRouter);
app.use(fileUploadRouter);

// handlebars
app.set('view engine','ejs');
app.set('views',viewsPath);

export default app;
