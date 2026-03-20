import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../App.css";


const BASE_URL = import.meta.env.VITE_API_URL_FOR_IMAGE;

export default function PostCard({ post, refresh }) {
    const navigate = useNavigate();

    const [isLiked, setIsLiked] = useState(post.isLiked || false);
    const [likesCount, setLikesCount] = useState(post.likesCount || 0);

    useEffect(() => {
        setIsLiked(post.isLiked || false);
        setLikesCount(post.likesCount || 0);
    }, [post]);

    const handleLike = async () => {
        setIsLiked(!isLiked);
        setLikesCount(prev => isLiked ? prev - 1 : prev + 1);

        try {
            await API.put(`/posts/like/${post._id}`);
            if (refresh) refresh();
        } catch (error) {
            setIsLiked(isLiked);
            setLikesCount(isLiked ? likesCount + 1 : likesCount - 1);
            console.error("Failed to like post", error);
        }
    }

    const goToComments = () => {
        navigate(`/post/${post._id}`);
    }

    return (
        <div className="custom-card">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="d-flex align-items-center gap-2">
                    <div className="avatar">
                        <img className="userProfilePic" src="./userdef.png" alt="userPic" />
                    </div>
                    <div>
                        <div className="d-flex align-items-center gap-2">
                            <b className="mb-0 fs-6">{post.user}</b>
                        </div>
                        <div style={{ fontSize: '13px', color: "#888" }}>
                            @{post.user?.toLowerCase()?.replace(/\s/g, '')} • {new Date(post.createdAt).toLocaleString([], { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                </div>
                <button className="btn btn-primary rounded-pill btn-sm fw-bold px-3">Follow</button>
            </div>

            {/* Text Content */}
            <div className="my-3 text-dark" style={{ whiteSpace: 'pre-wrap', fontSize: '15px' }}>
                {post.text}
            </div>

            {/* Image (if any) */}
            {post.image &&
                <img
                    className="img-fluid rounded mb-3"
                    style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }}
                    src={`${BASE_URL}${post.image}`}
                    alt="post"
                />
            }

            <hr style={{ color: '#e9ecef', margin: '10px 0' }} />

            <div className="d-flex justify-content-between text-muted px-2 pt-1">
                <div
                    className={`action-icon ${isLiked ? 'text-danger' : ''}`}
                    onClick={handleLike}
                >
                    <i className={`bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'}`}></i> {likesCount}
                </div>

                <div className="action-icon" onClick={goToComments}>
                    <i className="bi bi-chat"></i> {post.commentsCount || 0}
                </div>
                <div className="action-icon">
                    <i className="bi bi-share"></i> 0
                </div>
            </div>
        </div>
    )
}