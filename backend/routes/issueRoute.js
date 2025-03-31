import express from "express";
import {createIssue,updateIssueById,deleteIssueById,getIssueById,getAllIssue}
from "../controllers/issueController.js";


const issueRouter = express.Router();


issueRouter.post("/create", createIssue);
issueRouter.put("/update/:id", updateIssueById);
issueRouter.delete("/delete/:id", deleteIssueById);
issueRouter.get("/all", getAllIssue);
issueRouter.get("/:id", getIssueById);

export default issueRouter;