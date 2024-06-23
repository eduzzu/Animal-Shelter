import express from "express";
import { getAdoptionRequest, getAdoptionRequests, getUsersAdoptionRequests, updateRequestStatus } from "../controllers/requests.js";
import { verifyToken, isAdmin, isMyAccount } from "../middleware/middleware.js";

const router = express.Router();

router.get("/", verifyToken, isAdmin, getAdoptionRequests);
router.get("/:id", verifyToken, isMyAccount, getUsersAdoptionRequests);
router.get("/:id/admin", verifyToken, isAdmin, getUsersAdoptionRequests);
router.get("/:requestId/adoption", verifyToken, getAdoptionRequest);

router.put("/:requestId/adoption", verifyToken, isAdmin, updateRequestStatus);

export default router;

