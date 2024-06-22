import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://mern-ecom-tguf.onrender.com' 
  : 'http://localhost:5500';

const UpdateEmail = () => {
    const [newEmail, setNewEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleUpdateEmail = () => {
        const token = localStorage.getItem('token');
        axios.put(`${API_URL}/users/updateEmail`, { newEmail }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => setMessage(response.data.message))
        .catch(err => console.error('Error updating email:', err));
    };

    return (
        <>
            <Header />
            <div className="container my-3">
                <h1 className="text-center">Update Email</h1>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">New Email Address</h5>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="New Email"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                    />
                                    <button className="btn btn-primary mt-2" onClick={handleUpdateEmail}>
                                        Update Email
                                    </button>
                                </div>
                                {message && <div className="alert alert-info mt-3">{message}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default UpdateEmail;
