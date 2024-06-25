import express from "express";
import { getAdoptionRequest, getAdoptionRequests, getUsersAdoptionRequests, updateRequestStatus } from "../controllers/requests.js";
import { verifyToken, isAdmin, isMyAccount } from "../middleware/middleware.js";

const router = express.Router();

router.get("/", verifyToken, isAdmin, getAdoptionRequests);
router.get("/:id", verifyToken, getUsersAdoptionRequests);
router.get("/:id/adoption", verifyToken, getAdoptionRequest);

router.put("/:requestId/adoption", verifyToken, isAdmin, updateRequestStatus);

export default router;

