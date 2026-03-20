import { useState, useRef } from "react";
import API from "../api/axios";
import "../App.css";

export default function CreatePost({ refresh }) {
    const [text, setText] = useState("");
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // Reference to trigger the hidden file input
    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            // Create a temporary URL to show the image preview
            setImagePreview(URL.createObjectURL(selectedFile));
        }
    };

    const removeImage = () => {
        setFile(null);
        setImagePreview(null);
        // Reset the input value so the same file can be selected again if needed
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const submit = async () => {
        if (!text && !file) return;

        const formData = new FormData();
        formData.append("text", text);
        if (file) formData.append("image", file);

        try {
            await API.post("/posts", formData);

            // Clear everything after successful post
            setText("");
            setFile(null);
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";

            refresh();
        } catch (error) {
            console.error("Failed to create post", error);
        }
    }

    return (
        <div className="custom-card mt-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="m-0" style={{ fontWeight: 600 }}>Create Post</h4>
            </div>

            <textarea
                className="form-control no-border-input mb-3"
                rows="2"
                placeholder="What's on your mind?"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            {/* Image Preview Area */}
            {imagePreview && (
                <div className="position-relative mb-3" style={{ display: "inline-block" }}>
                    <img
                        src={imagePreview}
                        alt="Preview"
                        className="img-fluid rounded border"
                        style={{ maxHeight: '150px', objectFit: 'cover' }}
                    />
                    {/* 'X' button to remove the selected image */}
                    <button
                        className="btn btn-dark btn-sm rounded-circle position-absolute top-0 end-0 m-1"
                        onClick={removeImage}
                        style={{ width: '28px', height: '28px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <i className="bi bi-x fs-5"></i>
                    </button>
                </div>
            )}

            <hr style={{ color: '#e9ecef', opacity: 1 }} />

            <div className="d-flex justify-content-between align-items-center">

                {/* Left side actions */}
                <div className="d-flex gap-3 fs-5 text-primary">
                    {/* Hidden input */}
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                    />

                    {/* Clickable Image Icon */}
                    <i
                        className="bi bi-image"
                        style={{ cursor: 'pointer' }}
                        onClick={() => fileInputRef.current.click()}
                        title="Upload Image"
                    ></i>
                </div>

                <button
                    className="btn rounded-pill px-4 fw-bold"
                    style={{ backgroundColor: (text || file) ? '#0d6efd' : '#e9ecef', color: (text || file) ? '#fff' : '#adb5bd', border: 'none' }}
                    onClick={submit}
                    disabled={!text && !file}
                >
                    Post
                </button>
            </div>
        </div>
    )
}