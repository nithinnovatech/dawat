import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    User,
    MessageSquare,
    Instagram,
    Facebook
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        // Build mailto link with prefilled data
        const subject = encodeURIComponent(formData.subject || 'Inquiry from Dawat Website');
        const body = encodeURIComponent(
            `Name: ${formData.name}\n` +
            `Email: ${formData.email}\n` +
            `Phone: ${formData.phone || 'Not provided'}\n\n` +
            `Message:\n${formData.message}`
        );

        const mailtoLink = `mailto:support@taskerway.com.au?subject=${subject}&body=${body}`;
        window.location.href = mailtoLink;
    };

    const handleWhatsApp = () => {
        const message = encodeURIComponent(
            `Hi Dawat by Taskerway!\n\n` +
            `Name: ${formData.name || 'Not provided'}\n` +
            `Email: ${formData.email || 'Not provided'}\n` +
            `Phone: ${formData.phone || 'Not provided'}\n` +
            `Subject: ${formData.subject || 'General Inquiry'}\n\n` +
            `Message:\n${formData.message || 'I would like to inquire about your services.'}`
        );
        const whatsappLink = `https://wa.me/61400000000?text=${message}`;
        window.open(whatsappLink, '_blank');
    };

    const contactInfo = [
        {
            icon: MapPin,
            title: 'Address',
            details: ['Melbourne, Victoria', 'Australia'],
            color: 'text-red-400'
        },
        {
            icon: Phone,
            title: 'Phone',
            details: ['+61 400 000 000'],
            link: 'tel:+61400000000',
            color: 'text-green-400'
        },
        {
            icon: Mail,
            title: 'Email',
            details: ['support@taskerway.com.au'],
            link: 'mailto:support@taskerway.com.au',
            color: 'text-blue-400'
        },
        {
            icon: Clock,
            title: 'Business Hours',
            details: ['Mon - Sun: 10:00 AM - 10:00 PM'],
            color: 'text-yellow-400'
        }
    ];

    return (
        <div className="min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="pt-24 pb-12 bg-pattern">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-cream-50 mb-4">
                            Get in <span className="text-gold-400">Touch</span>
                        </h1>
                        <p className="text-cream-200/80 text-lg max-w-2xl mx-auto">
                            Have questions about our menu or want to place a special order?
                            We'd love to hear from you!
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 bg-pattern">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="glass-card p-8"
                        >
                            <h2 className="text-2xl font-display font-bold text-cream-50 mb-6">
                                Send us a Message
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Name */}
                                <div>
                                    <label className="block text-cream-200 mb-2 text-sm font-medium">
                                        Your Name *
                                    </label>
                                    <div className="relative">
                                        <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/50" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className={`input-premium pl-12 ${errors.name ? 'border-red-500' : ''}`}
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-cream-200 mb-2 text-sm font-medium">
                                        Email Address *
                                    </label>
                                    <div className="relative">
                                        <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/50" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`input-premium pl-12 ${errors.email ? 'border-red-500' : ''}`}
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-cream-200 mb-2 text-sm font-medium">
                                        Phone Number (Optional)
                                    </label>
                                    <div className="relative">
                                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500/50" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="input-premium pl-12"
                                            placeholder="+61 400 000 000"
                                        />
                                    </div>
                                </div>

                                {/* Subject */}
                                <div>
                                    <label className="block text-cream-200 mb-2 text-sm font-medium">
                                        Subject (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className="input-premium"
                                        placeholder="How can we help?"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-cream-200 mb-2 text-sm font-medium">
                                        Message *
                                    </label>
                                    <div className="relative">
                                        <MessageSquare size={18} className="absolute left-4 top-4 text-gold-500/50" />
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className={`input-premium pl-12 ${errors.message ? 'border-red-500' : ''}`}
                                            placeholder="Your message..."
                                        />
                                    </div>
                                    {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                                </div>

                                {/* WhatsApp Button */}
                                <motion.button
                                    type="button"
                                    onClick={handleWhatsApp}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    <span>Send via WhatsApp</span>
                                </motion.button>
                            </form>
                        </motion.div>

                        {/* Contact Info & Map */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-8"
                        >
                            {/* Contact Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {contactInfo.map((item, index) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                        className="glass-card p-5 hover:border-gold-500/50 transition-all duration-300"
                                    >
                                        <div className={`w-10 h-10 rounded-lg bg-maroon-800 flex items-center justify-center mb-3 ${item.color}`}>
                                            <item.icon size={20} />
                                        </div>
                                        <h3 className="font-bold text-cream-50 mb-1">{item.title}</h3>
                                        {item.details.map((detail, i) => (
                                            item.link ? (
                                                <a
                                                    key={i}
                                                    href={item.link}
                                                    className="block text-cream-200/70 hover:text-gold-400 transition-colors text-sm"
                                                >
                                                    {detail}
                                                </a>
                                            ) : (
                                                <p key={i} className="text-cream-200/70 text-sm">{detail}</p>
                                            )
                                        ))}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Map */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="glass-card overflow-hidden"
                            >
                                <div className="p-4 border-b border-gold-500/20">
                                    <h3 className="font-display font-bold text-cream-50 flex items-center">
                                        <MapPin size={18} className="text-gold-500 mr-2" />
                                        Our Location
                                    </h3>
                                </div>
                                <div className="aspect-video">
                                    <iframe
                                        title="Dawat Location"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d403219.6689619671!2d144.5937!3d-37.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad646b5d2ba4df7%3A0x4045675218ccd90!2sMelbourne%20VIC!5e0!3m2!1sen!2sau!4v1"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                            </motion.div>

                            {/* Social Links */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="glass-card p-6"
                            >
                                <h3 className="font-display font-bold text-cream-50 mb-4">
                                    Follow Us
                                </h3>
                                <div className="flex space-x-4">
                                    <a
                                        href="https://wa.me/61400000000?text=Hi%20Dawat%20by%20Taskerway!%20I%20would%20like%20to%20inquire%20about%20your%20services."
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white hover:scale-110 transition-transform"
                                        title="Chat on WhatsApp"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="https://instagram.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white hover:scale-110 transition-transform"
                                    >
                                        <Instagram size={22} />
                                    </a>
                                    <a
                                        href="https://facebook.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white hover:scale-110 transition-transform"
                                    >
                                        <Facebook size={22} />
                                    </a>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;
