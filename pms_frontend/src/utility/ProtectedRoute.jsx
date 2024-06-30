import React, { useEffect, useState, useCallback } from "react";
import { Navigate,useLocation } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import authApi from "../api/authApi";
import { ACCESS_TOKEN, REFRESH_TOKEN, TOKEN_URL } from "../utility/constants";

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const location = useLocation();

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await authApi.post(TOKEN_URL, {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    const auth = useCallback(async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            console.log("Not Authorized");
            setIsAuthorized(false);
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            console.log("Refresh Token");
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    }, []);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }, [auth]);

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" state={{ from: location }} replace />;
}

export default ProtectedRoute;
