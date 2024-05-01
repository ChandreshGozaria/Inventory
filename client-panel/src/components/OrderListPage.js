import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../css/OrderListPage.css'; // Import CSS file for styling
import axiosInstance from './axiosInstance';
import LogoutButton from './LogoutButton';
import Cookies from 'js-cookie';

const OrderListPage = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        // Fetch orders from API or any other data source
        const fetchOrders = async () => {
            try {
                // Get the token from Cookies
                const token = Cookies.get('token');
                if (!token) {
                    // Redirect back to login page if token is not found
                    console.error('Token not found. Redirecting to login page.');
                    navigate('/'); // Navigate to login page
                    return;
                }

                // Make the request with the token included in the headers
                const response = await axiosInstance.get('/v1/api/orders/getAllOrderByUserId', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                    },
                });
                setOrders(response.data.data); // Update state with fetched orders
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders(); // Call the function to fetch orders when component mounts
    }, [navigate]); // Include navigate in the dependency array to prevent eslint warning

    return (
        <div className="order-list-container">
            <h2>Order List</h2>
            <table className="order-table">
                <thead>
                    <tr>
                        <th>Client ID</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td>{order.clientId}</td>
                            <td>{order.productName}</td>
                            <td>{order.price}</td>
                            <td>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <LogoutButton />
        </div>
    );
}

export default OrderListPage;
