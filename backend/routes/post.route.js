import express from "express";
import { authMiddleware } from '../middleware/auth.middleware.js';
import { commentPost, createPost, getFeed, likePost, getPostDetail } from '../controllers/post.controller.js';



import multer from "multer";
import path from "path";

// storage config 
const storage = multer.memoryStorage(); // Stores file in memory as a buffer

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb(new Error("Only images allowed"), false);
    }
};

const upload = multer({
    storage,
    fileFilter
});



const router = express.Router();

router.post("/", authMiddleware, upload.single("image"), createPost);
router.get("/feed/:id", authMiddleware, getPostDetail);
router.get("/feed", authMiddleware, getFeed);
router.put("/like/:id", authMiddleware, likePost);
router.post("/comment/:id", authMiddleware, commentPost);

export default router;