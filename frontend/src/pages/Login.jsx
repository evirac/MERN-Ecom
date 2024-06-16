import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { CartContext } from "../contexts/CartContext";

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const { loadCart } = useContext(CartContext);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5500/users/login', form);
            const token = response.data.token;
            localStorage.setItem('token', token);

            loadCart(token);
            navigate('/profile');
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Invalid email or password');
        }
    };

    return (
        <>
            <Header />
            <div className="container my-3" style={{ maxWidth: '700px' }}>
                <div className="card-body">
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
                    <button className="btn contrast mt-3 p-2 form-control" onClick={handleSubmit}>Submit</button>
                </div>
                <Link className="btn active mt-3" to='/register'>Not a member yet? Sign up.</Link>
            </div>
            <Footer />
        </>
    );
}
