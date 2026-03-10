import express from "express";
import { setCustomClaims } from "../controllers/adminController";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";

const router = express.Router();

// Set custom claims - admin only
router.post(
  "/setCustomClaims",
  authenticate,
  isAuthorized({ hasRole: ["admin"] }),
  setCustomClaims
);

export default router;