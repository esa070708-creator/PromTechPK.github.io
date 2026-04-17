import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Свечение вокруг кнопки */}
          <motion.div
            className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-pink-500/30 to-blue-500/30 blur-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Кнопка */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white rounded-full border border-white/20 backdrop-blur-xl shadow-lg shadow-pink-500/30 flex items-center justify-center group overflow-hidden"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(236, 72, 153, 0.5)" }}
            whileTap={{ scale: 0.9 }}
            aria-label="Наверх"
          >
            {/* Анимированный фон при наведении */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity"
            />
            
            {/* Иконка со стрелкой */}
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowUp className="w-5 h-5 relative z-10" />
            </motion.div>
          </motion.button>

          {/* Tooltip при наведении */}
          <motion.div
            className="fixed bottom-20 right-6 z-50 px-3 py-1.5 bg-[#0a0a0f] border border-white/10 rounded-lg text-xs text-gray-300 whitespace-nowrap backdrop-blur-xl"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            style={{ pointerEvents: 'none' }}
          >
            Наверх
            <div className="absolute -bottom-1 right-4 w-2 h-2 bg-[#0a0a0f] border-r border-b border-white/10 rotate-45" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}