import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../../utility/constants";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utility/constants";
import publicApi from "../../api/publicApi";
import "./login.css"

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmitLogin = async (e) => {
        e.preventDefault();

        try {

            const res = await publicApi.post(LOGIN_URL, { username, password });

            if (res.data.access && res.data.refresh) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                console.error("Tokens are missing in the response");
            }
        } catch (error) {
            
            setError("Unable to login, please try again.")
        }
    };

    return(
        <div className="login-container">
            <form className="login-form shadow" onSubmit={handleSubmitLogin}>
                <h2>Login</h2>
                <div className="login-form-group">
                    <input
                        type="text"
                        className="login-form-control"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="login-form-group">
                    <input
                        type="password"
                        className="login-form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
                <div className="text-center mt-3">
                    <p>Don't have an account? <Link to="/signup" className="link-signup">Sign up</Link></p>
                </div>
            {error && <div className="alert alert-danger">{error}</div>}

            </form>

        </div>
    );
}

export default Login;