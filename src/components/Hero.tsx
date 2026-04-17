import React from 'react'
import { motion, Variants } from 'framer-motion'
import { ArrowRight, Download, Sparkles, Shield, Zap, Clock, ChevronDown } from 'lucide-react'

const stats = [
  { value: '500+', label: 'Внедрений по России', icon: Shield },
  { value: '5 лет', label: 'Гарантия', icon: Clock },
  { value: '24/7', label: 'Поддержка', icon: Zap },
  { value: '14 дней', label: 'Тест-драйв', icon: Sparkles },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 12 } }
}

const HeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Фоновое изображение */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://img.freepik.com/free-photo/innovative-futuristic-classroom-students_23-2150906264.jpg?semt=ais_hybrid&w=740&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          backgroundRepeat: 'no-repeat'
        }}
      />

      {/* Градиентные затемнения для читаемости */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#030303]/80 via-[#030303]/60 to-[#0a0a0f]/90" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#030303] via-[#030303]/30 to-transparent" />

      {/* Анимированные градиентные сферы */}
      <motion.div 
        className="absolute z-20 top-[-10%] left-[-10%] w-[700px] h-[700px] rounded-full bg-pink-600/20 blur-[120px]"
        animate={{ x: [0, 100, 0], y: [0, 80, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute z-20 bottom-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full bg-blue-600/20 blur-[120px]"
        animate={{ x: [0, -100, 0], y: [0, -80, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute z-20 top-[30%] left-[20%] w-[400px] h-[400px] rounded-full bg-purple-600/15 blur-[100px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Плавающие частицы */}
      {[...Array(50)].map((_, i) => {
        const x = Math.random() * 100
        const y = Math.random() * 100
        const duration = 15 + Math.random() * 25
        const delay = Math.random() * 5
        const size = Math.random() * 2 + 1
        return (
          <motion.div
            key={i}
            className="absolute z-20 rounded-full"
            style={{ 
              left: `${x}%`, 
              top: `${y}%`, 
              width: size, 
              height: size,
              background: `linear-gradient(135deg, rgba(236,72,153,${0.3 + Math.random() * 0.4}), rgba(59,130,246,${0.3 + Math.random() * 0.4}))`
            }}
            animate={{ 
              y: [0, -40, 0], 
              opacity: [0.2, 0.8, 0.2], 
              scale: [1, 1.4, 1] 
            }}
            transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
          />
        )
      })}

      {/* Тонкая сетка */}
      <div className="absolute inset-0 z-20 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Радиальное свечение в центре */}
      <div className="absolute inset-0 z-10 bg-radial-gradient-center pointer-events-none" 
        style={{ background: 'radial-gradient(ellipse at center, transparent 0%, rgba(3,3,3,0.4) 70%)' }} 
      />
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#030303]">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
      
      <HeroBackground />

      <div className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-20">
        
        {/* Бейдж */}
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-5 py-2.5 mb-10 shadow-lg shadow-black/20"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="text-white/90 text-sm font-medium">Более 15 лет на рынке промышленных решений</span>
        </motion.div>

        {/* Заголовок */}
        <motion.h1 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-8"
        >
          Промышленный компьютер
          <span className="block mt-4">
            для вашего{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-pink-500 to-blue-500 font-extrabold">
                производства
              </span>
              <motion.span 
                className="absolute -bottom-1 left-0 right-0 h-1.5 bg-gradient-to-r from-pink-500/50 to-blue-500/50 rounded-full blur-[2px]"
                animate={{ scaleX: [0.95, 1.05, 0.95], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </span>
          </span>
        </motion.h1>

        {/* Описание */}
        <motion.p 
          variants={itemVariants}
          className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-4 leading-relaxed"
        >
          Подберём решение под ваши задачи за 5 минут с гарантией 5 лет
        </motion.p>
        <motion.p 
          variants={itemVariants}
          className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto mb-14 leading-relaxed"
        >
          Ответьте на 3 вопроса и получите готовую конфигурацию, рассчитанную на работу в цеху, при вибрации, запылённости и экстремальных температурах
        </motion.p>

        {/* Кнопки */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24"
        >
          <motion.a 
            href="#configurator"
            className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white px-8 py-4.5 rounded-2xl text-lg font-semibold transition-all shadow-lg shadow-pink-500/30 overflow-hidden"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            Подобрать компьютер
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>
          
          <motion.a 
  href="/catalog.pdf"                    // ✅ Путь от корня public
  download="PromTechComp_Catalog_2024.pdf"  // ✅ Имя файла при скачивании
  className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-xl text-white px-8 py-4.5 rounded-2xl text-lg font-medium transition-all"
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.98 }}
>
  <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
  Скачать каталог
</motion.a>
        </motion.div>

        {/* Статистика */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 max-w-4xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div 
              key={i} 
              variants={itemVariants}
              className="text-center p-4 md:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-pink-500/40 hover:bg-pink-500/10 transition-all group cursor-default"
              whileHover={{ y: -6 }}
            >
              <div className="flex items-center justify-center mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500/20 to-blue-500/20 flex items-center justify-center group-hover:from-pink-500/30 group-hover:to-blue-500/30 transition-all">
                  <stat.icon className="w-5 h-5 text-pink-400 group-hover:text-pink-300 transition-colors" />
                </div>
              </div>
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent mb-1.5">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Скролл-индикатор */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <a href="#configurator" className="flex flex-col items-center gap-3 group">
          <span className="text-[10px] uppercase tracking-widest text-gray-500 group-hover:text-pink-400 transition-colors">
            Листайте вниз
          </span>
          <div className="w-8 h-12 border-2 border-white/30 rounded-full flex items-start justify-center p-2.5 backdrop-blur-sm group-hover:border-pink-500/50 transition-colors">
            <motion.div 
              className="w-1.5 h-3 bg-gradient-to-b from-pink-500 to-blue-500 rounded-full"
              animate={{ y: [0, 14, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </a>
      </motion.div>

      {/* Декоративные угловые элементы */}
      <div className="absolute top-8 left-8 z-30 hidden lg:block">
        <div className="w-20 h-20 border-l-2 border-t-2 border-pink-500/30 rounded-tl-3xl" />
      </div>
      <div className="absolute bottom-8 right-8 z-30 hidden lg:block">
        <div className="w-20 h-20 border-r-2 border-b-2 border-blue-500/30 rounded-br-3xl" />
      </div>
    </section>
  )
}