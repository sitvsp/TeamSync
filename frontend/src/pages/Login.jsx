import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import API from "../services/api.js";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem("token");

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    useEffect(() => {
        if (token) {
            navigate("/dashboard");
        }
    }, [token, navigate]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post("/auth/login", form);

            localStorage.setItem("token", res.data.token);

            localStorage.setItem("name", res.data.user.name);

            navigate("/dashboard");
        } catch (error) {
            alert("Login Failed");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-900">
            <div>
                {location.state?.message && (
                    <div className="bg-red-500 text-white p-3 rounded mb-4">
                        {location.state.message}
                    </div>
                )}
                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-800 p-8 rounded-lg w-96"
                >
                    <h2 className="text-3xl font-bold mb-6 text-center text-white">
                        TeamSync Login
                    </h2>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full p-3 mb-4 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full p-3 mb-4 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-green-500 p-3 rounded-lg hover:bg-green-600"
                    >
                        Login
                    </button>

                    <p className="mt-4 text-center text-white">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="text-green-400"
                        >
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;