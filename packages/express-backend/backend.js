import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userService from "./services/user-service.js";

dotenv.config();
const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users") // connect to Db "users"
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  userService
    .getUsers(name, job)
    .then((result) => {
      res.send({ users_list: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error occurred in the server.");
    });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];
  userService
    .findUserById(id)
    .then((result) => {
      if (result === undefined || result === null)
        res.status(404).send("Resource not found.");
      else res.send(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error occurred in the server.");
    });
});

app.post("/users", (req, res) => {
  const user = req.body;
  userService
    .addUser(user)
    .then((newUser) => {
      res.status(201).send(newUser);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error occurred in the server.");
    });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  userService
    .deleteUser(id)
    .then((result) => {
      if (result === undefined || result === null)
        res.status(404).send("Resource not found.");
      else res.status(204).end();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("An error occurred in the server.");
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
