import express from "express";
import { editUserAccount, getUser, getUsers, deleteUserAccount } from "../controllers/users.js";
import {isMyAccount, verifyToken} from "../middleware/middleware.js";

const router = express.Router();

router.get("/", verifyToken, getUsers);
router.get("/:id", verifyToken, getUser);

router.post("/:id/edit", verifyToken, editUserAccount);

router.delete("/:id/delete", verifyToken, isMyAccount, deleteUserAccount);

export default router;