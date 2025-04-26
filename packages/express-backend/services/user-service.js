import mongoose from "mongoose";
import userModel from "../models/user.js";

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
