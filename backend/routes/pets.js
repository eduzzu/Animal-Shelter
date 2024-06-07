import express from "express";
import { isAdmin, verifyToken } from "../middleware/middleware.js";
import { deletePet, filterPets, getPet, getPets } from "../controllers/pets.js";
import { createRequest } from "../controllers/adoptionRequest.js";

const router = express.Router();

router.get("/", verifyToken, getPets);
router.get("/filter", verifyToken, filterPets);
router.get("/:id", verifyToken, getPet);

router.post("/:petId/adopt", verifyToken, createRequest);

router.delete("/:id/deletePet", verifyToken, isAdmin, deletePet);

export default router;