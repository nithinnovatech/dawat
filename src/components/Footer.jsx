import React from 'react';
import { motion } from 'framer-motion';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Instagram,
    Facebook,
    Globe,
    Truck
} from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const australianStates = [
        'New South Wales',
        'Victoria',
        'Queensland',
        'Western Australia',
        'South Australia',
        'Tasmania',
        'Northern Territory',
        'ACT',
    ];

    return (
        <footer id="contact" className="bg-maroon-950 border-t border-gold-500/20">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-1"
                    >
                        <div className="mb-6">
                            <span className="text-4xl font-script text-gold-500">Dawat</span>
                            <span className="block text-sm text-cream-200/60 tracking-widest mt-1">
                                by Taskerway
                            </span>
                        </div>
                        <p className="text-cream-200/70 mb-6">
                            Authentic Hyderabadi cuisine from our cloud kitchen delivered with love
                            across Australia. Celebrate special moments with our premium dishes.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://instagram.com/dawatbytaskerway"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-500 hover:bg-gold-500 hover:text-maroon-900 transition-all duration-300"
                            >
                                <Instagram size={20} />
                            </a>
                            <a
                                href="https://facebook.com/dawatbytaskerway"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-500 hover:bg-gold-500 hover:text-maroon-900 transition-all duration-300"
                            >
                                <Facebook size={20} />
                            </a>
                        </div>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h3 className="text-lg font-display font-bold text-gold-400 mb-6">
                            Contact Us
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <Globe size={20} className="text-gold-500 mt-1 flex-shrink-0" />
                                <span className="text-cream-200/80">
                                    Cloud Kitchen<br />Australia
                                </span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone size={20} className="text-gold-500 flex-shrink-0" />
                                <a
                                    href="tel:+61405600849"
                                    className="text-cream-200/80 hover:text-gold-400 transition-colors"
                                >
                                    +61 405 600 849
                                </a>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail size={20} className="text-gold-500 flex-shrink-0" />
                                <a
                                    href="mailto:orders@dawat.com.au"
                                    className="text-cream-200/80 hover:text-gold-400 transition-colors"
                                >
                                    orders@dawat.com.au
                                </a>
                            </li>
                            <li className="flex items-start space-x-3">
                                <Clock size={20} className="text-gold-500 mt-1 flex-shrink-0" />
                                <div className="text-cream-200/80">
                                    <p>Mon - Sun: 11am - 10pm</p>
                                    <p className="text-sm text-cream-200/50">
                                        New Year's Eve: Extended hours
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Delivery Areas - Australia Wide */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="text-lg font-display font-bold text-gold-400 mb-6">
                            We Deliver Australia-Wide
                        </h3>
                        <div className="flex items-center space-x-2 mb-4">
                            <Truck size={20} className="text-gold-500" />
                            <span className="text-cream-200/80">Nationwide Shipping</span>
                        </div>
                        <ul className="grid grid-cols-2 gap-2">
                            {australianStates.map((state) => (
                                <li
                                    key={state}
                                    className="text-cream-200/70 text-sm hover:text-gold-400 transition-colors cursor-default"
                                >
                                    • {state}
                                </li>
                            ))}
                        </ul>
                        <p className="text-gold-400/80 text-sm mt-4">
                            🇦🇺 From our cloud kitchen to your doorstep!
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <h3 className="text-lg font-display font-bold text-gold-400 mb-6">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { name: 'Menu', href: '/#menu' },
                                { name: 'About Us', href: '/#about' },
                                { name: 'Contact', href: '/contact' },
                                { name: 'Privacy Policy', href: '/privacy' },
                                { name: 'Terms & Conditions', href: '/terms' },
                            ].map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-cream-200/70 hover:text-gold-400 transition-colors"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gold-500/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-cream-200/50 text-sm text-center md:text-left">
                            © {currentYear} Dawat by Taskerway. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-4">
                            <span className="text-cream-200/50 text-sm">
                                Made with ❤️ in Australia
                            </span>
                            <img
                                src="https://upload.wikimedia.org/wikipedia/en/b/b9/Flag_of_Australia.svg"
                                alt="Australia"
                                className="w-6 h-4 object-cover rounded"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
