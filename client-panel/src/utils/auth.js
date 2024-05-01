// auth.js (utility file)

// Check if the user is authenticated
export const isAuthenticated = () => {
    // Check if authentication token exists in storage
    return localStorage.getItem('token') !== null;
};

// Logout function
export const logout = () => {
    // Clear authentication token from storage
    localStorage.removeItem('token');
};
