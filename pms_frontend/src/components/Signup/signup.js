import React from "react";
import { SIGNUP_URL } from "../../utility/constants";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import publicApi from '../../api/publicApi'
import './signup.css';


const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [date_of_birth, setDateOfBirth] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmitSignup = async (e) => {
        e.preventDefault();
        try {
  

            const response = await publicApi.post(
                SIGNUP_URL,
                { username, password, email, first_name, last_name, date_of_birth }
            );
            if (response.status === 201) { 
                navigate("/login");
            } else {
                setError("Signup failed. Please try again.");
            }
        } catch (error) {
            console.error("Signup error:", error);
            if (error.response) {
                console.error("Error response:", error.response);
                setError(JSON.stringify(error.response.data));
            } else if (error.request) {
                console.error("Error request:", error.request);
                setError("No response received from server");
            } else {
                console.error("Error message:", error.message);
                setError("An error occurred during signup. Please try again.");
            }
        }
    };
    return(
        <div className="signup-container">
            <form className="signup-form shadow" onSubmit={handleSubmitSignup}>
                <h2>Sign Up</h2>
                <div className="signup-form-group">
                    <input
                        type="text"
                        className="signup-form-control"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="signup-form-group">
                    <input
                        type="password"
                        className="signup-form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="signup-form-group">
                    <input
                        type="email"
                        className="signup-form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="signup-form-group">
                    <input
                        type="text"
                        className="signup-form-control"
                        placeholder="First Name"
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="signup-form-group">
                    <input
                        type="text"
                        className="signup-form-control"
                        placeholder="Last Name"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="signup-form-group">
                    <input
                        type="date"
                        className="signup-form-control"
                        placeholder="Date of Birth"
                        value={date_of_birth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Sign Up
                </button>
                <div className="text-center mt-3">
                    <p>Already have an account? <Link to="/login" className="link-signup">Log in</Link></p>
                </div>
                {error && <div className="alert alert-danger">{typeof error === 'string' ? error : JSON.stringify(error)}</div>}
            </form>
            

        </div>
    );
}

export default Signup;