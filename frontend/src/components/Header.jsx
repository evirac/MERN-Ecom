import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { CartContext } from '../contexts/CartContext';

export default function Header() {
    const { cart, clearCart } = useContext(CartContext);
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.post('http://localhost:5500/users/verifyToken', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => setLoggedIn(true))
                .catch(error => {
                    console.error('Error verifying token:', error.response ? error.response.data : error.message);
                    setLoggedIn(false);
                });
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        clearCart();
        setLoggedIn(false);
        navigate('/login');
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };


    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchQuery.trim() !== '') {
            navigate(`/search?query=${searchQuery}`);
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="display-3 navbar-brand" to="/">
                        <img alt="logo" width="40px;" height="34px" src={'../../logo.svg'} />
                        NovaNest
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo01"
                        aria-controls="navbarTogglerDemo01"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <br />
                        <div className="col">
                            <form className="d-flex col" onSubmit={handleSearchSubmit}>
                                <div className="input-group mb-2">
                                    <input
                                        className="form-control"
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                    <button className="btn contrast" type="submit">Search</button>
                                </div>
                            </form>
                        </div>
                        <ul className="navbar-nav me-auto mb-lg-0">
                            {loggedIn ? (
                                <>
                                    <li className="nav-item ms-2 mb-2">
                                        <Link className="nav-item btn contrast" to="/profile">Profile</Link>
                                    </li>
                                    <li className="nav-item ms-2 mb-2">
                                        <button className="nav-item btn contrast" onClick={handleLogout}>Logout</button>
                                    </li>
                                </>
                            ) : (
                                <li className="nav-item ms-2 mb-2">
                                    <Link className="nav-item btn contrast" to="/login">Login</Link>
                                </li>
                            )}
                            <li className="nav-item ms-2">
                                <Link className="nav-link" to="/cart">
                                    <FontAwesomeIcon icon={faCartShopping} />
                                    <span className="badge bg-secondary ms-1">{cart.length}</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid justify-content-center">
                    <ul className="navbar-nav flex-row gap-3">
                        <li className="nav-item">
                            <NavLink className="nav-link" to='/'>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/products">Browse Products</NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="/products?category=Men" role="button" data-bs-toggle="dropdown" aria-expanded="false">Men</Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/products?category=Men">All Products</Link></li>
                                <li><Link className="dropdown-item" to="/products?category=Men&subCategory=Shirt">Shirts</Link></li>
                                <li><Link className="dropdown-item" to="/products?category=Men&subCategory=Pant">Pants</Link></li>
                                <li><Link className="dropdown-item" to="/products?category=Men&subCategory=Hoodie">Hoodies</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="/products?category=Women" role="button" data-bs-toggle="dropdown" aria-expanded="false">Women</Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/products?category=Women">All Products</Link></li>
                                <li><Link className="dropdown-item" to="/products?category=Women&subCategory=Dress">Dresses</Link></li>
                                <li><Link className="dropdown-item" to="/products?category=Women&subCategory=Skirt">Skirts</Link></li>
                                <li><Link className="dropdown-item" to="/products?category=Women&subCategory=Pant">Pants</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="/kids" role="button" data-bs-toggle="dropdown" aria-expanded="false">Kids</Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/products?category=Kids">All Products</Link></li>
                                <li><Link className="dropdown-item" to="/products?category=Kids&subCategory=Boys">Boys</Link></li>
                                <li><Link className="dropdown-item" to="/products?category=Kids&subCategory=Girls">Girls</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}
