import emailjs from '@emailjs/browser';

// EmailJS Configuration - Replace with your actual credentials
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // e.g., 'service_xxxxxxx'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // e.g., 'template_xxxxxxx'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // e.g., 'xxxxxxxxxxxxxxx'

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

/**
 * Send order confirmation email to customer
 * @param {Object} orderData - Order details
 * @returns {Promise} - EmailJS response
 */
export const sendOrderConfirmationEmail = async (orderData) => {
    const templateParams = {
        to_name: orderData.customerName,
        to_email: orderData.email,
        order_id: orderData.orderId,
        order_date: new Date().toLocaleDateString('en-AU', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }),
        items_list: orderData.items
            .map((item) => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
            .join('\n'),
        subtotal: `$${orderData.subtotal.toFixed(2)}`,
        delivery_fee: `$${orderData.deliveryFee.toFixed(2)}`,
        total_amount: `$${orderData.total.toFixed(2)}`,
        delivery_address: orderData.address,
        phone_number: orderData.phone,
        special_instructions: orderData.specialInstructions || 'None',
        payment_status: 'Payment Successful ✓',
    };

    try {
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams
        );
        console.log('Email sent successfully:', response);
        return response;
    } catch (error) {
        console.error('Failed to send email:', error);
        throw error;
    }
};

/**
 * Send notification email to restaurant owner
 * @param {Object} orderData - Order details
 */
export const sendOwnerNotificationEmail = async (orderData) => {
    const templateParams = {
        to_name: 'Dawat by Taskerway',
        to_email: 'owner@dawat.com', // Replace with actual owner email
        order_id: orderData.orderId,
        customer_name: orderData.customerName,
        customer_email: orderData.email,
        customer_phone: orderData.phone,
        delivery_address: orderData.address,
        order_date: new Date().toLocaleDateString('en-AU'),
        order_time: new Date().toLocaleTimeString('en-AU'),
        items_list: orderData.items
            .map((item) => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
            .join('\n'),
        total_amount: `$${orderData.total.toFixed(2)}`,
        special_instructions: orderData.specialInstructions || 'None',
    };

    try {
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams
        );
        console.log('Owner notification sent:', response);
        return response;
    } catch (error) {
        console.error('Failed to send owner notification:', error);
        throw error;
    }
};

export default { sendOrderConfirmationEmail, sendOwnerNotificationEmail };
