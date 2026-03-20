import { useState } from "react";
import API from "../api/axios";

export default function PostCard({ post, refresh }) {

    const [comment, setComment] = useState("");

    const like = async () => {
        await API.put(`/posts/like/${post._id}`);
        refresh();
    }

    const sendComment = async () => {
        await API.post(`/posts/comment/${post._id}`, { text: comment });
        setComment("");
        refresh();
    }

    return (
        <div className="post-card">

            {/* header */}
            <div className="d-flex align-items-center gap-2">
                <div className="avatar" />
                <div>
                    <b>{post.user}</b>
                    <div style={{ fontSize: 12, color: "#888" }}>
                        {new Date(post.createdAt).toLocaleString()}
                    </div>
                </div>
            </div>

            {/* text */}
            <div className="mt-2">{post.text}</div>

            {/* image */}
            {post.image &&
                <img
                    className="post-img"
                    src={`http://localhost:3000${post.image}`}
                />
            }

            {/* actions */}
            <div className="action-row">
                <div onClick={like}>
                    ❤️ {post.likesCount}
                </div>

                <div>
                    💬 {post.commentsCount}
                </div>
            </div>

            {/* comments list */}
            <div className="mt-2">
                {post.comments?.map((c, i) =>
                    <div key={i}>
                        <b>{c.user}</b> {c.text}
                    </div>
                )}
            </div>

            {/* comment box */}
            <div className="comment-input">
                <input
                    className="form-control"
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />

                <button className="btn btn-primary" onClick={sendComment}>
                    Send
                </button>
            </div>

        </div>
    )
}