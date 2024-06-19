import express from "express";
import { getAdoptionRequests, getUsersAdoptionRequests, updateRequestStatus } from "../controllers/adoption.js";
import { verifyToken, isAdmin, isMyAccount } from "../middleware/middleware.js";

const router = express.Router();

router.get("/", verifyToken, isAdmin, getAdoptionRequests);
router.get("/:id", verifyToken, isMyAccount, getUsersAdoptionRequests);
router.get("/:id/admin", verifyToken, isAdmin, getUsersAdoptionRequests);

router.put("/:requestId", verifyToken, isAdmin, updateRequestStatus);

export default router;

