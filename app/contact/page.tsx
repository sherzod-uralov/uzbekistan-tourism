"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["123 Amir Timur Street", "Tashkent, Uzbekistan", "100000"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+998 71 123 4567", "+998 90 123 4567", "24/7 Support"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: [
      "info@uzbekistantours.com",
      "support@uzbekistantours.com",
      "bookings@uzbekistantours.com",
    ],
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: [
      "Monday - Friday: 9:00 - 18:00",
      "Saturday: 10:00 - 16:00",
      "Sunday: Closed",
    ],
  },
];

export default function ContactPageMinimal() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-medium text-gray-900">
              Uzbekistan Tours
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Home
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Tours
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                About
              </a>
              <a href="#" className="text-gray-900 font-medium">
                Contact
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                Sign In
              </button>
              <button className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Ready to explore Uzbekistan? We're here to help plan your perfect
              journey
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <info.icon className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {info.title}
                </h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600">
                      {detail}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Send us a Message
            </h2>
            <p className="text-xl text-gray-600">
              We'll get back to you within 24 hours
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                <h3 className="text-2xl font-light text-gray-900 mb-4">
                  Message Sent Successfully!
                </h3>
                <p className="text-gray-600">
                  Thank you for contacting us. We'll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="border-gray-200 focus:border-gray-400 focus:ring-0"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="border-gray-200 focus:border-gray-400 focus:ring-0"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="border-gray-200 focus:border-gray-400 focus:ring-0"
                      placeholder="+998 90 123 4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="border-gray-200 focus:border-gray-400 focus:ring-0"
                      placeholder="What is this regarding?"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="border-gray-200 focus:border-gray-400 focus:ring-0"
                    placeholder="Tell us about your travel plans..."
                  />
                </div>

                <div className="text-center">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-md"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Find Our Office
            </h2>
            <p className="text-xl text-gray-600">
              Located in the heart of Tashkent
            </p>
          </motion.div>

          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden relative">
            <img
              src="/placeholder.svg?height=400&width=800"
              alt="Office location map"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gray-900/10 flex items-center justify-center">
              <div className="text-center text-gray-700">
                <MapPin className="h-16 w-16 mx-auto mb-4" />
                <p className="text-lg font-medium">Interactive Map</p>
                <p className="text-gray-600">123 Amir Timur Street, Tashkent</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-light text-gray-900 mb-6">
              Ready to Explore Uzbekistan?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Discover the magic of the Silk Road with our expertly crafted
              tours
            </p>
            <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-md">
              View Our Tours
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
