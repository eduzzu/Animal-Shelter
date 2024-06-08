import express from "express";
import { editUserAccount, getUser, getUsers, deleteUserAccount } from "../controllers/users.js";
import {isAdmin, isMyAccount, verifyToken} from "../middleware/middleware.js";
import { deleteRequest } from "../controllers/adoption.js";

const router = express.Router();

router.get("/", verifyToken, getUsers);
router.get("/:id", verifyToken, getUser);

router.put("/:id/edit", verifyToken, isMyAccount, editUserAccount);

router.delete("/:id/delete", verifyToken, isMyAccount, deleteUserAccount);
router.delete("/:id/delete/admin", verifyToken, isAdmin, deleteUserAccount);
router.delete("/:id/:requestId/delete", verifyToken, isMyAccount, deleteRequest);
router.delete("/:id/:requestId/delete/admin", verifyToken, isAdmin, deleteRequest);

export default router;