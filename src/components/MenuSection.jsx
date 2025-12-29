import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

// Menu items data
const menuItems = [
    {
        id: 1,
        name: 'Saffron Biryani',
        description: 'Aromatic, premium spices, authentic Hyderabadi flavor',
        price: 45,
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
        category: 'main',
        rating: 4.9,
        isPopular: true,
    },
    {
        id: 2,
        name: 'Chicken Curry',
        description: 'Juicy, perfectly spiced, slow-cooked with care',
        price: 35,
        image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop',
        category: 'main',
        rating: 4.8,
    },
    {
        id: 3,
        name: 'Raita & Salad',
        description: 'Fresh, crisp, and flavorful accompaniment',
        price: 15,
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400&h=300&fit=crop',
        category: 'sides',
        rating: 4.7,
    },
    {
        id: 4,
        name: 'Celebration Cake',
        description: 'Sweet, festive, premium dessert for New Year',
        price: 55,
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
        category: 'dessert',
        rating: 4.9,
        isNew: true,
    },
    {
        id: 5,
        name: 'Family Pack (Serves 4)',
        description: 'Complete feast with Biryani, Curry, Sides & Cake',
        price: 169,
        image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop',
        category: 'special',
        rating: 5.0,
        isPopular: true,
        isBestValue: true,
    },
    {
        id: 6,
        name: 'Mutton Biryani',
        description: 'Tender mutton, aromatic rice, traditional spices',
        price: 55,
        image: 'https://images.unsplash.com/photo-1642821373181-696a54913e93?w=400&h=300&fit=crop',
        category: 'main',
        rating: 4.9,
    },
];

const ProductCard = ({ item }) => {
    const { addToCart, cartItems, updateQuantity } = useCart();
    const cartItem = cartItems.find((i) => i.id === item.id);
    const quantity = cartItem?.quantity || 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="product-card relative"
        >
            {/* Badges */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {item.isPopular && (
                    <span className="bg-gold-500 text-maroon-900 text-xs font-bold px-3 py-1 rounded-full">
                        🔥 Popular
                    </span>
                )}
                {item.isNew && (
                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        ✨ New
                    </span>
                )}
                {item.isBestValue && (
                    <span className="bg-gradient-to-r from-gold-500 to-gold-400 text-maroon-900 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                        🎉 Best Value
                    </span>
                )}
            </div>

            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/80 to-transparent" />

                {/* Rating */}
                <div className="absolute bottom-4 right-4 flex items-center space-x-1 bg-maroon-900/80 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Star size={14} className="text-gold-400 fill-gold-400" />
                    <span className="text-sm text-cream-100 font-medium">{item.rating}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-xl font-display font-bold text-cream-50 mb-2">
                    {item.name}
                </h3>
                <p className="text-cream-200/70 text-sm mb-4 line-clamp-2">
                    {item.description}
                </p>

                <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gold-400">
                        ${item.price}
                    </span>

                    {quantity === 0 ? (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => addToCart(item)}
                            className="bg-gold-500 text-maroon-900 font-semibold px-6 py-2 rounded-full hover:bg-gold-400 transition-colors flex items-center space-x-2"
                        >
                            <Plus size={18} />
                            <span>Add</span>
                        </motion.button>
                    ) : (
                        <div className="flex items-center space-x-3 bg-gold-500/20 rounded-full px-2 py-1">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, quantity - 1)}
                                className="w-8 h-8 rounded-full bg-gold-500 text-maroon-900 flex items-center justify-center hover:bg-gold-400 transition-colors"
                            >
                                <Minus size={16} />
                            </motion.button>
                            <span className="text-cream-50 font-bold w-6 text-center">
                                {quantity}
                            </span>
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => updateQuantity(item.id, quantity + 1)}
                                className="w-8 h-8 rounded-full bg-gold-500 text-maroon-900 flex items-center justify-center hover:bg-gold-400 transition-colors"
                            >
                                <Plus size={16} />
                            </motion.button>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

const MenuSection = () => {
    return (
        <section id="menu" className="py-20 bg-pattern">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-gold-400 font-medium tracking-widest uppercase text-sm mb-4 block">
                        Our Delicious Offerings
                    </span>
                    <h2 className="section-title">New Year Feast Menu</h2>
                    <div className="gold-divider mt-4 mb-6" />
                    <p className="text-cream-200/80 max-w-2xl mx-auto text-lg">
                        Celebrate the New Year with our authentic Hyderabadi cuisine,
                        prepared with love and delivered fresh to your doorstep in Melbourne.
                    </p>
                </motion.div>

                {/* Special Offer Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mb-12 glass-card p-6 md:p-8 border-gold-500/30"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center space-x-4">
                            <div className="text-4xl">🎊</div>
                            <div>
                                <h3 className="text-xl font-display font-bold text-gold-400">
                                    New Year Special Offer!
                                </h3>
                                <p className="text-cream-200">
                                    Order Family Pack & get <span className="text-gold-500 font-bold">FREE Delivery</span>
                                </p>
                            </div>
                        </div>
                        <div className="text-center md:text-right">
                            <span className="text-3xl font-bold text-gold-500">SAVE $15</span>
                            <p className="text-cream-200/60 text-sm">Limited time offer</p>
                        </div>
                    </div>
                </motion.div>

                {/* Menu Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menuItems.map((item) => (
                        <ProductCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MenuSection;
