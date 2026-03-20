import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [form, setForm] = useState({});
    const navigate = useNavigate();

    const submit = async () => {
        const res = await API.post("/auth/login", form);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);

        navigate("/feed");
    };

    return (
        <div className="container mt-5">
            <h3>Login</h3>

            <input className="form-control my-2"
                placeholder="email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input className="form-control my-2"
                type="password"
                placeholder="password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button className="btn btn-success" onClick={submit}>
                Login
            </button>
        </div>
    );
}