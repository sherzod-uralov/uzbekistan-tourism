"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Users,
  Globe,
  Award,
  Star,
  Heart,
  Shield,
  Target,
  Compass,
  ArrowRight,
} from "lucide-react";

const stats = [
  { label: "Happy Travelers", value: "10,000+", icon: Users },
  { label: "Tours Completed", value: "500+", icon: Globe },
  { label: "Years Experience", value: "15+", icon: Award },
  { label: "Average Rating", value: "4.9", icon: Star },
];

const values = [
  {
    icon: Heart,
    title: "Passion for Travel",
    description:
      "We believe travel transforms lives and creates lasting memories that connect people across cultures.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description:
      "Your safety and security are our top priorities. We maintain the highest standards in all our tours.",
  },
  {
    icon: Target,
    title: "Excellence",
    description:
      "We strive for excellence in every detail, from planning to execution, ensuring unforgettable experiences.",
  },
  {
    icon: Compass,
    title: "Adventure Spirit",
    description:
      "We embrace the spirit of adventure and discovery, taking you to places that inspire and amaze.",
  },
];

const team = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Michael Chen",
    role: "Head of Operations",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Elena Rodriguez",
    role: "Cultural Director",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "David Thompson",
    role: "Adventure Specialist",
    image: "/placeholder.svg?height=300&width=300",
  },
];

export default function AboutPageMinimal() {
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
              <a href="#" className="text-gray-900 font-medium">
                About
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
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
              About Our Story
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Creating unforgettable travel experiences across Uzbekistan's rich
              cultural heritage
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-8 w-8 text-gray-400" />
                </div>
                <div className="text-3xl font-light text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-light text-gray-900 mb-8">
                Our Journey
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2008, Uzbekistan Tours began with a simple vision:
                  to share the incredible beauty and rich cultural heritage of
                  Uzbekistan with travelers from around the world.
                </p>
                <p>
                  Our founder, Sarah Johnson, fell in love with Uzbekistan
                  during her first visit to Samarkand. The stunning
                  architecture, warm hospitality, and fascinating history
                  inspired her to create authentic travel experiences.
                </p>
                <p>
                  Today, we're proud to have welcomed over 10,000 travelers to
                  discover the magic of the Silk Road, ancient cities, and
                  vibrant traditions that make Uzbekistan truly special.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Our story"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide our work
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-6">
                  <value.icon className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-light text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              The people behind your unforgettable experiences
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden mb-4">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-light text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              To create authentic, meaningful travel experiences that showcase
              Uzbekistan's incredible heritage while supporting local
              communities and preserving cultural traditions for future
              generations.
            </p>
            <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-md">
              Start Your Journey
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
