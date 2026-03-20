import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {

    const [form, setForm] = useState({});
    const navigate = useNavigate();

    const submit = async () => {
        await API.post("/auth/signup", form);
        alert("Signup success");
        navigate("/");
    };

    return (
        <div className="container mt-5">
            <h3>Signup</h3>

            <input className="form-control my-2"
                placeholder="username"
                onChange={(e) => setForm({ ...form, username: e.target.value })}
            />

            <input className="form-control my-2"
                placeholder="email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input className="form-control my-2"
                type="password"
                placeholder="password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button className="btn btn-primary" onClick={submit}>
                Signup
            </button>
        </div>
    );
}