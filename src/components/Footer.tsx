import React from 'react'
import { motion, Variants } from 'framer-motion'
import { Monitor, Phone, Mail, MapPin, ArrowRight, Sparkles } from 'lucide-react'

const solutions = [
  'Панельные ПК',
  'Промышленные стойки',
  'Промышленные ПК',
  'Встраиваемые системы',
  'Серверные решения',
]

const industries = [
  'Металлургия',
  'Пищевая промышленность',
  'Автомобилестроение',
  'Логистика',
  'Нефтегаз',
]

// --- Анимации ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
}

const linkHoverVariants = {
  rest: { x: 0 },
  hover: { x: 4 }
}

export default function Footer() {
  return (
    <footer className="relative bg-[#030303] text-white overflow-hidden">
      {/* Верхняя декоративная линия градиента */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />

      {/* Баннер партнёрства */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div 
            className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-5 hover:border-pink-500/30 transition-colors duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center sm:text-left">
              <h3 className="font-semibold text-white text-lg">Работаете с промышленным оборудованием?</h3>
              <p className="text-sm text-gray-400 mt-1">Присоединяйтесь к партнёрской программе с выгодными условиями</p>
            </div>
            <motion.button 
              className="shrink-0 flex items-center gap-2 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-pink-500/20"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Стать партнёром <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Компания */}
          <motion.div variants={itemVariants} className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <motion.div 
                className="w-10 h-10 bg-gradient-to-br from-pink-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/20"
                whileHover={{ rotate: 5, scale: 1.05 }}
              >
                <Monitor className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <span className="text-lg font-bold tracking-tight">ПромТех<span className="text-pink-500">Комп</span></span>
                <span className="block text-[10px] uppercase tracking-widest text-gray-500">Industrial Solutions</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Надёжные промышленные компьютеры для любых условий эксплуатации. Полный цикл от подбора до внедрения.
            </p>
            <div className="space-y-4">
              <a href="tel:+74951234567" className="flex items-center gap-3 text-sm text-gray-400 hover:text-pink-400 transition-colors group">
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" /> +7 (495) 123-45-67
              </a>
              <a href="mailto:info@promtechcomp.ru" className="flex items-center gap-3 text-sm text-gray-400 hover:text-pink-400 transition-colors group">
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" /> info@promtechcomp.ru
              </a>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 shrink-0 text-pink-500/70" /> г. Москва, ул. Промышленная, 15
              </div>
            </div>
          </motion.div>

          {/* Решения */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-pink-500 rounded-full"></span>
              Решения
            </h4>
            <ul className="space-y-3">
              {solutions.map((s, i) => (
                <li key={i}>
                  <motion.a 
                    href="#" 
                    className="text-sm text-gray-400 hover:text-pink-400 transition-colors inline-block"
                    variants={linkHoverVariants}
                    initial="rest"
                    whileHover="hover"
                  >
                    {s}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Отрасли */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
              Отрасли
            </h4>
            <ul className="space-y-3">
              {industries.map((s, i) => (
                <li key={i}>
                  <motion.a 
                    href="#" 
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors inline-block"
                    variants={linkHoverVariants}
                    initial="rest"
                    whileHover="hover"
                  >
                    {s}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Ресурсы */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold text-white mb-5 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
              Ресурсы
            </h4>
            <ul className="space-y-3">
              <li>
                <motion.a 
                  href="#configurator" 
                  className="text-sm text-gray-400 hover:text-pink-400 transition-colors inline-block"
                  variants={linkHoverVariants}
                  initial="rest"
                  whileHover="hover"
                >
                  Подбор оборудования
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href="#cases" 
                  className="text-sm text-gray-400 hover:text-blue-400 transition-colors inline-block"
                  variants={linkHoverVariants}
                  initial="rest"
                  whileHover="hover"
                >
                  Кейсы
                </motion.a>
              </li>
              <li>
                <motion.a 
                  href="#contacts" 
                  className="text-sm text-gray-400 hover:text-purple-400 transition-colors inline-block"
                  variants={linkHoverVariants}
                  initial="rest"
                  whileHover="hover"
                >
                  Контакты
                </motion.a>
              </li>
              <li>
  <motion.a 
    href="/catalog.pdf"
    download
    className="text-sm text-gray-400 hover:text-pink-400 transition-colors inline-block"
    variants={linkHoverVariants}
    initial="rest"
    whileHover="hover"
  >
    Каталог PDF
  </motion.a>
</li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Блог</a></li>
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* Нижняя панель */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
            <p>&copy; {new Date().getFullYear()} ПромТехКомп. Все права защищены.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-gray-400 transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-gray-400 transition-colors">Условия использования</a>
              <a href="#" className="hover:text-gray-400 transition-colors">Карта сайта</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}