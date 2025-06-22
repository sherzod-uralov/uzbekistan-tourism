"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, X, User, LogOut, Calendar } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/tours", label: "Tours" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <motion.div whileHover={{ scale: 1.02 }} className="text-2xl font-light text-gray-900">
                Uzbekistan Tours
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                  <Link
                      key={item.href}
                      href={item.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm"
                  >
                    {item.label}
                  </Link>
              ))}
            </div>

            {/* Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user?.profilePicture || "/placeholder.svg"} alt={user?.firstName} />
                          <AvatarFallback className="text-xs">
                            {user?.firstName?.[0]}
                            {user?.lastName?.[0]}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 border-gray-100" align="end" forceMount>
                      <div className="flex items-center justify-start gap-2 p-2">
                        <div className="flex flex-col space-y-1 leading-none">
                          <p className="font-medium text-sm text-gray-900">
                            {user?.firstName} {user?.lastName}
                          </p>
                          <p className="w-[200px] truncate text-xs text-gray-500">{user?.email}</p>
                        </div>
                      </div>
                      <DropdownMenuSeparator className="bg-gray-100" />
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="flex items-center text-sm text-gray-700">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="flex items-center text-sm text-gray-700">
                          <Calendar className="mr-2 h-4 w-4" />
                          My Bookings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-100" />
                      <DropdownMenuItem onClick={logout} className="flex items-center text-sm text-gray-700">
                        <LogOut className="mr-2 h-4 w-4" />
                        Log out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
              ) : (
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/auth/login" className="text-gray-600">
                        Sign In
                      </Link>
                    </Button>
                    <Button size="sm" className="bg-gray-900 hover:bg-gray-800 text-white" asChild>
                      <Link href="/auth/register">Sign Up</Link>
                    </Button>
                  </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
              <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="md:hidden bg-white border-t border-gray-100"
              >
                <div className="px-6 pt-2 pb-3 space-y-1">
                  {navItems.map((item) => (
                      <Link
                          key={item.href}
                          href={item.href}
                          className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200 text-sm"
                          onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                  ))}
                  {!isAuthenticated && (
                      <div className="pt-4 space-y-2">
                        <Link
                            href="/auth/login"
                            className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-200 text-sm"
                            onClick={() => setIsOpen(false)}
                        >
                          Sign In
                        </Link>
                        <Link
                            href="/auth/register"
                            className="block px-3 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors duration-200 text-sm"
                            onClick={() => setIsOpen(false)}
                        >
                          Sign Up
                        </Link>
                      </div>
                  )}
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </nav>
  )
}
