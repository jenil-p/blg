import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB  from './config/db.js';

import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});