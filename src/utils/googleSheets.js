/**
 * Google Sheets Integration for Order Management
 * 
 * This uses Google Apps Script Web App to receive order data
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Paste this code in the Apps Script editor:
 * 
 * function doPost(e) {
 *   var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *   var data = JSON.parse(e.postData.contents);
 *   
 *   sheet.appendRow([
 *     data.orderId,
 *     data.orderDate,
 *     data.customerName,
 *     data.email,
 *     data.phone,
 *     data.address,
 *     data.items,
 *     data.subtotal,
 *     data.deliveryFee,
 *     data.total,
 *     data.paymentStatus,
 *     data.specialInstructions
 *   ]);
 *   
 *   return ContentService.createTextOutput(JSON.stringify({success: true}))
 *     .setMimeType(ContentService.MimeType.JSON);
 * }
 * 
 * 4. Deploy as Web App (Execute as: Me, Access: Anyone)
 * 5. Copy the Web App URL below
 */

// Replace with your Google Apps Script Web App URL
const GOOGLE_SHEETS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbxKNqBWWQwrX2_UwlOkU5rndxlTV4eZtVrw8Z-uk7Elqcpdij2gqyuub2lmYtePG_YxIA/exec';

/**
 * Generate unique order ID
 * @returns {string} - Unique order ID
 */
export const generateOrderId = () => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `DWT-${timestamp}-${random}`;
};

/**
 * Save order to Google Sheets
 * @param {Object} orderData - Complete order data
 * @returns {Promise} - Response from Google Sheets
 */
export const saveOrderToGoogleSheets = async (orderData) => {
    const payload = {
        orderId: orderData.orderId,
        orderDate: new Date().toLocaleString('en-AU', {
            timeZone: 'Australia/Melbourne',
            dateStyle: 'full',
            timeStyle: 'short',
        }),
        customerName: orderData.customerName,
        email: orderData.email,
        phone: orderData.phone,
        address: orderData.address,
        items: orderData.items
            .map((item) => `${item.name} x${item.quantity}`)
            .join(', '),
        subtotal: orderData.subtotal.toFixed(2),
        deliveryFee: orderData.deliveryFee.toFixed(2),
        total: orderData.total.toFixed(2),
        paymentStatus: orderData.paymentStatus || 'Pending',
        specialInstructions: orderData.specialInstructions || '-',
    };

    try {
        const response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors', // Required for Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        console.log('Order saved to Google Sheets');
        return { success: true };
    } catch (error) {
        console.error('Failed to save order to Google Sheets:', error);
        throw error;
    }
};

/**
 * Alternative: Save order to localStorage as backup
 * @param {Object} orderData - Order data
 */
export const saveOrderLocally = (orderData) => {
    const orders = JSON.parse(localStorage.getItem('dawat-orders') || '[]');
    orders.push({
        ...orderData,
        savedAt: new Date().toISOString(),
    });
    localStorage.setItem('dawat-orders', JSON.stringify(orders));
};

export default { generateOrderId, saveOrderToGoogleSheets, saveOrderLocally };
