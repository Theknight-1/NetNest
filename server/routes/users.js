import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  updateUserDetails,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//READ
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

//UPDATE
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
router.patch("/:id", verifyToken, updateUserDetails);

export default router;
