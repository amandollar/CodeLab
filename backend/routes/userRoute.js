import express from "express";

import {
  getAllUsers,
  signUp,
  login,
  getUserProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/userController.js";

import verify from "../middleWares/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/signUp", signUp);
userRouter.post("/login", login);
userRouter.get("/getAll", getAllUsers);
userRouter.get("/getProfile/:id", verify, getUserProfile);
userRouter.put("/updateProfile/:id", verify, updateProfile);
userRouter.delete("/deleteProfile/:id", verify, deleteProfile);

export default userRouter;
