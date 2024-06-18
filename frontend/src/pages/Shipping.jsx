import React, { useState, useEffect, useContext, Fragment } from 'react';
import { OrderContext } from '../contexts/OrderContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ShippingScreen = () => {
    const { addShippingAddress } = useContext(OrderContext);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [newAddress, setNewAddress] = useState({
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        country: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:5500/addresses/get', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => setAddresses(response.data))
            .catch(err => console.error('Error fetching addresses:', err));
    }, []);

    const handleAddressChange = (e) => {
        setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
    };

    const handleAddAddress = async () => {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:5500/addresses/post', newAddress, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setAddresses([...addresses, response.data.address]);
        setSelectedAddress(response.data.address);
    };

    const handleSelectAddress = (address) => {
        setSelectedAddress(address);
    };

    const handleNext = () => {
        if (selectedAddress) {
            addShippingAddress(selectedAddress);
            navigate('/payment');
        }
    };

    return (
        <Fragment>
            <Header />
            <div >
                <h1 className='ms-2 text-center'>Shipping Address</h1>
                {addresses.length > 0 && (
                    <div className='mx-3'>
                        <h3 className=''>Select Address</h3>
                        {addresses.map(address => (
                            <div key={address._id}>
                                <input
                                    type="radio"
                                    name="address"
                                    className="form-check-input radio mx-3"
                                    value={address._id}
                                    onChange={() => handleSelectAddress(address)}
                                />
                                {address.fullName}, {address.address}, {address.city}, {address.postalCode}, {address.country}
                            </div>
                        ))}
                    </div>
                )}
                <hr className='shadow'/>
                <form className='form' action="">
                <h3 className='mt-3 ms-2 '>Or Add New Address</h3>
                    <div className='mb-2 container '>
                        <input className='form-control mb-2' type="text" name="address" placeholder="Address" value={newAddress.address} onChange={handleAddressChange} />
                        <input className='form-control mb-2' type="text" name="city" placeholder="City" value={newAddress.city} onChange={handleAddressChange} />
                        <input className='form-control mb-2' type="text" name="postalCode" placeholder="Postal Code" value={newAddress.postalCode} onChange={handleAddressChange} />
                        <input className='form-control mb-2' type="text" name="fullName" placeholder="Full Name" value={newAddress.fullName} onChange={handleAddressChange} />
                        <input className='form-control mb-2' type="text" name="country" placeholder="Country" value={newAddress.country} onChange={handleAddressChange} />
                        <hr />
                        <button className='btn mx-2' onClick={handleAddAddress}>Add Address</button>
                        <button className='btn mx-2' onClick={handleNext}>Choose Payment Option</button>
                    </div>
                </form>
                </div>
            <Footer />
        </Fragment>
    );
};

export default ShippingScreen;
