import React, { useState, useContext } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../contexts/CartContext';

export default function Header() {
    const { cart } = useContext(CartContext);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

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
                        <img alt="logo" width="40px" height="34px" src={'../../logo.svg'} />
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
                        <ul className="navbar-nav me-auto mb-lg-0">
                            <li className="nav-item ms-2 mb-2">
                                <Link className="nav-item btn contrast" to="/login">Login</Link>
                            </li>
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
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}
