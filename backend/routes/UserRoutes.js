const express = require("express");
const { CreateUsers, GetAllUsers, Login,Logout, DeleteUser } = require("../controllers/UserController");


const Router = express.Router()

Router.route("/create" ).post(CreateUsers)
Router.route("/get" ).get(GetAllUsers)
Router.route("/login" ).post(Login)
Router.route("/delete/:id" ).put(DeleteUser)
Router.route("/logout" ).post(Logout)


module.exports = Router;