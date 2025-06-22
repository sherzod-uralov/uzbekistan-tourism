"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { useBookings } from "@/hooks/use-bookings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { BookingCard } from "@/components/bookings/booking-card";
import { ImageUpload } from "@/components/ui/image-upload";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Settings,
  MessageSquare,
  Camera,
} from "lucide-react";
import { redirect } from "next/navigation";

export default function ProfilePage() {
  const {
    user,
    isAuthenticated,
    updateProfile,
    isLoading: authLoading,
  } = useAuth();
  const { data: bookings, isLoading: bookingsLoading } = useBookings();

  console.log(bookings);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    profilePicture: "",
  });

  // Update form data when user data changes
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        city: user.city || "",
        country: user.country || "",
        postalCode: user.postalCode || "",
        profilePicture: user.profilePicture || "",
      });
    }
  }, [user]);

  if (!isAuthenticated && !authLoading) {
    redirect("/auth/login");
  }

  if (authLoading || !user) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-white">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData, {
      onSuccess: () => {
        setIsEditing(false);
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageUploaded = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      profilePicture: url,
    }));
  };

  const stats = [
    {
      label: "Total Bookings",
      value: bookings?.length || 0,
      icon: Calendar,
    },
    {
      label: "Completed Tours",
      value: bookings?.filter((b) => b.status === "completed").length || 0,
      icon: CreditCard,
    },
    {
      label: "Pending Bookings",
      value: bookings?.filter((b) => b.status === "pending").length || 0,
      icon: Settings,
    },
    {
      label: "Reviews Written",
      value: bookings?.filter((b) => b.status === "completed").length || 0,
      icon: MessageSquare,
    },
  ];

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Card className="border border-gray-100 shadow-sm">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <Avatar className="w-20 h-20">
                    <AvatarImage
                      src={
                        formData.profilePicture ||
                        user.profilePicture ||
                        "/placeholder.svg"
                      }
                      alt={user.firstName}
                    />
                    <AvatarFallback className="text-xl">
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <div className="absolute -bottom-2 -right-2">
                      <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                        <Camera className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-light text-gray-900 mb-2">
                    {user.firstName} {user.lastName}
                  </h1>
                  <p className="text-gray-500 mb-4">{user.email}</p>
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 text-gray-700"
                  >
                    {user.role === "admin" ? "Administrator" : "Tourist"}
                  </Badge>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant={isEditing ? "outline" : "default"}
                    className={
                      isEditing
                        ? "border-gray-200"
                        : "bg-gray-900 hover:bg-gray-800 text-white"
                    }
                  >
                    {isEditing ? "Cancel" : "Edit Profile"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <Card key={stat.label} className="border border-gray-100 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-3xl font-light text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-gray-50">
                    <stat.icon className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:w-96 bg-gray-100">
              <TabsTrigger
                value="profile"
                className="data-[state=active]:bg-white"
              >
                Profile Information
              </TabsTrigger>
              <TabsTrigger
                value="bookings"
                className="data-[state=active]:bg-white"
              >
                My Bookings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="border border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl font-light">
                    <User className="h-5 w-5 text-gray-400" />
                    Profile Information
                  </CardTitle>
                  <CardDescription className="text-gray-500">
                    Manage your personal information and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Profile Picture Upload */}
                    {isEditing && (
                      <div className="space-y-2">
                        <Label className="text-sm text-gray-700">
                          Profile Picture
                        </Label>
                        <ImageUpload
                          currentImage={formData.profilePicture}
                          onImageUploaded={handleImageUploaded}
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="firstName"
                          className="text-sm text-gray-700"
                        >
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="border-gray-200 focus:border-gray-400 focus:ring-0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="lastName"
                          className="text-sm text-gray-700"
                        >
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="border-gray-200 focus:border-gray-400 focus:ring-0"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm text-gray-700">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="email"
                          value={user.email}
                          disabled
                          className="pl-10 border-gray-200 bg-gray-50 text-gray-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="phoneNumber"
                        className="text-sm text-gray-700"
                      >
                        Phone Number
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="pl-10 border-gray-200 focus:border-gray-400 focus:ring-0"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="address"
                        className="text-sm text-gray-700"
                      >
                        Address
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="pl-10 border-gray-200 focus:border-gray-400 focus:ring-0"
                          placeholder="Street address"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-sm text-gray-700">
                          City
                        </Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="border-gray-200 focus:border-gray-400 focus:ring-0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="country"
                          className="text-sm text-gray-700"
                        >
                          Country
                        </Label>
                        <Input
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="border-gray-200 focus:border-gray-400 focus:ring-0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="postalCode"
                          className="text-sm text-gray-700"
                        >
                          Postal Code
                        </Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="border-gray-200 focus:border-gray-400 focus:ring-0"
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex gap-4 pt-4">
                        <Button
                          type="submit"
                          className="bg-gray-900 hover:bg-gray-800 text-white"
                        >
                          Save Changes
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setIsEditing(false);
                            // Reset form data to original user data
                            if (user) {
                              setFormData({
                                firstName: user.firstName || "",
                                lastName: user.lastName || "",
                                phoneNumber: user.phoneNumber || "",
                                address: user.address || "",
                                city: user.city || "",
                                country: user.country || "",
                                postalCode: user.postalCode || "",
                                profilePicture: user.profilePicture || "",
                              });
                            }
                          }}
                          className="border-gray-200"
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bookings">
              <Card className="border border-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl font-light">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    My Bookings
                  </CardTitle>
                  <CardDescription className="text-gray-500">
                    View and manage your tour bookings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {bookingsLoading ? (
                    <div className="flex justify-center py-8">
                      <LoadingSpinner size="lg" />
                    </div>
                  ) : bookings && bookings.length > 0 ? (
                    <div className="space-y-6">
                      {bookings.map((booking) => (
                        <BookingCard key={booking.id} booking={booking} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-light text-gray-900 mb-2">
                        No bookings yet
                      </h3>
                      <p className="text-gray-500 mb-4">
                        Start exploring our amazing tours!
                      </p>
                      <Button
                        className="bg-gray-900 hover:bg-gray-800 text-white"
                        asChild
                      >
                        <a href="/tours">Browse Tours</a>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
