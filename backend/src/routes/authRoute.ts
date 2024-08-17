import express from "express"
import { authCheck, login, logout, signup } from "../controllers/authController";
import { protectRoute } from "../middlewares/protectRoute";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.post('/logout', logout);


router.get('/authCheck',protectRoute, authCheck);

export default router;