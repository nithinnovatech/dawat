import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Mail, Home, Download } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const OrderSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const orderData = location.state?.orderData;

    useEffect(() => {
        // If no order data, redirect to home
        if (!orderData) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [orderData, navigate]);

    if (!orderData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-cream-200 mb-4">No order found. Redirecting...</p>
                    <Link to="/" className="btn-gold">Go to Home</Link>
                </div>
            </div>
        );
    }

    // Generate and download receipt
    const downloadReceipt = () => {
        const itemsList = orderData.items
            .map((item) => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
            .join('\n        ');

        const receiptContent = `
════════════════════════════════════════════
           DAWAT BY TASKERWAY
              ORDER RECEIPT
════════════════════════════════════════════

Order ID: ${orderData.orderId}
Date: ${new Date().toLocaleDateString('en-AU', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })}

────────────────────────────────────────────
CUSTOMER DETAILS
────────────────────────────────────────────
Name: ${orderData.customerName}
Email: ${orderData.email}
Phone: ${orderData.phone}

────────────────────────────────────────────
DELIVERY ADDRESS
────────────────────────────────────────────
${orderData.address}

────────────────────────────────────────────
ORDER ITEMS
────────────────────────────────────────────
        ${itemsList}

────────────────────────────────────────────
PAYMENT SUMMARY
────────────────────────────────────────────
Subtotal:     $${orderData.subtotal.toFixed(2)}
Delivery:     ${orderData.deliveryFee === 0 ? 'FREE' : '$' + orderData.deliveryFee.toFixed(2)}
────────────────────────────────────────────
TOTAL:        $${orderData.total.toFixed(2)} AUD
────────────────────────────────────────────

Payment Status: ✓ PAID
${orderData.specialInstructions ? '\nSpecial Instructions: ' + orderData.specialInstructions : ''}

════════════════════════════════════════════
     Thank you for ordering with us!
    
  Questions? Call: +61 400 000 000
  Email: support@dawat.com.au
════════════════════════════════════════════
        `;

        // Create blob and download
        const blob = new Blob([receiptContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Dawat-Receipt-${orderData.orderId}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const steps = [
        { icon: CheckCircle, label: 'Order Confirmed', status: 'complete' },
        { icon: Package, label: 'Preparing', status: 'current' },
        { icon: Truck, label: 'On the Way', status: 'pending' },
        { icon: Home, label: 'Delivered', status: 'pending' },
    ];

    return (
        <div className="min-h-screen">
            <Navbar />

            <div className="pt-24 pb-16 bg-pattern">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Success Animation */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', duration: 0.6 }}
                        className="text-center mb-8"
                    >
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <CheckCircle size={48} className="text-green-400" />
                            </motion.div>
                        </div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-4xl font-display font-bold text-cream-50 mb-4"
                        >
                            Order Confirmed! 🎉
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-cream-200/80 text-lg"
                        >
                            Thank you for your order, {orderData.customerName}!
                        </motion.p>
                    </motion.div>

                    {/* Order Details Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="glass-card p-8 mb-8"
                    >
                        <div className="flex items-center justify-between mb-6 pb-6 border-b border-gold-500/20">
                            <div>
                                <p className="text-cream-200/60 text-sm">Order ID</p>
                                <p className="text-gold-400 font-bold text-lg">{orderData.orderId}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-cream-200/60 text-sm">Total Amount</p>
                                <p className="text-gold-400 font-bold text-2xl">
                                    ${orderData.total.toFixed(2)} AUD
                                </p>
                            </div>
                        </div>

                        {/* Order Progress */}
                        <div className="mb-8">
                            <h3 className="font-display font-bold text-cream-50 mb-4">
                                Order Status
                            </h3>
                            <div className="flex items-center justify-between">
                                {steps.map((step, index) => (
                                    <div key={step.label} className="flex flex-col items-center flex-1">
                                        <div
                                            className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${step.status === 'complete'
                                                ? 'bg-green-500 text-white'
                                                : step.status === 'current'
                                                    ? 'bg-gold-500 text-maroon-900 animate-pulse'
                                                    : 'bg-maroon-700 text-cream-200/40'
                                                }`}
                                        >
                                            <step.icon size={20} />
                                        </div>
                                        <span
                                            className={`text-xs text-center ${step.status === 'complete' || step.status === 'current'
                                                ? 'text-cream-100'
                                                : 'text-cream-200/40'
                                                }`}
                                        >
                                            {step.label}
                                        </span>
                                        {index < steps.length - 1 && (
                                            <div
                                                className={`hidden sm:block absolute w-full h-0.5 left-1/2 -translate-x-1/2 top-5 -z-10 ${step.status === 'complete' ? 'bg-green-500' : 'bg-maroon-700'
                                                    }`}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="mb-6">
                            <h3 className="font-display font-bold text-cream-50 mb-4">
                                Order Items
                            </h3>
                            <div className="space-y-3">
                                {orderData.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center justify-between py-2 border-b border-gold-500/10"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-12 h-12 rounded-lg object-cover"
                                            />
                                            <div>
                                                <p className="text-cream-50 font-medium">{item.name}</p>
                                                <p className="text-cream-200/60 text-sm">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <span className="text-gold-400 font-medium">
                                            ${(item.price * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Delivery Address */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gold-500/20">
                            <div>
                                <h4 className="text-cream-200/60 text-sm mb-2">Delivery Address</h4>
                                <p className="text-cream-50">{orderData.address}</p>
                            </div>
                            <div>
                                <h4 className="text-cream-200/60 text-sm mb-2">Contact</h4>
                                <p className="text-cream-50">{orderData.email}</p>
                                <p className="text-cream-50">{orderData.phone}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Email Confirmation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="glass-card p-6 flex items-center space-x-4 mb-8"
                    >
                        <div className="w-12 h-12 rounded-full bg-gold-500/20 flex items-center justify-center flex-shrink-0">
                            <Mail className="text-gold-500" size={24} />
                        </div>
                        <div>
                            <h4 className="font-display font-bold text-cream-50">
                                Confirmation Email Sent
                            </h4>
                            <p className="text-cream-200/70 text-sm">
                                We've sent order details to {orderData.email}
                            </p>
                        </div>
                    </motion.div>

                    {/* Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link to="/" className="btn-gold text-center">
                            <Home size={18} className="inline mr-2" />
                            Back to Home
                        </Link>
                        <button
                            onClick={downloadReceipt}
                            className="btn-gold-outline flex items-center justify-center space-x-2"
                        >
                            <Download size={18} />
                            <span>Download Receipt</span>
                        </button>
                    </motion.div>

                    {/* Support Info */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="text-center text-cream-200/50 text-sm mt-8"
                    >
                        Questions about your order? Call us at{' '}
                        <a href="tel:+61400000000" className="text-gold-400 hover:underline">
                            +61 400 000 000
                        </a>
                    </motion.p>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default OrderSuccess;
