import express from "express";

const router = express.Router();

// Import the user controllers
import { signUp } from "../controllers/signup.js";
import {createProduct, deleteProduct, getAllProducts, updateProduct} from "../controllers/productController.js";
import { loginUser } from "../controllers/login.js";

// User signup end points
router.post("/signup", signUp);
//user login
router.get("/signin",loginUser);
// new product
router.post("/product/new", createProduct);
 //get products
 router.get("/products",getAllProducts);
 //update product
 router.put("/product/:id",updateProduct);
 //delete product
 router.delete("/product/:id",deleteProduct);
 
 

export default router;
