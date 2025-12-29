import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const navigate = useNavigate();
    const {
        cartItems,
        isCartOpen,
        setIsCartOpen,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        clearCart,
    } = useCart();

    const subtotal = getCartTotal();
    const deliveryFee = subtotal >= 169 ? 0 : 15;
    const total = subtotal + deliveryFee;

    const handleCheckout = () => {
        setIsCartOpen(false);
        navigate('/checkout');
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Cart Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-maroon-800 to-maroon-900 z-50 shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gold-500/20">
                            <div className="flex items-center space-x-3">
                                <ShoppingBag className="text-gold-500" size={24} />
                                <h2 className="text-xl font-display font-bold text-cream-50">
                                    Your Cart
                                </h2>
                                <span className="bg-gold-500 text-maroon-900 text-xs font-bold px-2 py-1 rounded-full">
                                    {cartItems.length}
                                </span>
                            </div>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 text-cream-200 hover:text-gold-400 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {cartItems.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-center justify-center h-full text-center"
                                >
                                    <ShoppingBag size={64} className="text-gold-500/30 mb-4" />
                                    <h3 className="text-xl font-display text-cream-100 mb-2">
                                        Your cart is empty
                                    </h3>
                                    <p className="text-cream-200/60 mb-6">
                                        Add some delicious items to get started!
                                    </p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="btn-gold-outline"
                                    >
                                        Browse Menu
                                    </button>
                                </motion.div>
                            ) : (
                                <div className="space-y-4">
                                    {cartItems.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            className="glass-card p-4 flex gap-4"
                                        >
                                            {/* Item Image */}
                                            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            {/* Item Details */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between">
                                                    <h4 className="font-display font-bold text-cream-50 truncate">
                                                        {item.name}
                                                    </h4>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-cream-200/50 hover:text-red-400 transition-colors p-1"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                                <p className="text-gold-400 font-bold mt-1">
                                                    ${item.price}
                                                </p>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center justify-between mt-3">
                                                    <div className="flex items-center space-x-2 bg-maroon-700/50 rounded-full px-2 py-1">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-500 flex items-center justify-center hover:bg-gold-500 hover:text-maroon-900 transition-colors"
                                                        >
                                                            <Minus size={14} />
                                                        </button>
                                                        <span className="text-cream-50 font-medium w-6 text-center">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-500 flex items-center justify-center hover:bg-gold-500 hover:text-maroon-900 transition-colors"
                                                        >
                                                            <Plus size={14} />
                                                        </button>
                                                    </div>
                                                    <span className="text-cream-100 font-bold">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {/* Clear Cart Button */}
                                    {cartItems.length > 0 && (
                                        <button
                                            onClick={clearCart}
                                            className="w-full text-center text-cream-200/50 hover:text-red-400 transition-colors text-sm py-2"
                                        >
                                            Clear Cart
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-6 border-t border-gold-500/20 bg-maroon-900/80">
                                {/* Price Summary */}
                                <div className="space-y-3 mb-6">
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
                                    {deliveryFee > 0 && subtotal < 169 && (
                                        <p className="text-xs text-gold-400">
                                            Add ${(169 - subtotal).toFixed(2)} more for free delivery!
                                        </p>
                                    )}
                                    <div className="border-t border-gold-500/20 pt-3 flex justify-between">
                                        <span className="text-lg font-bold text-cream-50">Total</span>
                                        <span className="text-2xl font-bold text-gold-400">
                                            ${total.toFixed(2)}
                                        </span>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleCheckout}
                                    className="w-full btn-gold text-lg py-4 flex items-center justify-center space-x-2"
                                >
                                    <span>Proceed to Checkout</span>
                                    <ArrowRight size={20} />
                                </motion.button>

                                {/* Security Note */}
                                <p className="text-center text-cream-200/50 text-xs mt-4">
                                    🔒 Secure checkout powered by Stripe
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Cart;
