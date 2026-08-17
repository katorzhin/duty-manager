import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {login} from "../../services/authApi.ts";

export function useLogin() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {

        try {

            const response = await login({email, password});

            localStorage.setItem("token", response.token);
            localStorage.setItem("email", email);
            localStorage.setItem("role", response.role);
            navigate("/");

        } catch {
            setError("Invalid email or password");
        }
    };

    return {
        email,
        password,
        error,
        setEmail,
        setPassword,
        handleLogin
    };
}