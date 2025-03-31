import express, { Router } from "express";
import {createRepository,getAllRepository,fetchRepoById,fetchRepoForCurrentUser,updateRepoById,deleteRepoById,toggleVisibiltyRepo}
from "../controllers/repoController.js";

const repoRouter = express.Router();


repoRouter.post('/createRepo',createRepository);
repoRouter.get('/all',getAllRepository);
repoRouter.get('/:id',fetchRepoById)
repoRouter.get('/user/:userId',fetchRepoForCurrentUser);
repoRouter.put('/update/:id',updateRepoById);
repoRouter.delete('/delete/:id',deleteRepoById);
repoRouter.patch('/toggle/:id',toggleVisibiltyRepo);

export default repoRouter;