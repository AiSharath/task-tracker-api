import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        "email": "",
        "password": ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if (res.ok) {
                document.cookie = `token=${data.token}; path=/; max-age=${60 * 60 * 24 * 7}`
                console.log("Success", data)
                navigate("/")
            } else {
                console.log("Error", data.message)
            }
        } catch (error) {
            console.log("Network error:", error)
        }
    }


    return (
        <>
            <div className="form-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit} className="form">
                    <div className="input-fields">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <input
                            type="password"
                            placeholder="Enter your password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login;