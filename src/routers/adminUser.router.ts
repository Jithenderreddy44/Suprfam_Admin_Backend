import express from 'express';
import {createAdminUser,adminUserLogin,adminUserLogout} from '../controllers/adminUser.controller';
import auth from '../middlewares/auth';
const router = express.Router();

//admin user creation
router.post('/admin-users',createAdminUser);

//admin user login
router.post('/admin-users/login',adminUserLogin);

//admin user logout
router.post('/admin-users/logout',auth,adminUserLogout);

export default router;