import React from 'react';
import Navbar from '../components/Navbar';
import CheckoutForm from '../components/CheckoutForm';
import Footer from '../components/Footer';

const Checkout = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <CheckoutForm />
            <Footer />
        </div>
    );
};

export default Checkout;
