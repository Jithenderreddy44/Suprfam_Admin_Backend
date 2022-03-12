import express from 'express';
import { createUser,verifyUser,userUpdate,generateLink,randomController} from '../controllers/user.controller';

const router = express.Router();

// user creation route
router.post('/users',createUser);

// verify user route

router.post('/users/verify',verifyUser)

// update user
router.patch('/users/:id',userUpdate);

// generate link for superlancer
router.post('/users/generate-link',generateLink);

router.get('/users/template',randomController);


export default router;
