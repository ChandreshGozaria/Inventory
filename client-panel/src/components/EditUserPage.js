import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/EditUserPage.css';
import axiosInstance from './axiosInstance';
import Cookies from 'js-cookie';

const EditUserPage = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [editedUserData, setEditedUserData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false); // State to track loading status
    const [error, setError] = useState(''); // State to handle errors

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = Cookies.get('token');
                if (!token) {
                    console.error('Token not found. Redirecting to login page.');
                    navigate('/'); // Redirect to login page if token is not found
                    return;
                }

                const response = await axiosInstance.get(`/v1/api/users/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUserData(response.data.data);
                setEditedUserData(response.data.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Error fetching user data. Please try again.');
            }
        };

        fetchUserData();
    }, [userId, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setLoading(true); // Start loading
        setError(''); // Clear previous errors
    
        try {
            const token = Cookies.get('token');
            if (!token) {
                console.error('Token not found. Redirecting to login page.');
                navigate('/'); // Redirect to login page if token is not found
                return;
            }
    
           await axiosInstance.put(`/v1/api/users/${userId}`, editedUserData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            // Redirect back to user list page with success message
            navigate('/list-users', { state: { successMessage: 'User data updated successfully' } });
        } catch (error) {
            console.error('Error updating user data:', error);
            setError('Error updating user data. Please try again.');
        } finally {
            // Set loading to false after at least 1 second
            setTimeout(() => {
                setLoading(false); // Stop loading
            }, 1000); // Wait for 1 second
        }
    };

    return (
        <div className="edit-user-container">
            <h2>Edit User</h2>
            {loading && (
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            )}
            {userData && !loading && (
                <form onSubmit={handleFormSubmit}>
                    {error && <p className="error-message">{error}</p>}
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" name="name" value={editedUserData.name} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={editedUserData.email} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" value={editedUserData.password} onChange={handleInputChange} />
                    </div>
                    <button type="submit">{loading ? 'Saving...' : 'Save'}</button>
                </form>
            )}
        </div>
    );
}

export default EditUserPage;
