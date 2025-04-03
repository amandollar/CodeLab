import express, { Router } from "express";
import {createRepository,getAllRepository,fetchRepoById,fetchRepoForCurrentUser,updateRepoById,deleteRepoById,toggleVisibiltyRepo}
from "../controllers/repoController.js";
import verify from "../middleWares/authMiddleware.js";

const repoRouter = express.Router();


repoRouter.post('/createRepo',verify,createRepository);
repoRouter.get('/all',getAllRepository);
repoRouter.get('/:id',fetchRepoById)
repoRouter.get('/user/:userId',fetchRepoForCurrentUser);
repoRouter.put('/update/:id',verify,updateRepoById);
repoRouter.delete('/delete/:id',verify,deleteRepoById);
repoRouter.patch('/toggle/:id',verify,toggleVisibiltyRepo);

export default repoRouter;