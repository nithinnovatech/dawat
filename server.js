import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import { config } from 'dotenv';

// Load environment variables
config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Middleware
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173', 'http://localhost:5174'],
    credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Stripe payment server is running' });
});

// Create Payment Intent
app.post('/api/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency = 'aud', customerEmail, orderId, customerName, address, phone, specialInstructions } = req.body;

        if (!amount || amount <= 0) {
            return res.status(400).json({ error: 'Invalid amount' });
        }

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency,
            receipt_email: customerEmail,
            metadata: {
                orderId: orderId || '',
                customerName: customerName || '',
                address: address || '',
                phone: phone || '',
                specialInstructions: specialInstructions || ''
            },
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({
            error: 'Failed to create payment intent',
            message: error.message
        });
    }
});

// Confirm payment status
app.get('/api/payment-status/:paymentIntentId', async (req, res) => {
    try {
        const { paymentIntentId } = req.params;
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        res.json({
            status: paymentIntent.status,
            amount: paymentIntent.amount / 100,
            currency: paymentIntent.currency
        });
    } catch (error) {
        console.error('Error retrieving payment status:', error);
        res.status(500).json({ error: 'Failed to retrieve payment status' });
    }
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`💳 Stripe Payment Server running on http://localhost:${PORT}`);
    console.log(`📋 API Endpoints:`);
    console.log(`   POST /api/create-payment-intent - Create payment intent`);
    console.log(`   GET  /api/payment-status/:id - Check payment status`);
    console.log(`   GET  /api/health - Health check`);
});
