import mongoose from "mongoose";
import userModel from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();
const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug", true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users")
  .catch((error) => console.log(error));

function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = userModel.find();
  } else if (name && job === undefined) {
    promise = findUserByName(name);
  } else if (job && name === undefined) {
    promise = findUserByJob(job);
  } else {
    promise = findUsersByNameAndJob(name, job);
  }
  return promise;
}

function findUserById(id) {
  return userModel.findById(id);
}

function findUserByIndex(id) {
  return userModel.findById(id);
}

function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}

function findUsersByNameAndJob(name, job) {
  return userModel.find({ name: name, job: job });
}

function deleteUser(id) {
  return userModel.findByIdAndDelete(id);
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByIndex,
  findUserByName,
  findUserByJob,
  findUsersByNameAndJob,
  deleteUser,
};
