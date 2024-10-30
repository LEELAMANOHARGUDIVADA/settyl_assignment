import React, { createContext, useEffect, useState } from "react";
import {jwtDecode as jwt_decode} from "jwt-decode"
import axios from "axios";

const AuthContext = createContext();
const SERVERURL = import.meta.env.VITE_API_URL;

export function AuthProvider ({ children }) {
    const [user, setUser] = useState(null);

    const login = async( email, password ) => {
        const response = await axios.post(`${SERVERURL}/api/user/login`, { email, password });
        console.log(response.data);
        const token = response.data.token;
        localStorage.setItem("token", token);
        setUser(jwt_decode(token));
    }

    const register = async ( { name, email, password } ) => {
        const response = await axios.post(`${SERVERURL}/api/user/register`, {
            name: name,
            email: email,
            password: password
        });

        const token = response.data.token;
        localStorage.setItem("token", token);
        setUser(jwt_decode(token));
    }

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) {
            setUser(jwt_decode(token));
        }
    },[]);


return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
        {children}
    </AuthContext.Provider>
);

};

export default AuthContext
