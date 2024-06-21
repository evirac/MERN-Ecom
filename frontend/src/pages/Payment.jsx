import React, { useState, useContext, Fragment } from 'react';
import { OrderContext } from '../contexts/OrderContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faCoins} from '@fortawesome/free-solid-svg-icons';

const Payment = () => {
    const { addPaymentMethod } = useContext(OrderContext);
    const [paymentMethod, setPaymentMethod] = useState('');
    const navigate = useNavigate();

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleNext = () => {
        if (paymentMethod) {
            addPaymentMethod(paymentMethod);
            navigate('/order-summary');
        }
    };

    return (
        <Fragment>
            <Header/>
            <div>
                <h2>Payment Method</h2>
                <input type="radio" className='radio form-check-input mb-4 ms-4' name="paymentMethod" value="PayPal " onChange={handlePaymentChange} /> <FontAwesomeIcon style={{color: "goldenrod"}} icon={faCoins} />  PayPal
                <br />
                <input type="radio" className='radio form-check-input mb-4 ms-4' name="paymentMethod" value="Cash on Delivery" onChange={handlePaymentChange} /> <FontAwesomeIcon style={{color: "limegreen"}} icon={faMoneyBill}  /> Cash on Delivery
                <br />
                <button className='btn mb-5 ms-4' onClick={handleNext}>Order Summary</button>
            </div>
            <Footer />
        </Fragment>
    );
};

export default Payment;
