"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TourCard } from "@/components/tours/tour-card";
import { useTours } from "@/hooks/use-tours";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ArrowRight, Users, Award, Globe, Star } from "lucide-react";
import { useCategory } from "@/hooks/use-category";

export default function HomePage() {
  const { data: tours, isLoading } = useTours();
  const { data: categories } = useCategory();
  const featuredTours = tours?.slice(0, 3) || [];

  const stats = [
    { icon: Users, label: "Happy Travelers", value: "10,000+" },
    { icon: Globe, label: "Tours Completed", value: "500+" },
    { icon: Award, label: "Years Experience", value: "15+" },
    { icon: Star, label: "Average Rating", value: "4.9" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://th.bing.com/th/id/R.d535704cf61800814dc8266f17810baa?rik=AoGJGBRxruBnFA&pid=ImgRaw&r=0"
            alt="Uzbekistan landscape"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-light mb-6 leading-tight">
              Discover
              <br />
              <span className="font-normal">Uzbekistan</span>
            </h1>

            <p className="text-xl md:text-2xl mb-12 text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
              Journey through ancient Silk Road cities and experience rich
              culture
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4"
                asChild
              >
                <Link href="/tours">
                  Explore Tours
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-black hover:bg-white hover:text-gray-900 px-8 py-4"
                asChild
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <stat.icon className="h-6 w-6 text-gray-400 mx-auto mb-4" />
                <div className="text-3xl font-light text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light text-gray-900 mb-4">
              Choose Your Journey
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
              From historical wonders to cultural experiences
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {categories?.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card className="border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                  <div className="relative h-64">
                    <Image
                      src={category.categoryUrl || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-light mb-2">
                        {category.name}
                      </h3>
                      <p className="text-white/90 text-sm">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <Button
                      variant="outline"
                      className="w-full border-gray-200"
                      asChild
                    ></Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light text-gray-900 mb-4">
              Featured Tours
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light">
              Handpicked experiences that showcase the best of Uzbekistan
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredTours.map((tour, index) => (
                <TourCard key={tour.id} tour={tour} index={index} />
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button variant="outline" className="border-gray-200 px-8" asChild>
              <Link href="/tours">
                View All Tours
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-4xl font-light mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-12 text-white/80 font-light">
              Join thousands of travelers who have discovered the wonders of
              Uzbekistan
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 px-8"
                asChild
              >
                <Link href="/tours">Book Your Tour</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-black hover:bg-white hover:text-gray-900 px-8"
                asChild
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
