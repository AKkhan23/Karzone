// const authRouts =express.import

const { Admin } = require("mongodb");
const { register, login, privateController } = require("../controler/userControler");
const express = require("express");

const authRouts = express.Router();

authRouts.post("/register",register)
authRouts.post("/login",login)
// authRouts.get("/users", getAllusers);
authRouts.get("/private", privateController)
 

module.exports =authRouts;

