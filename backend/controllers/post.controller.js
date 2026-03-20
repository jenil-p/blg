import Post from "../models/Post.js";


export const createPost = async (req, res) => {
    try {
        const { text } = req.body;

        let imageUrl = "";

        if (req.file) {
            imageUrl = `/uploads/${req.file.filename}`;
        }

        if (!text && !imageUrl) {
            return res
                .status(400)
                .json({ message: "Text or image required" });
        }

        const post = await Post.create({
            user: req.user.username,
            text,
            image: imageUrl
        });

        res.json(post);

    } catch (err) {
        res.status(500).json(err.message);
    }
};


export const getFeed = async (req, res) => {
    try {

        const posts = await Post.find().sort({ createdAt: -1 });

        const formattedPosts = posts.map(post => ({
            _id: post._id,
            user: post.user,
            text: post.text,
            image: post.image,
            createdAt: post.createdAt,

            likesCount: post.likes.length,
            commentsCount: post.comments.length,

            likes: post.likes,
            comments: post.comments
        }));

        res.json(formattedPosts);

    } catch (err) {
        res.status(500).json(err.message);
    }
};


export const likePost = async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json("Post not found");

        const username = req.user.username;

        const alreadyLiked = post.likes.includes(username);

        if (alreadyLiked) {
            post.likes = post.likes.filter(u => u !== username);
        } else {
            post.likes.push(username);
        }

        await post.save();

        res.json(post);

    } catch (err) {
        res.status(500).json(err.message);
    }
};

export const commentPost = async (req, res) => {
    try {

        const { text } = req.body;

        if (!text) return res.status(400).json("Comment text required");

        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json("Post not found");

        post.comments.push({
            user: req.user.username,
            text
        });

        await post.save();

        res.json(post);

    } catch (err) {
        res.status(500).json(err.message);
    }
};