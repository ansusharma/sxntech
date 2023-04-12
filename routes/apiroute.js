import express from "express";

const router = express.Router();

// Import the user controllers
import { signUp } from "../controllers/signup.js";
import {createProduct} from "../controllers/productController.js";

// User signup end points
router.post("/signup", signUp);

//user login

router.post("/product", createProduct);

export default router;
