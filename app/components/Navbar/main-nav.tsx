'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, Home, InfoIcon, Map, Package, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const MainNav = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const navItems = [
    { label: 'Home', icon: Home, href: '/' },
    { label: 'About', icon: InfoIcon, href: '/about' },
    { label: 'Trips', icon: Map, href: '/trips' },
    { label: 'Packages', icon: Package, href: '/packages' }
  ]

  const menuVariants = {
    hidden: { 
      opacity: 0, 
      x: '100%',
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with hover effect */}
          <motion.div 
            className="text-2xl font-bold text-gray-800 tracking-wider"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Travel Agency
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.div 
            className="md:hidden"
            whileTap={{ scale: 0.9 }}
          >
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              className="text-gray-600 hover:bg-gray-100"
            >
              {isOpen ? <Menu size={24} /> : <Menu size={24} />}
            </Button>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link 
                href={item.href}
                key={item.label}
              >
                <motion.div
                  className="flex items-center text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="mr-2 text-gray-500" size={20} />
                  {item.label}
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuVariants}
              className="fixed inset-0 bg-white z-50 md:hidden"
            >
              {/* Close Button - Now with higher z-index */}
              <motion.div 
                className="absolute top-4 right-4 z-60"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3 }}
              >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleMenu}
                  className="text-gray-600 hover:bg-gray-100"
                >
                  <X size={32} />
                </Button>
              </motion.div>

              <div className="flex flex-col h-full justify-center items-center space-y-6">
                {navItems.map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    variants={itemVariants}
                    onClick={toggleMenu}
                    className="text-2xl text-gray-800 flex items-center space-x-4 hover:bg-gray-100 px-6 py-4 rounded-lg transition-colors"
                  >
                    <item.icon size={32} className="text-gray-600" />
                    <span>{item.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default MainNav