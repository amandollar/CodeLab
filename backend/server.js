import yargs from "yargs";
import express from "express";
import dotenv from "dotenv";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { hideBin } from "yargs/helpers";
import initRepo from "./controllers/initController.js";
import addRepo from "./controllers/addController.js";
import commitRepo from "./controllers/commitController.js";
import pullRepo from "./controllers/pullController.js";
import pushRepo from "./controllers/pushController.js";
import revertRepo from "./controllers/revertController.js";
import startDb from "./config/db.js";
import mongoose from "mongoose";
import mainRouter from "./routes/mainRoute.js";

dotenv.config();

yargs(hideBin(process.argv))
  .command("start", "Starts a new server", startServer)

  //Intialise the Repo
  .command("init", "Initialize a new repository", {}, initRepo)

  //Add file to the repo
  .command(
    "add <file>",
    "Add a file to the repository",
    (yargs) => {
      return yargs.positional("file", {
        describe: "File to add to the staging area",
        type: "string",
      });
    },
    (argv) => {
      addRepo(argv.file);
    }
  )

  //Commit to the repo with message

  .command(
    "commit <message>",
    "Commmit the staged files",
    (yargs) => {
      yargs.positional("message", {
        describe: "Commit message",
        type: "string",
      });
    },
    (argv) => {
      commitRepo(argv.message);
    }
  )

  //Push the Changes

  .command("push", "Push commits to remote", {}, pushRepo)

  //Pull Changes
  .command("pull", "Pull commits from the remote", {}, pullRepo)

  //Revert Back
  .command(
    "revert <commitId>",
    "Rever to a specific commit",
    (yargs) => {
      yargs.positional("commitId", {
        describe: "Commit Id to revert to",
        type: "string",
      });
    },
    (argv) => {
      revertRepo(argv.commitId);
    }
  )

  .demandCommand(1, "Please provide at least one command")
  .help().argv;

function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3243;

  app.use(express.json());
  app.use(
    cors({
      origin: "*", // Allow all origins
    })
  );

  app.use("/", mainRouter);

  startDb();

  const httpServer = http.createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  let user = "test";
  io.on("connection", (socket) => {
    socket.on("joinRoom", (userId) => {
      user = userId;
      console.log("====");
      console.log(user);
      console.log("====");
      socket.join(userId);
    });
  });

  const db = mongoose.connection;

  db.once("open", async () => {
    console.log("CRUD operations called");
  });

  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
