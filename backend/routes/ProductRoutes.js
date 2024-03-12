const express = require("express");
const Router = express.Router();
const { IsAuthentication, authorizedRole } = require("../middleware/IsAuthenticateUser");
const { CreateProduct, UpdateProduct, RatingProduct, DeleteProduct,GetAllProducts } = require("../controllers/ProductController");

Router.post("/create/product", IsAuthentication, authorizedRole, CreateProduct);

Router.put("/update/product/:id", IsAuthentication, authorizedRole, UpdateProduct);

Router.post("/rate/product", IsAuthentication, RatingProduct);

Router.delete("/delete/product/:id", IsAuthentication, authorizedRole, DeleteProduct);
Router.get("/search", GetAllProducts);

module.exports = Router;
