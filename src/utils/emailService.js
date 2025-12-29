import emailjs from '@emailjs/browser';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_kmjkmdk';
const EMAILJS_TEMPLATE_ID = 'template_y9losf9';
const EMAILJS_PUBLIC_KEY = 'GBiYow4zVtUomAQXm';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

/**
 * Send order confirmation email to customer
 * @param {Object} orderData - Order details
 * @returns {Promise} - EmailJS response
 */
export const sendOrderConfirmationEmail = async (orderData) => {
    const itemsList = orderData.items
        .map((item) => `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
        .join('\n');

    // Using only the most basic EmailJS parameters
    const templateParams = {
        name: orderData.customerName,
        email: orderData.email,
        title: `Order Confirmed - ${orderData.orderId}`,
        message: `Thank you for your order!

ORDER ID: ${orderData.orderId}
DATE: ${new Date().toLocaleDateString('en-AU')}

ITEMS:
${itemsList}

SUBTOTAL: $${orderData.subtotal.toFixed(2)}
DELIVERY: $${orderData.deliveryFee.toFixed(2)}
TOTAL: $${orderData.total.toFixed(2)}

DELIVERY ADDRESS:
${orderData.address}
Phone: ${orderData.phone}
${orderData.specialInstructions ? 'Instructions: ' + orderData.specialInstructions : ''}

Payment Status: PAID ✓

Thank you for ordering from Dawat by Taskerway!`
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
        // Don't throw - just log the error
        return null;
    }
};

/**
 * Send notification email to restaurant owner
 * @param {Object} orderData - Order details
 */
export const sendOwnerNotificationEmail = async (orderData) => {
    const itemsList = orderData.items
        .map((item) => `• ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`)
        .join('\n');

    const templateParams = {
        name: 'Dawat by Taskerway',
        email: 'owner@dawat.com',
        title: `New Order - ${orderData.orderId}`,
        message: `New order received!

ORDER ID: ${orderData.orderId}
DATE: ${new Date().toLocaleDateString('en-AU')} ${new Date().toLocaleTimeString('en-AU')}

CUSTOMER:
${orderData.customerName}
${orderData.email}
${orderData.phone}

DELIVERY ADDRESS:
${orderData.address}

ITEMS:
${itemsList}

TOTAL: $${orderData.total.toFixed(2)}
${orderData.specialInstructions ? 'Instructions: ' + orderData.specialInstructions : ''}`
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
        return null;
    }
};

export default { sendOrderConfirmationEmail, sendOwnerNotificationEmail };
