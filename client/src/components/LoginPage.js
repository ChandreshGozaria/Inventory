import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/LoginPage.css';
import axiosInstance from './axiosInstance';
import Cookies from 'js-cookie';
import Loader from "./Loader";


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (!email || !password) {
            setError('Please enter both email and password.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axiosInstance.post('/v1/api/users/login', {
                email,
                password
            });
            const data = response.data.data;

            const token = data.token;
            Cookies.set('token', token);


            if (data.user.role === 'admin') {
                navigate('/list-users');
            } else if (data.user.role === 'client') {
                navigate('/order-list');
            }
        } catch (error) {
            setError(error.response ? error.response.data.message : 'An error occurred while logging in.');
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 3000);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="login-container">
            <h2>Login Page</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <div className="input-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                            required
                        />
                        <button type="button" className="button" onClick={togglePasswordVisibility}>
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? (
                        <div
                            style={{
                                width: "100px",
                                margin: "auto",
                            }}
                        >
                            <Loader />
                        </div>
                    ) : 'Login'}
                </button>
            </form>
        </div>
    );
}

export default LoginPage;
