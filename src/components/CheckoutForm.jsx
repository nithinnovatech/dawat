import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import {
    User,
    Mail,
    Phone,
    MapPin,
    FileText,
    CreditCard,
    ArrowLeft,
    Shield,
    Lock,
    CheckCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { generateOrderId, saveOrderToGoogleSheets, saveOrderLocally } from '../utils/googleSheets';
import { sendOrderConfirmationEmail } from '../utils/emailService';
import { getStripe, createPaymentIntent, stripeAppearance } from '../utils/stripe';

// Payment Form Component (inside Elements provider)
const PaymentForm = ({ formData, orderData, onSuccess, onBack }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentError, setPaymentError] = useState(null);

    const handlePayment = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);
        setPaymentError(null);

        try {
            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/success`,
                    receipt_email: formData.email,
                },
                redirect: 'if_required',
            });

            if (error) {
                setPaymentError(error.message);
                setIsProcessing(false);
            } else if (paymentIntent && paymentIntent.status === 'succeeded') {
                // Payment successful
                onSuccess({ ...orderData, paymentIntentId: paymentIntent.id });
            }
        } catch (err) {
            setPaymentError('An unexpected error occurred. Please try again.');
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handlePayment} className="space-y-6">
            <div className="glass-card p-6 border-gold-500/30">
                <div className="flex items-center space-x-3 mb-4">
                    <CreditCard className="text-gold-500" size={24} />
                    <h3 className="text-lg font-display font-bold text-cream-50">
                        Payment Details
                    </h3>
                </div>

                <div className="mb-4">
                    <PaymentElement
                        options={{
                            layout: 'tabs',
                        }}
                    />
                </div>

                {paymentError && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm mb-4"
                    >
                        {paymentError}
                    </motion.div>
                )}

                <div className="flex items-center space-x-2 text-cream-200/60 text-sm">
                    <Shield size={14} className="text-green-400" />
                    <span>Secured by Stripe. Your payment info is encrypted.</span>
                </div>
            </div>

            <div className="flex gap-4">
                <button
                    type="button"
                    onClick={onBack}
                    className="flex-1 btn-outline py-3"
                >
                    <ArrowLeft size={18} className="mr-2" />
                    Back
                </button>

                <motion.button
                    type="submit"
                    disabled={!stripe || isProcessing}
                    whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                    whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                    className={`flex-1 btn-gold text-lg py-3 flex items-center justify-center space-x-2 ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                >
                    {isProcessing ? (
                        <>
                            <div className="w-5 h-5 border-2 border-maroon-900 border-t-transparent rounded-full animate-spin" />
                            <span>Processing...</span>
                        </>
                    ) : (
                        <>
                            <Lock size={18} />
                            <span>Pay ${orderData.total.toFixed(2)} AUD</span>
                        </>
                    )}
                </motion.button>
            </div>
        </form>
    );
};

const CheckoutForm = () => {
    const navigate = useNavigate();
    const { cartItems, getCartTotal, clearCart } = useCart();
    const [step, setStep] = useState(1); // 1: Details, 2: Payment
    const [clientSecret, setClientSecret] = useState(null);
    const [isLoadingPayment, setIsLoadingPayment] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        suburb: '',
        postcode: '',
        specialInstructions: '',
    });
    const [errors, setErrors] = useState({});
    const [orderData, setOrderData] = useState(null);

    const subtotal = getCartTotal();
    const deliveryFee = subtotal >= 169 ? 0 : 15;
    const total = subtotal + deliveryFee;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^(\+61|0)[0-9]{9}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Please enter a valid Australian phone number';
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
        }

        if (!formData.suburb.trim()) {
            newErrors.suburb = 'Suburb is required';
        }

        if (!formData.postcode.trim()) {
            newErrors.postcode = 'Postcode is required';
        } else if (!/^3[0-9]{3}$/.test(formData.postcode)) {
            newErrors.postcode = 'Please enter a valid Melbourne postcode (3xxx)';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleContinueToPayment = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoadingPayment(true);

        try {
            const orderId = generateOrderId();
            const fullAddress = `${formData.address}, ${formData.suburb} VIC ${formData.postcode}`;

            const order = {
                orderId,
                customerName: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                address: fullAddress,
                items: cartItems,
                subtotal,
                deliveryFee,
                total,
                specialInstructions: formData.specialInstructions,
            };

            setOrderData(order);

            // Create payment intent
            const { clientSecret: secret } = await createPaymentIntent(order);
            setClientSecret(secret);
            setStep(2);
        } catch (error) {
            console.error('Error creating payment intent:', error);
            alert('Unable to initialize payment. Please make sure the payment server is running (node server.js)');
        } finally {
            setIsLoadingPayment(false);
        }
    };

    const handlePaymentSuccess = async (completedOrder) => {
        try {
            const finalOrderData = {
                ...completedOrder,
                paymentStatus: 'Paid',
            };

            // Save order locally as backup
            saveOrderLocally(finalOrderData);

            // Try to save to Google Sheets
            try {
                await saveOrderToGoogleSheets(finalOrderData);
            } catch (err) {
                console.log('Google Sheets save failed, order saved locally');
            }

            // Try to send confirmation email
            try {
                await sendOrderConfirmationEmail(finalOrderData);
            } catch (err) {
                console.log('Email send failed');
            }

            // Clear cart and navigate to success page
            clearCart();
            navigate('/success', { state: { orderData: finalOrderData } });
        } catch (error) {
            console.error('Order processing error:', error);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-display text-cream-50 mb-4">Your cart is empty</h2>
                    <button
                        onClick={() => navigate('/')}
                        className="btn-gold"
                    >
                        Return to Menu
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 bg-pattern">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => step === 2 ? setStep(1) : navigate('/')}
                    className="flex items-center space-x-2 text-cream-200 hover:text-gold-400 transition-colors mb-8"
                >
                    <ArrowLeft size={20} />
                    <span>{step === 2 ? 'Back to Details' : 'Back to Menu'}</span>
                </motion.button>

                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-8">
                    <div className="flex items-center space-x-4">
                        <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-gold-400' : 'text-cream-200/50'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-gold-500 text-maroon-900' : 'bg-cream-200/20'}`}>
                                {step > 1 ? <CheckCircle size={18} /> : '1'}
                            </div>
                            <span className="font-medium">Details</span>
                        </div>
                        <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-gold-500' : 'bg-cream-200/20'}`} />
                        <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-gold-400' : 'text-cream-200/50'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-gold-500 text-maroon-900' : 'bg-cream-200/20'}`}>
                                2
                            </div>
                            <span className="font-medium">Payment</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Form Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-8"
                    >
                        {step === 1 ? (
                            <>
                                <h2 className="text-2xl font-display font-bold text-cream-50 mb-6">
                                    Delivery Details
                                </h2>

                                <form onSubmit={handleContinueToPayment} className="space-y-6">
                                    {/* Full Name */}
                                    <div>
                                        <label className="block text-cream-200 mb-2 text-sm font-medium">
                                            Full Name *
                                        </label>
                                        <div className="relative">
                                            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/50" />
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                className={`input-premium pl-12 ${errors.fullName ? 'border-red-500' : ''}`}
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        {errors.fullName && (
                                            <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-cream-200 mb-2 text-sm font-medium">
                                            Email Address *
                                        </label>
                                        <div className="relative">
                                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/50" />
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className={`input-premium pl-12 ${errors.email ? 'border-red-500' : ''}`}
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                        {errors.email && (
                                            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                                        )}
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-cream-200 mb-2 text-sm font-medium">
                                            Phone Number *
                                        </label>
                                        <div className="relative">
                                            <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/50" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className={`input-premium pl-12 ${errors.phone ? 'border-red-500' : ''}`}
                                                placeholder="0400 000 000"
                                            />
                                        </div>
                                        {errors.phone && (
                                            <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                                        )}
                                    </div>

                                    {/* Address */}
                                    <div>
                                        <label className="block text-cream-200 mb-2 text-sm font-medium">
                                            Street Address *
                                        </label>
                                        <div className="relative">
                                            <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/50" />
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                className={`input-premium pl-12 ${errors.address ? 'border-red-500' : ''}`}
                                                placeholder="123 Main Street"
                                            />
                                        </div>
                                        {errors.address && (
                                            <p className="text-red-400 text-sm mt-1">{errors.address}</p>
                                        )}
                                    </div>

                                    {/* Suburb & Postcode */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-cream-200 mb-2 text-sm font-medium">
                                                Suburb *
                                            </label>
                                            <input
                                                type="text"
                                                name="suburb"
                                                value={formData.suburb}
                                                onChange={handleInputChange}
                                                className={`input-premium ${errors.suburb ? 'border-red-500' : ''}`}
                                                placeholder="Melbourne"
                                            />
                                            {errors.suburb && (
                                                <p className="text-red-400 text-sm mt-1">{errors.suburb}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-cream-200 mb-2 text-sm font-medium">
                                                Postcode *
                                            </label>
                                            <input
                                                type="text"
                                                name="postcode"
                                                value={formData.postcode}
                                                onChange={handleInputChange}
                                                className={`input-premium ${errors.postcode ? 'border-red-500' : ''}`}
                                                placeholder="3000"
                                            />
                                            {errors.postcode && (
                                                <p className="text-red-400 text-sm mt-1">{errors.postcode}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Special Instructions */}
                                    <div>
                                        <label className="block text-cream-200 mb-2 text-sm font-medium">
                                            Special Instructions (Optional)
                                        </label>
                                        <div className="relative">
                                            <FileText size={18} className="absolute left-4 top-4 text-gold-500/50" />
                                            <textarea
                                                name="specialInstructions"
                                                value={formData.specialInstructions}
                                                onChange={handleInputChange}
                                                rows={3}
                                                className="input-premium pl-12"
                                                placeholder="Any special requests or delivery instructions..."
                                            />
                                        </div>
                                    </div>

                                    {/* Continue Button */}
                                    <motion.button
                                        type="submit"
                                        disabled={isLoadingPayment}
                                        whileHover={{ scale: isLoadingPayment ? 1 : 1.02 }}
                                        whileTap={{ scale: isLoadingPayment ? 1 : 0.98 }}
                                        className={`w-full btn-gold text-lg py-4 flex items-center justify-center space-x-2 ${isLoadingPayment ? 'opacity-70 cursor-not-allowed' : ''
                                            }`}
                                    >
                                        {isLoadingPayment ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-maroon-900 border-t-transparent rounded-full animate-spin" />
                                                <span>Preparing Payment...</span>
                                            </>
                                        ) : (
                                            <>
                                                <CreditCard size={18} />
                                                <span>Continue to Payment</span>
                                            </>
                                        )}
                                    </motion.button>
                                </form>
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl font-display font-bold text-cream-50 mb-6">
                                    Complete Payment
                                </h2>

                                {clientSecret && (
                                    <Elements
                                        stripe={getStripe()}
                                        options={{
                                            clientSecret,
                                            appearance: stripeAppearance,
                                        }}
                                    >
                                        <PaymentForm
                                            formData={formData}
                                            orderData={orderData}
                                            onSuccess={handlePaymentSuccess}
                                            onBack={() => setStep(1)}
                                        />
                                    </Elements>
                                )}
                            </>
                        )}
                    </motion.div>

                    {/* Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="lg:sticky lg:top-28 h-fit"
                    >
                        <div className="glass-card p-8">
                            <h2 className="text-2xl font-display font-bold text-cream-50 mb-6">
                                Order Summary
                            </h2>

                            {/* Cart Items */}
                            <div className="space-y-4 mb-6">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-cream-50 truncate">
                                                {item.name}
                                            </h4>
                                            <p className="text-cream-200/60 text-sm">
                                                Qty: {item.quantity}
                                            </p>
                                        </div>
                                        <span className="text-gold-400 font-bold">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Price Breakdown */}
                            <div className="border-t border-gold-500/20 pt-4 space-y-3">
                                <div className="flex justify-between text-cream-200">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-cream-200">
                                    <span>Delivery</span>
                                    <span className={deliveryFee === 0 ? 'text-green-400' : ''}>
                                        {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="border-t border-gold-500/20 pt-3 flex justify-between">
                                    <span className="text-lg font-bold text-cream-50">Total</span>
                                    <span className="text-2xl font-bold text-gold-400">
                                        ${total.toFixed(2)} AUD
                                    </span>
                                </div>
                            </div>

                            {/* Delivery Info */}
                            <div className="mt-6 p-4 bg-gold-500/10 rounded-xl border border-gold-500/20">
                                <h4 className="font-medium text-gold-400 mb-2">🚚 Delivery Info</h4>
                                <ul className="text-cream-200/80 text-sm space-y-1">
                                    <li>• Delivery within Melbourne metro area</li>
                                    <li>• Estimated time: 45-60 minutes</li>
                                    <li>• Free delivery on orders over $169</li>
                                </ul>
                            </div>

                            {/* Test Card Info */}
                            <div className="mt-4 p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                                <h4 className="font-medium text-blue-400 mb-2">🧪 Test Mode</h4>
                                <p className="text-cream-200/80 text-sm">
                                    Use card: <span className="text-blue-300 font-mono">4242 4242 4242 4242</span>
                                </p>
                                <p className="text-cream-200/60 text-xs mt-1">
                                    Any future date, any CVC
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutForm;
