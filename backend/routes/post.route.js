import express from "express";
import { authMiddleware } from '../middleware/auth.middleware.js';
import { commentPost, createPost, getFeed, likePost } from '../controllers/post.controller.js';
// import { upload } from '../middleware/upload.middleware.js'


import multer from "multer";
import path from "path";

// storage config 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {
        const uniqueName =
            Date.now() + "-" + Math.round(Math.random() * 1e9);

        cb(
            null,
            uniqueName + path.extname(file.originalname)
        );
    }
});


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

// export default upload;


const router = express.Router();

// router.post("/", authMiddleware, createPost);
router.post("/", authMiddleware, upload.single("image"), createPost);
router.get("/feed", authMiddleware, getFeed);
router.put("/like/:id", authMiddleware, likePost);
router.post("/comment/:id", authMiddleware, commentPost);

export default router;