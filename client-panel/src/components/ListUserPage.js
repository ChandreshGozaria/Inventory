import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for navigation
import '../css/ListUserPage.css'; // Import CSS file for styling
import axiosInstance from './axiosInstance';
import LogoutButton from './LogoutButton';
import Cookies from 'js-cookie';

const ListUserPage = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch users from API or any other data source
        const fetchUsers = async () => {
            try {
                // Get a cookie
                const token = Cookies.get('token');

                if (!token) {
                    // Redirect back to login page if token is not found
                    console.error('Token not found. Redirecting to login page.');
                    navigate('/'); // Navigate to login page
                    return;
                }

                // Make the request with the token included in the headers
                const response = await axiosInstance.get('/v1/api/users/getAllUser', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                    },
                });
                setUsers(response.data.data); // Update state with fetched users
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers(); // Call the function to fetch users when component mounts
    }, [navigate]); // Include navigate in the dependency array to prevent eslint warning

    return (
        <div className="user-list-container">
            <h2>User List</h2>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Edit</th>
                        <th>View</th> {/* New column for View button */}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <Link to={`/edit-user/${user._id}`} className="edit-link">Edit</Link>
                            </td>
                            <td>
                                <Link to={`/view-user/${user._id}`} className="view-link">View</Link>
                            </td> {/* View User link */}
                        </tr>
                    ))}
                </tbody>
            </table>
            <LogoutButton />
        </div>
    );
}

export default ListUserPage;
