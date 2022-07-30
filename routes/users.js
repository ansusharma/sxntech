import express from "express";

const router = express.Router();

// Import the user controllers
import { registerUser } from "../controllers/register.js";
import { loginUser } from "../controllers/login.js";
import { activatevid , stopvid, vid_front_person } from "../controllers/videostream.js";
import { authorizedRoutes ,tokenValidity} from "../auth/auth.js";

// User register end points
router.post("/register", registerUser);

// User login end points
router.post("/otp", loginUser);

// check the valididty of token
router.get("/token_validity", authorizedRoutes , tokenValidity);

// User fetch profile details end point
router.post("/activate_video", authorizedRoutes, activatevid);

router.post("/stop_video", authorizedRoutes, stopvid);

router.get("/find_front_user", authorizedRoutes, vid_front_person);

export default router;
