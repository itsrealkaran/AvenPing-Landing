"use client"

import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar";
import Button from "@/components/ui/button2";
import { motion } from "framer-motion";
import { Mail, Phone, Clock, Send, CheckCircle, ArrowRight } from 'lucide-react';
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    });
    
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="bg-[#cbf9fe] selection:bg-cyan-500 selection:text-white min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 md:py-24 overflow-x-clip bg-gradient-to-b from-cyan-100 via-purple-100 to-white w-full relative">
        <div className="container max-w-6xl  mx-auto relative p-[1rem] sm:p-[0rem]">
          <div className="flex justify-center ">
            <div className="inline-flex py-1 px-3 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full text-white font-semibold">
              Get In Touch
            </div>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-6xl md:text-7xl lg:text-8xl font-medium text-center mt-6 text-gray-900 selection:bg-cyan-500 selection:text-white"
          >
            Let's <span className="text-cyan-600">Connect</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="selection:bg-cyan-500 selection:text-white text-center text-xl text-gray-600 mt-8 max-w-3xl mx-auto"
          >
            Have questions about AvenPing? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container bg-white border-4 border-black/5 max-w-6xl mx-auto px-[4rem] sm:px-[4rem] py-[4rem] sm:py-[4rem] rounded-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mb-6">
                Get in touch <span className="text-cyan-600">with us</span>
              </h2>
              <p className="text-xl text-gray-600 mb-12">
                We're here to help! Whether you have a question about our services, need assistance with your account, or want to provide feedback, our team is ready to assist you.
              </p>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Email:</h3>
                  <p className="text-xl text-gray-700">hello@avenping.com</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone:</h3>
                  <p className="text-xl text-gray-700">+91 XXX-XXX-XXXX</p>
                  <p className="text-sm text-gray-500 mt-1">Available Monday to Friday, 9 AM - 6 PM GMT</p>
                </div>

                <Button variant="secondary" size="lg" className="inline-flex items-center">
                  View Socials
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className=" rounded-2xl p-8"
            >
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center"
                >
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-green-800">Thank you! Your message has been sent successfully.</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your first name..."
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your last name..."
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email address..."
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    How can we help you?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Enter your message..."
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full text-xl">
                  Send Message
                  
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
