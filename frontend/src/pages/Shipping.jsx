import React, { useState, useEffect, useContext } from 'react';
import { OrderContext } from '../contexts/OrderContext';
import { CartContext } from '../contexts/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Shipping = () => {
    const { addShippingAddress } = useContext(OrderContext);
    const { cart } = useContext(CartContext);
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
        axios.get('http://localhost:5500/addresses', {
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
        const response = await axios.post('http://localhost:5500/address', newAddress, {
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
        <div>
            <h2>Shipping Address</h2>
            {addresses.length > 0 && (
                <div>
                    <h3>Select Address</h3>
                    {addresses.map(address => (
                        <div key={address._id}>
                            <input
                                type="radio"
                                name="address"
                                value={address._id}
                                onChange={() => handleSelectAddress(address)}
                            />
                            {address.fullName}, {address.address}, {address.city}, {address.postalCode}, {address.country}
                        </div>
                    ))}
                </div>
            )}
            <h3>Or Add New Address</h3>
            <input type="text" name="fullName" placeholder="Full Name" value={newAddress.fullName} onChange={handleAddressChange} />
            <input type="text" name="address" placeholder="Address" value={newAddress.address} onChange={handleAddressChange} />
            <input type="text" name="city" placeholder="City" value={newAddress.city} onChange={handleAddressChange} />
            <input type="text" name="postalCode" placeholder="Postal Code" value={newAddress.postalCode} onChange={handleAddressChange} />
            <input type="text" name="country" placeholder="Country" value={newAddress.country} onChange={handleAddressChange} />
            <button onClick={handleAddAddress}>Add Address</button>
            <button onClick={handleNext}>Choose Payment Option</button>
        </div>
    );
};

export default Shipping;
