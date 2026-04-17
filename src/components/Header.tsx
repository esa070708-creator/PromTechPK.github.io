import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Monitor, Phone, ArrowRight } from 'lucide-react'

const navLinks = [
  { label: 'Подбор', href: '#configurator' },
  { label: 'Преимущества', href: '#why-us' },
  { label: 'Кейсы', href: '#cases' },
  { label: 'Контакты', href: '#contacts' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/50' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Логотип */}
          <a href="#" className="flex items-center gap-3 group">
            <motion.div 
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                scrolled ? 'bg-gradient-to-br from-pink-600 to-pink-500 text-white shadow-lg shadow-pink-500/30' : 'bg-white/10 text-white backdrop-blur-sm border border-white/20'
              }`}
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Monitor className="w-5 h-5" />
            </motion.div>
            <div>
              <span className={`text-lg font-bold tracking-tight transition-colors duration-300 ${
                scrolled ? 'text-white' : 'text-white'
              }`}>
                ПромТех<span className="text-pink-500">Комп</span>
              </span>
              <span className={`block text-[10px] uppercase tracking-widest font-medium transition-colors duration-300 ${
                scrolled ? 'text-gray-500' : 'text-white/60'
              }`}>Industrial Solutions</span>
            </div>
          </a>

          {/* Навигация десктоп */}
          <nav className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group overflow-hidden ${
                  scrolled ? 'text-gray-400 hover:text-white' : 'text-white/80 hover:text-white'
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
                />
              </a>
            ))}
          </nav>

          {/* Телефон и CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="tel:+74951234567" 
              className={`flex items-center gap-2 text-sm font-medium transition-all duration-300 group ${
                scrolled ? 'text-gray-400 hover:text-pink-400' : 'text-white/80 hover:text-pink-400'
              }`}
            >
              <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>+7 (495) 123-45-67</span>
            </a>
            
            <motion.a 
              href="#configurator"
              className="group flex items-center gap-2 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-pink-500/20"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(236, 72, 153, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              Подобрать
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>

          {/* Мобильное меню кнопка */}
          <motion.button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg transition-all ${
              scrolled ? 'text-white hover:bg-white/10' : 'text-white hover:bg-white/10'
            }`}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Мобильное меню */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div 
            className="lg:hidden absolute top-full left-0 right-0 bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/50"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link, i) => (
                <motion.a 
                  key={link.href} 
                  href={link.href} 
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-xl text-white font-medium hover:bg-white/5 hover:text-pink-400 transition-all"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.label}
                </motion.a>
              ))}
              
              <div className="pt-4 mt-4 border-t border-white/10">
                <a 
                  href="tel:+74951234567" 
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white/80 hover:text-pink-400 transition-colors mb-3"
                >
                  <Phone className="w-4 h-4" />
                  <span>+7 (495) 123-45-67</span>
                </a>
                
                <motion.a 
                  href="#configurator" 
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white px-5 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-pink-500/20"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Подобрать компьютер
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}