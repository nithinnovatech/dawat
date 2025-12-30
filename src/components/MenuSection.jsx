import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

// New Year Packs - Only Three Packs
const newYearPacks = [
    {
        id: 101,
        name: '🍽️ Single Pack',
        description: 'Perfect for 1 person - Biryani, Curry, Raita & Dessert',
        price: 59,
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
        category: 'pack',
        rating: 4.9,
        serves: '1 Person',
    },
    {
        id: 102,
        name: '👨‍👩‍👧‍👦 Family Pack',
        description: 'Serves 4 - Complete feast with Biryani, Curry, Sides & Cake',
        price: 169,
        image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop',
        category: 'pack',
        rating: 5.0,
        serves: '4 People',
        isPopular: true,
        isBestValue: true,
    },
    {
        id: 103,
        name: '🎉 Jumbo Pack',
        description: 'Serves 7-8 - Grand celebration feast for large gatherings',
        price: 299,
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
        category: 'pack',
        rating: 5.0,
        serves: '7-8 People',
        isPremium: true,
    },
];

const ProductCard = ({ item }) => {
    const handleOrder = () => {
        const message = encodeURIComponent(`Hi Dawat! I would like to order the ${item.name} ($${item.price}).`);
        window.open(`https://wa.me/61405600849?text=${message}`, '_blank');
    };

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
                {item.isBestValue && (
                    <span className="bg-gradient-to-r from-gold-500 to-gold-400 text-maroon-900 text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                        🎉 Best Value
                    </span>
                )}
                {item.isPremium && (
                    <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                        👑 Premium
                    </span>
                )}
                {item.serves && (
                    <span className="bg-maroon-800/80 backdrop-blur-sm text-cream-100 text-xs font-medium px-3 py-1 rounded-full">
                        👥 {item.serves}
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

                <div className="flex items-center justify-between gap-4">
                    <span className="text-2xl font-bold text-gold-400">
                        ${item.price}
                    </span>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleOrder}
                        className="bg-green-500 text-white font-semibold px-4 py-2 rounded-full hover:bg-green-600 transition-colors flex items-center space-x-2 flex-1 justify-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        <span>WhatsApp</span>
                    </motion.button>
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
                        New Year 2025 Special
                    </span>
                    <h2 className="section-title">Choose Your Pack</h2>
                    <div className="gold-divider mt-4 mb-6" />
                    <p className="text-cream-200/80 max-w-2xl mx-auto text-lg">
                        Celebrate the New Year with our authentic Hyderabadi cuisine,
                        prepared with love and delivered fresh to your doorstep across Australia.
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

                {/* New Year Packs Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {newYearPacks.map((item) => (
                        <ProductCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MenuSection;
