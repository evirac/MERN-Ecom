import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await axios.get('http://localhost:5500/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
                navigate('/login');
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <div className="container my-3" style={{ maxWidth: '700px' }}>
                <div className="card-body">
                    <h2>Profile</h2>
                    <p><strong>Full Name:</strong> {user.fullName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <button className="btn btn-primary mt-3" onClick={() => navigate('/addproduct')}>Add Product</button>
                    <button className="btn btn-secondary mt-3 ms-2" onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <Footer />
        </>
    );
}
