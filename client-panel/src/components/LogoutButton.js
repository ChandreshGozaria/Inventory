import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/LogoutButton.css'; // Import CSS file for styling
import Cookies from 'js-cookie';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {

        // Delete a cookie
        Cookies.remove('token');

        // Navigate to the login page
        navigate('/');
    };

    return (
        <button className="logout-button" onClick={handleLogout}>Logout</button>
    );
};

export default LogoutButton;
