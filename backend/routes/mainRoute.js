import express from "express";
import userRouter from "./userRoute.js";
import repoRouter from "./repoRouter.js";
import issueRouter from "./issueRoute.js";

const mainRouter = express.Router();




mainRouter.get('/', (req, res) => {
    res.send('Root is groot');
})


mainRouter.use('/issue',issueRouter);
mainRouter.use('/user',userRouter);
mainRouter.use('/repo',repoRouter);



export default mainRouter;