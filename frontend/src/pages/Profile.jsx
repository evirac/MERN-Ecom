import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:5500/users/profile', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => setUser(response.data))
            .catch(err => console.error('Error fetching profile:', err));
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    return (
        <>
            <Header />
            <div className="container my-3">
                <h1 className="text-center">Profile</h1>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Profile Details</h5>
                                <p className="card-text">Full Name: {user.fullName}</p>
                                <p className="card-text">
                                    Email: {user.email}
                                    <Link to="/updateEmail" className="btn btn-link ms-2">Update Email</Link>
                                </p>
                                <Link to="/resetPassword" className="btn btn-link">Reset Password</Link>
                            </div>
                        </div>
                        <button className="btn contrast mt-3" onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Profile;
