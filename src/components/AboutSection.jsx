import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Heart, Truck } from 'lucide-react';

const AboutSection = () => {
    const features = [
        {
            icon: Award,
            title: 'Premium Quality',
            description: 'Only the finest ingredients, authentic spices imported from India.',
        },
        {
            icon: Users,
            title: 'Family Recipes',
            description: 'Traditional Hyderabadi recipes passed down through generations.',
        },
        {
            icon: Heart,
            title: 'Made with Love',
            description: 'Every dish prepared fresh with care and attention to detail.',
        },
        {
            icon: Truck,
            title: 'Fast Delivery',
            description: 'Hot and fresh delivery across Melbourne metro within 45-60 mins.',
        },
    ];

    return (
        <section id="about" className="py-20 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-pattern opacity-30" />

            {/* Decorative Elements */}
            <div className="absolute top-20 right-10 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-40 h-40 bg-gold-500/5 rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-gold-400 font-medium tracking-widest uppercase text-sm mb-4 block">
                        Our Story
                    </span>
                    <h2 className="section-title">About Dawat</h2>
                    <div className="gold-divider mt-4 mb-6" />
                </motion.div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-3xl font-display font-bold text-cream-50 mb-6">
                            Authentic Hyderabadi Flavors in{' '}
                            <span className="text-gradient-gold">Melbourne</span>
                        </h3>
                        <p className="text-cream-200/80 mb-6 leading-relaxed">
                            Welcome to <strong className="text-gold-400">Dawat by Taskerway</strong>,
                            where we bring the rich, aromatic flavors of Hyderabadi cuisine to your
                            doorstep in Melbourne, Australia. Our name "Dawat" means an invitation
                            to feast, and that's exactly what we offer – an invitation to experience
                            authentic Indian hospitality.
                        </p>
                        <p className="text-cream-200/80 mb-6 leading-relaxed">
                            Every dish we prepare is a celebration of tradition, made with premium
                            ingredients, hand-ground spices, and recipes perfected over generations.
                            Our signature Saffron Biryani and slow-cooked curries have won the hearts
                            of food lovers across Melbourne.
                        </p>
                        <p className="text-cream-200/80 leading-relaxed">
                            This New Year, join us in celebrating with our special Family Feast
                            packages – designed to bring families together over delicious food and
                            create lasting memories.
                        </p>
                    </motion.div>

                    {/* Image/Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="glass-card p-8 text-center">
                            <div className="text-6xl mb-4">🍛</div>
                            <h4 className="text-2xl font-display font-bold text-gold-400 mb-2">
                                New Year Special
                            </h4>
                            <p className="text-4xl font-bold text-cream-50 mb-4">
                                $169
                            </p>
                            <p className="text-cream-200/80 mb-4">
                                Family Pack - Serves 4 People
                            </p>
                            <ul className="text-cream-200/70 text-sm space-y-2 mb-6">
                                <li>✓ Saffron Biryani</li>
                                <li>✓ Chicken Curry</li>
                                <li>✓ Raita & Salad</li>
                                <li>✓ Celebration Cake</li>
                                <li className="text-gold-400 font-medium">✓ FREE Delivery</li>
                            </ul>
                            <a href="#menu" className="btn-gold">
                                Order Now
                            </a>
                        </div>

                        {/* Decorative Badge */}
                        <div className="absolute -top-4 -right-4 bg-gold-500 text-maroon-900 font-bold px-4 py-2 rounded-full text-sm transform rotate-12 shadow-lg">
                            🎉 2025 Special!
                        </div>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card p-6 text-center group hover:border-gold-500/40 transition-all duration-300"
                        >
                            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold-500/20 flex items-center justify-center group-hover:bg-gold-500 transition-colors duration-300">
                                <feature.icon
                                    size={28}
                                    className="text-gold-500 group-hover:text-maroon-900 transition-colors duration-300"
                                />
                            </div>
                            <h4 className="text-lg font-display font-bold text-cream-50 mb-2">
                                {feature.title}
                            </h4>
                            <p className="text-cream-200/70 text-sm">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
