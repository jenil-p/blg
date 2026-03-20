import { useState } from "react";
import API from "../api/axios";

export default function CreatePost({ refresh }) {

    const [text, setText] = useState("");
    const [file, setFile] = useState(null);

    const submit = async () => {

        const formData = new FormData();
        formData.append("text", text);
        if (file) formData.append("image", file);

        await API.post("/posts", formData);

        setText("");
        setFile(null);

        refresh();
    }

    return (
        <div className="create-card">

            <h5>Create Post</h5>

            <textarea
                className="form-control"
                placeholder="What's on your mind?"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <div className="d-flex justify-content-between mt-3">

                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <button
                    className="btn btn-primary"
                    onClick={submit}
                >
                    Post
                </button>

            </div>

        </div>
    )
}