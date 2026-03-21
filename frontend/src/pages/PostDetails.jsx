import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../App.css";

export default function PostDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [comment, setComment] = useState("");

    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);

    const loadPost = async () => {
        const res = await API.get(`/posts/feed/${id}`);
        setPost(res.data);
        setIsLiked(res.data.isLiked || false);
        setLikesCount(res.data.likesCount || 0);
    };

    useEffect(() => {
        loadPost();
    }, [id]);

    const handleLike = async () => {
        setIsLiked(!isLiked);
        setLikesCount(prev => isLiked ? prev - 1 : prev + 1);

        try {
            await API.put(`/posts/like/${id}`);
            const res = await API.get(`/posts/feed/${id}`);
            setPost(res.data);
        } catch (error) {
            setIsLiked(isLiked);
            setLikesCount(isLiked ? likesCount + 1 : likesCount - 1);
        }
    }

    const sendComment = async () => {
        if (!comment.trim()) return;
        await API.post(`/posts/comment/${id}`, { text: comment });
        setComment("");
        loadPost();
    }

    if (!post) return <div className="text-center mt-5">Loading...</div>;

    return (
        <div className="app-container" style={{ backgroundColor: '#fff', minHeight: '100vh' }}>

            <div className="p-3 border-bottom sticky-top bg-white d-flex align-items-center gap-3">
                <i className="bi bi-arrow-left fs-4" style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}></i>
                <h5 className="m-0 fw-bold">Post</h5>
            </div>

            <div className="p-3 border-bottom">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center gap-2">
                        <div className="avatar">
                            <img className="userProfilePic" src="../userdef.png" alt="userPic" />
                        </div>
                        <div>
                            <b className="mb-0 fs-6">{post.user}</b>
                            <div style={{ fontSize: '13px', color: "#888" }}>
                                @{post.user?.toLowerCase()} • {new Date(post.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="my-3" style={{ whiteSpace: 'pre-wrap' }}>{post.text}</div>

                {post.image && (
                    <img className="img-fluid rounded mb-3 w-100" src={post.image} alt="post" />
                )}

                <div className="d-flex justify-content-between text-muted mt-2 border-top pt-3">
                    <div
                        className={`action-icon ${isLiked ? 'text-danger' : ''}`}
                        onClick={handleLike}
                    >
                        <i className={`bi ${isLiked ? 'bi-heart-fill' : 'bi-heart'}`}></i> {likesCount}
                    </div>
                    <div className="action-icon"><i className="bi bi-chat"></i> {post.comments?.length || 0}</div>
                    <div className="action-icon"><i className="bi bi-share"></i> 0</div>
                </div>
            </div>

            <div className="p-3 pb-5 mb-5">
                {post.comments?.map((c, i) => (
                    <div key={i} className="mb-4 d-flex gap-3">
                        <div className="avatar">
                            <img className="userProfilePic" src="../userdef.png" alt="userPic" />
                        </div>
                        <div className="w-100 comment-component">
                            <div className="d-flex align-items-center gap-2">
                                <div>
                                    <b className="mb-0 fs-6">{c.user}</b>
                                    <div style={{ fontSize: '13px', color: "#888" }}>
                                        @{c.user?.toLowerCase()} • {new Date(c.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                            
                            <div style={{ fontSize: '14px', marginTop: '2px' }}>{c.text}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="sticky-bottom-bar d-flex align-items-center gap-2">
                <input
                    className="form-control rounded-pill bg-light border-0"
                    style={{ padding: '10px 20px' }}
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    className="btn btn-primary rounded-pill px-4 fw-bold"
                    onClick={sendComment}
                    disabled={!comment.trim()}
                >
                    Send
                </button>
            </div>
        </div>
    );
}