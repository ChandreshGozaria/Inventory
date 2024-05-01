import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import axiosInstance from './axiosInstance';
import '../css/ViewUserPage.css'; // Import CSS file for styling
import Cookies from 'js-cookie';

const ViewUserPage = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = Cookies.get('token');

                if (!token) {
                    console.error('Token not found');
                    navigate('/'); // Redirect to home page if token is not found
                    return;
                }

                const response = await axiosInstance.get(`/v1/api/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [userId, navigate]); // Add navigate to dependency array

    return (
        <div className="view-user-container">
            <h2>User Details</h2>
            {user && (
                <div>
                    <p><strong>User ID:</strong> {user._id}</p>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                </div>
            )}
            <Link to="/list-users" className="back-button">Back to User List</Link>
        </div>
    );
}

export default ViewUserPage;
