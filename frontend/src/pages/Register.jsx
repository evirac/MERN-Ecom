import React, { useState } from 'react';
import axios from 'axios';
import Footer from "../components/Footer";
import Header from "../components/Header";

const Register = () => {
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const response = await axios.post('http://localhost:5500/users/register', {
                fullName: form.fullName,
                email: form.email,
                password: form.password
            });

            alert(response.data.message);
            setForm({
                fullName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch (error) {
            console.error('Error registering user:', error);
            alert(error.response.data.message || 'Error registering user');
        }
    };

    return (
        <>
            <Header />
            <div className="container my-3" style={{ maxWidth: '700px' }}>
                <div className="card-body">
                    <strong className="d-block mb-2">Full Name:</strong>
                    <input
                        id="full-name"
                        name="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        className="form-control"
                        value={form.fullName}
                        onChange={handleInputChange}
                    />
                    <strong className="d-block mb-2">Email:</strong>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your E-mail"
                        className="form-control"
                        value={form.email}
                        onChange={handleInputChange}
                    />
                    <strong className="d-block mb-2">Password:</strong>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your Password"
                        className="form-control"
                        value={form.password}
                        onChange={handleInputChange}
                    />
                    <strong className="d-block mb-2">Confirm Password:</strong>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Enter your Password again"
                        className="form-control"
                        value={form.confirmPassword}
                        onChange={handleInputChange}
                    />
                    <button className="btn contrast mt-3 p-2 form-control" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Register;
