import { loadStripe } from '@stripe/stripe-js';

// Get Stripe publishable key from environment variables
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

// Backend API URL - works for both local development and Vercel deployment
const API_URL = import.meta.env.PROD ? '/api' : 'http://localhost:3002/api';

// Initialize Stripe
let stripePromise = null;

export const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
    }
    return stripePromise;
};

/**
 * Create a Payment Intent via backend API
 * @param {Object} orderData - Order details including items and customer info
 * @returns {Promise} - Payment intent client secret
 */
export const createPaymentIntent = async (orderData) => {
    try {
        const response = await fetch(`${API_URL}/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: orderData.total,
                currency: 'aud',
                customerEmail: orderData.email,
                orderId: orderData.orderId,
                customerName: orderData.customerName,
                address: orderData.address,
                phone: orderData.phone,
                specialInstructions: orderData.specialInstructions || '',
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create payment intent');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating payment intent:', error);
        throw error;
    }
};

/**
 * Check payment status
 * @param {string} paymentIntentId - The payment intent ID
 * @returns {Promise} - Payment status
 */
export const checkPaymentStatus = async (paymentIntentId) => {
    try {
        const response = await fetch(`${API_URL}/payment-status/${paymentIntentId}`);

        if (!response.ok) {
            throw new Error('Failed to check payment status');
        }

        return await response.json();
    } catch (error) {
        console.error('Error checking payment status:', error);
        throw error;
    }
};

/**
 * Format price in AUD
 * @param {number} amount - Amount in dollars
 * @returns {string} - Formatted price string
 */
export const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-AU', {
        style: 'currency',
        currency: 'AUD',
    }).format(amount);
};

// Stripe Elements appearance configuration
export const stripeAppearance = {
    theme: 'night',
    variables: {
        colorPrimary: '#D4AF37',
        colorBackground: '#1a1a2e',
        colorText: '#f5f0e8',
        colorDanger: '#ef4444',
        fontFamily: 'system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '12px',
    },
    rules: {
        '.Input': {
            backgroundColor: 'rgba(212, 175, 55, 0.05)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            padding: '12px 16px',
        },
        '.Input:focus': {
            border: '1px solid rgba(212, 175, 55, 0.8)',
            boxShadow: '0 0 0 3px rgba(212, 175, 55, 0.1)',
        },
        '.Label': {
            color: '#d4c4a8',
            marginBottom: '8px',
        },
    },
};

export default { getStripe, createPaymentIntent, checkPaymentStatus, formatPrice, stripeAppearance };
