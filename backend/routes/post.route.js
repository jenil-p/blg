import express from "express";
import { authMiddleware } from '../middleware/auth.middleware.js';
import { commentPost, createPost, getFeed, likePost } from '../controllers/post.controller.js';

const router = express.Router();

router.post("/", authMiddleware, createPost);
router.get("/feed", authMiddleware, getFeed);
router.put("/like/:id", authMiddleware, likePost);
router.post("/comment/:id", authMiddleware, commentPost);

export default router;