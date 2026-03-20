import { useEffect, useState } from "react";
import API from "../api/axios";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

export default function Feed() {

    const [posts, setPosts] = useState([]);

    const loadFeed = async () => {
        const res = await API.get("/posts/feed");
        setPosts(res.data);
    };

    useEffect(() => {
        loadFeed();
    }, []);

    return (
        <div className="feed-container mt-4">

            <CreatePost refresh={loadFeed} />

            {posts.map(p =>
                <PostCard key={p._id} post={p} refresh={loadFeed} />
            )}

        </div>
    )
}