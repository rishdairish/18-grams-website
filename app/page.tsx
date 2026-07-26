'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { ChevronDown, Leaf, WheatOff, CheckCircle2, Loader2, Menu as MenuIcon, X, Star, MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

// --- FIREBASE INITIALIZATION ---
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore(app)


// --- 1. NAVBAR COMPONENT ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = ['Home', 'Menu', 'About', 'Reviews', 'Reservations']

  return (
    <>
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-sage-green origin-left z-50" style={{ scaleX }} />
      <nav className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'bg-warm-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          <a href="#home" className={`font-heading text-2xl font-bold tracking-tighter ${scrolled ? 'text-dark-charcoal' : 'text-white'}`}>
            18 GRAMS.
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className={`text-sm font-medium hover:text-sage-green transition-colors ${scrolled ? 'text-dark-charcoal' : 'text-white/90'}`}>
                {link}
              </a>
            ))}
            <a href="#reservations" className="px-5 py-2.5 bg-coffee-brown text-white rounded-full text-sm font-medium hover:bg-opacity-90 transition-all">
              Book a Table
            </a>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className={`md:hidden ${scrolled ? 'text-dark-charcoal' : 'text-white'}`}>
            {isOpen ? <X /> : <MenuIcon />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 w-full bg-warm-white shadow-lg py-4 px-4 flex flex-col gap-4 md:hidden"
            >
              {navLinks.map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-dark-charcoal font-medium text-lg py-2 border-b border-gray-100">
                  {link}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}

// --- 2. HERO COMPONENT ---
const Hero = () => (
  <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/50" />
    </div>
    <div className="relative z-10 text-center px-4 flex flex-col items-center">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        className="font-heading text-5xl md:text-7xl lg:text-8xl text-white font-bold mb-6 tracking-tight"
      >
        Fresh Coffee.<br/>Incredible Brunch.
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
        className="text-lg md:text-2xl text-cream mb-10 max-w-2xl font-light"
      >
        Experience modern café dining in the heart of Eastgardens.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="flex flex-col sm:flex-row gap-4">
        <a href="#menu" className="px-8 py-4 bg-coffee-brown text-white rounded-full font-medium hover:bg-opacity-90 transition-all shadow-lg hover:scale-105 active:scale-95">
          View Menu
        </a>
      </motion.div>
    </div>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="absolute bottom-10 z-10 animate-bounce">
      <ChevronDown className="text-white w-8 h-8 opacity-70" />
    </motion.div>
  </section>
)

// --- 3. ABOUT COMPONENT ---
const About = () => (
  <section id="about" className="py-24 bg-white px-4">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
      <div>
        <h2 className="font-heading text-4xl md:text-5xl text-dark-charcoal mb-6">More than just a café.</h2>
        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
          Located inside Westfield Eastgardens, 18 Grams is a sanctuary for coffee lovers and food enthusiasts alike. We believe in sourcing the finest local ingredients to create brunch dishes that look as good as they taste.
        </p>
        <div className="grid grid-cols-2 gap-6 mt-10">
          <div>
            <h4 className="text-3xl font-heading font-bold text-sage-green mb-2">4.8★</h4>
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Loved by Locals</p>
          </div>
          <div>
            <h4 className="text-3xl font-heading font-bold text-sage-green mb-2">100k+</h4>
            <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">Coffees Poured</p>
          </div>
        </div>
      </div>
      <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
        <img src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&q=80" alt="Cafe Interior" className="w-full h-full object-cover" />
      </div>
    </div>
  </section>
)

// --- 4. MENU COMPONENT ---
type Category = 'Breakfast' | 'Lunch' | 'Coffee'
const MENU_ITEMS = [
  { id: 1, name: 'Smashed Avocado', category: 'Breakfast', price: 22, description: 'Sourdough, poached eggs, feta, cherry tomatoes, dukkah.', dietary: ['v', 'gf-option'], cals: 450, img: 'https://images.unsplash.com/photo-1603048297172-c92544798d5e?auto=format&fit=crop&q=80&w=400' },
  { id: 2, name: 'Ricotta Hotcakes', category: 'Breakfast', price: 24, description: 'Fluffy hotcakes, seasonal berries, maple syrup, honeycomb butter.', dietary: ['v'], cals: 680, img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=400' },
  { id: 3, name: 'Grilled Chicken Burger', category: 'Lunch', price: 24, description: 'Free-range breast, avocado, Swiss cheese, spicy mayo, fries.', dietary: [], cals: 820, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400' },
  { id: 4, name: 'Signature Flat White', category: 'Coffee', price: 5, description: 'Our house 18 Grams espresso blend with velvety steamed milk.', dietary: ['v', 'gf'], cals: 120, img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=400' },
]

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState<Category>('Breakfast')
  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory)

  return (
    <section id="menu" className="py-24 bg-cream px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl text-dark-charcoal mb-4">Our Menu</h2>
          <div className="w-24 h-1 bg-sage-green mx-auto rounded-full"></div>
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {(['Breakfast', 'Lunch', 'Coffee'] as Category[]).map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${ activeCategory === category ? 'bg-coffee-brown text-white' : 'bg-white text-dark-charcoal hover:bg-sage-green hover:text-white' }`}
            >
              {category}
            </button>
          ))}
        </div>
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map(item => (
              <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white rounded-2xl overflow-hidden shadow-soft group hover:shadow-lg transition-all">
                <div className="h-56 overflow-hidden relative">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    {item.dietary.includes('v') && <span className="bg-sage-green text-white p-1.5 rounded-full" title="Vegetarian"><Leaf size={16}/></span>}
                    {item.dietary.includes('gf') && <span className="bg-amber-600 text-white p-1.5 rounded-full" title="Gluten Free"><WheatOff size={16}/></span>}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-heading text-xl font-bold">{item.name}</h3>
                    <span className="font-bold text-coffee-brown">${item.price}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

// --- 5. RESERVATIONS COMPONENT ---
const bookingSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  guests: z.string().min(1, 'Number of guests required'),
})
type BookingFormValues = z.infer<typeof bookingSchema>

const Reservations = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<BookingFormValues>({ resolver: zodResolver(bookingSchema) })

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true)
    try {
      await addDoc(collection(db, 'reservations'), { ...data, status: 'pending', createdAt: new Date().toISOString() })
      setIsSuccess(true)
      reset()
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (error) {
      console.error('Error adding document: ', error)
      alert("Database connection error. Please ensure Firebase is configured.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="reservations" className="py-24 bg-white px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl text-dark-charcoal mb-4">Book a Table</h2>
          <p className="text-gray-600">Reserve your spot for an unforgettable dining experience.</p>
        </div>
        {isSuccess ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-sage-green/10 p-8 rounded-2xl flex flex-col items-center text-center border border-sage-green/30">
            <CheckCircle2 className="w-16 h-16 text-sage-green mb-4" />
            <h3 className="text-2xl font-heading font-bold mb-2">Booking Requested</h3>
            <p className="text-gray-700">We've received your request and will confirm shortly via email.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input {...register('name')} className="w-full px-4 py-3 rounded-lg bg-warm-white border border-gray-200 focus:ring-2 focus:ring-sage-green outline-none" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" {...register('email')} className="w-full px-4 py-3 rounded-lg bg-warm-white border border-gray-200 focus:ring-2 focus:ring-sage-green outline-none" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                <select {...register('guests')} className="w-full px-4 py-3 rounded-lg bg-warm-white border border-gray-200 focus:ring-2 focus:ring-sage-green outline-none">
                  {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} People</option>)}
                </select>
                {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input type="date" {...register('date')} className="w-full px-4 py-3 rounded-lg bg-warm-white border border-gray-200 focus:ring-2 focus:ring-sage-green outline-none" />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
              </div>
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-coffee-brown text-white rounded-lg font-bold text-lg hover:bg-opacity-90 flex items-center justify-center gap-2 disabled:opacity-70">
              {isSubmitting && <Loader2 className="animate-spin w-5 h-5" />}
              {isSubmitting ? 'Requesting...' : 'Confirm Reservation'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

// --- 6. FOOTER COMPONENT ---
const Footer = () => (
  <footer className="bg-dark-charcoal text-white py-16 px-4">
    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
      <div>
        <h3 className="font-heading text-2xl font-bold mb-6">18 GRAMS.</h3>
        <p className="text-gray-400">Experience modern café dining, specialty coffee, and incredible brunch right here in Sydney.</p>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-6">Contact</h4>
        <ul className="space-y-4 text-gray-400">
          <li className="flex items-center gap-3"><MapPin size={18} /> 152 Bunnerong Rd, Eastgardens NSW</li>
          <li className="flex items-center gap-3"><Phone size={18} /> (02) 9123 4567</li>
          <li className="flex items-center gap-3"><Mail size={18} /> hello@18grams.com.au</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-6">Hours</h4>
        <ul className="space-y-4 text-gray-400">
          <li className="flex justify-between border-b border-gray-700 pb-2"><span>Mon - Fri</span> <span>7:00 AM - 4:00 PM</span></li>
          <li className="flex justify-between border-b border-gray-700 pb-2"><span>Saturday</span> <span>7:30 AM - 4:30 PM</span></li>
          <li className="flex justify-between border-b border-gray-700 pb-2"><span>Sunday</span> <span>8:00 AM - 3:00 PM</span></li>
        </ul>
      </div>
    </div>
  </footer>
)

// --- MAIN PAGE EXPORT ---
export default function Home() {
  return (
    <div className="font-body bg-warm-white text-dark-charcoal antialiased">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Reservations />
      </main>
      <Footer />
    </div>
  )
}
