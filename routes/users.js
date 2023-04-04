import express from "express";

const router = express.Router();

// Import the user controllers
import { signUp } from "../controllers/signup.js";



// User signup end points
router.post("/signup", signUp);

export default router;
