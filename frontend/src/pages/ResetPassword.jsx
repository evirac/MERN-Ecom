import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ResetPassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = () => {
        const token = localStorage.getItem('token');
        axios.put('http://localhost:5500/users/resetPassword', { currentPassword, newPassword }, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => setMessage(response.data.message))
        .catch(err => console.error('Error resetting password:', err));
    };

    return (
        <>
            <Header />
            <div className="container my-3">
                <h1 className="text-center">Reset Password</h1>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Reset Password</h5>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Current Password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                    />
                                    <input
                                        type="password"
                                        className="form-control mt-2"
                                        placeholder="New Password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <button className="btn btn-primary mt-2" onClick={handleResetPassword}>
                                        Reset Password
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

export default ResetPassword;
