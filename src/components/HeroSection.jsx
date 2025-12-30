import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

// High-quality banner images from Unsplash
const heroImages = {
    biryani: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1920&q=80',
    feast: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1920&q=80',
    kebab: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=1920&q=80',
};

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            image: heroImages.biryani,
            title: 'New Year Family Feast',
            subtitle: 'Celebrate 2025 with authentic Hyderabadi flavors',
            cta: 'Order Now',
        },
        {
            image: heroImages.feast,
            title: 'Premium New Year Pack',
            subtitle: '$169 - Serves 4 People',
            cta: 'Get Family Pack',
        },
        {
            image: heroImages.kebab,
            title: 'Authentic Indian Cuisine',
            subtitle: 'Made with love, delivered to your door',
            cta: 'View Menu',
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const scrollToMenu = () => {
        document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative h-screen min-h-[700px] overflow-hidden">
            {/* Background Slides */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-maroon-950/90 via-maroon-900/70 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-maroon-950/80 via-transparent to-maroon-950/40" />
                </motion.div>
            </AnimatePresence>

            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 opacity-30">
                <svg viewBox="0 0 100 100" className="w-full h-full text-gold-500">
                    <path
                        fill="currentColor"
                        d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z"
                    />
                </svg>
            </div>
            <div className="absolute bottom-20 right-20 w-16 h-16 opacity-20 animate-float">
                <svg viewBox="0 0 100 100" className="w-full h-full text-gold-400">
                    <path
                        fill="currentColor"
                        d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z"
                    />
                </svg>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <div className="max-w-2xl">
                    {/* New Year Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="inline-flex items-center space-x-2 bg-gold-500/20 backdrop-blur-sm border border-gold-500/40 rounded-full px-4 py-2 mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-gold-400" />
                        <span className="text-gold-400 font-medium text-sm">
                            🎉 New Year 2025 Special Offers
                        </span>
                    </motion.div>

                    {/* Main Title */}
                    <AnimatePresence mode="wait">
                        <motion.h1
                            key={`title-${currentSlide}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.5 }}
                            className="text-5xl md:text-7xl font-display font-bold text-cream-50 mb-4 leading-tight"
                        >
                            {slides[currentSlide].title.split(' ').map((word, i) => (
                                <span
                                    key={i}
                                    className={i === 2 ? 'text-gradient-gold' : ''}
                                >
                                    {word}{' '}
                                </span>
                            ))}
                        </motion.h1>
                    </AnimatePresence>

                    {/* Subtitle */}
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={`subtitle-${currentSlide}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-xl md:text-2xl text-cream-200 mb-8"
                        >
                            {slides[currentSlide].subtitle}
                        </motion.p>
                    </AnimatePresence>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-wrap gap-4"
                    >
                        <button
                            onClick={scrollToMenu}
                            className="btn-gold text-lg px-10 py-4"
                        >
                            {slides[currentSlide].cta}
                        </button>
                        <a
                            href="#about"
                            className="btn-gold-outline text-lg px-10 py-4"
                        >
                            Learn More
                        </a>
                    </motion.div>

                    {/* Features */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-wrap gap-6 mt-12"
                    >
                        {[
                            '🍛 Authentic Hyderabadi',
                            '🚚 Australia-wide Delivery',
                            '⭐ Premium Quality',
                        ].map((feature, i) => (
                            <span
                                key={i}
                                className="text-cream-200/80 text-sm flex items-center"
                            >
                                {feature}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute bottom-1/2 translate-y-1/2 left-4 right-4 flex justify-between z-20 pointer-events-none">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={prevSlide}
                    className="p-3 bg-maroon-900/60 backdrop-blur-sm border border-gold-500/30 rounded-full text-gold-400 hover:bg-gold-500 hover:text-maroon-900 transition-all duration-300 pointer-events-auto"
                >
                    <ChevronLeft size={24} />
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={nextSlide}
                    className="p-3 bg-maroon-900/60 backdrop-blur-sm border border-gold-500/30 rounded-full text-gold-400 hover:bg-gold-500 hover:text-maroon-900 transition-all duration-300 pointer-events-auto"
                >
                    <ChevronRight size={24} />
                </motion.button>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                            ? 'bg-gold-500 w-8'
                            : 'bg-cream-200/40 hover:bg-cream-200/60'
                            }`}
                    />
                ))}
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-8 right-8 hidden md:block"
            >
                <div className="flex flex-col items-center text-cream-200/60">
                    <span className="text-xs mb-2 rotate-90 origin-center">Scroll</span>
                    <div className="w-px h-12 bg-gradient-to-b from-gold-500/60 to-transparent" />
                </div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
