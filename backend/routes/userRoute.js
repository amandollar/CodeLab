import express from "express";

import{
    getAllUsers,
    signUp,
    login,
    getUserProfile,
    updateProfile,
    deleteProfile
} from "../controllers/userController.js"



const userRouter = express.Router();

userRouter.post('/signUp',signUp);
userRouter.post('/login',login);
userRouter.get('/getAll',getAllUsers);
userRouter.get('/getProfile/:id',getUserProfile);
userRouter.put('/updateProfile/:id',updateProfile);
userRouter.delete('/deleteProfile/:id',deleteProfile);

export default userRouter;