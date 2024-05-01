import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import ListUserPage from './components/ListUserPage';
import OrderListPage from './components/OrderListPage';
import EditUserPage from './components/EditUserPage'; // Import the EditUserPage component
import './AppRouter.css'; // Import CSS file for styling
import ViewUserPage from './components/ViewUserPage';

const AppRouter = () => {
    
    return (
        <Router>
            <div>
                <h1 className="header">Inventory</h1> {/* Header "Inventory" */}
                <div className="container">
                    <Routes>
                        {/* <Route path="/login" element={<LoginPage />} /> */}
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/list-users" element={<ListUserPage />} />
                        <Route path="/order-list" element={<OrderListPage />} />
                        <Route path="/edit-user/:userId" element={<EditUserPage />} /> {/* Route for the edit user page */}
                        <Route path="/view-user/:userId" element={<ViewUserPage />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default AppRouter;


