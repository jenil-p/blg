import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import "../App.css";

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await API.post("/auth/login", form);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", res.data.username);
            navigate("/feed");
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data || "Failed to login. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="custom-card w-100" style={{ maxWidth: '400px', padding: '30px' }}>
                <div className="text-center mb-4">
                    <h3 className="fw-bold text-primary">Welcome Back</h3>
                    <p className="text-muted">Login to continue to your feed</p>
                </div>

                {error && <div className="alert alert-danger py-2">{error}</div>}

                <form onSubmit={submit}>
                    <div className="mb-3">
                        <label className="form-label text-muted fw-bold" style={{ fontSize: '14px' }}>Email Address</label>
                        <input
                            className="form-control"
                            style={{ padding: '10px 15px', borderRadius: '8px' }}
                            placeholder="name@example.com"
                            type="email"
                            required
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label text-muted fw-bold" style={{ fontSize: '14px' }}>Password</label>
                        <input
                            className="form-control"
                            style={{ padding: '10px 15px', borderRadius: '8px' }}
                            type="password"
                            placeholder="Enter your password"
                            required
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100 fw-bold mb-3"
                        style={{ padding: '10px', borderRadius: '8px' }}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="text-center mt-3" style={{ fontSize: '14px' }}>
                    <span className="text-muted">Don't have an account? </span>
                    <Link to="/signup" className="text-primary fw-bold text-decoration-none">Sign up</Link>
                </div>
            </div>
        </div>
    );
}