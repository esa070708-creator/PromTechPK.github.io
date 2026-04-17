import React from 'react'
import { motion, Variants } from 'framer-motion'
import { Shield, Clock, Headphones, PackageCheck, TrendingUp, Sparkles } from 'lucide-react'

const benefits = [
  {
    icon: <Shield className="w-7 h-7" />,
    title: 'Гарантия 5 лет',
    desc: 'Полная гарантия на оборудование и техническую поддержку на весь срок эксплуатации',
    gradient: 'from-pink-500 to-pink-600',
  },
  {
    icon: <Clock className="w-7 h-7" />,
    title: 'Тест-драйв 14 дней',
    desc: 'Возможность протестировать решение в реальных условиях вашего производства',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    icon: <Headphones className="w-7 h-7" />,
    title: 'Поддержка 24/7',
    desc: 'Круглосуточная техническая поддержка и оперативное решение любых вопросов',
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    icon: <PackageCheck className="w-7 h-7" />,
    title: 'Готовность из коробки',
    desc: 'Предустановленная ОС, драйверы и программное обеспечение для вашей отрасли',
    gradient: 'from-cyan-500 to-cyan-600',
  },
]

const stats = [
  { value: '500+', label: 'Успешных внедрений', icon: TrendingUp },
  { value: '15+', label: 'Лет на рынке', icon: Shield },
  { value: '99.8%', label: 'Время безотказной работы', icon: Clock },
]

// --- Анимации ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 12 } }
}

const cardHoverVariants: Variants = {
  hover: {
    y: -8,
    borderColor: "rgba(236, 72, 153, 0.5)",
    boxShadow: "0 20px 40px -10px rgba(236, 72, 153, 0.15)",
    transition: { type: "spring", stiffness: 300, damping: 20 }
  }
}

// --- Фон с частицами ---
const ParticleBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#030303]" />
      
      {/* Анимированные градиентные сферы */}
      <motion.div 
        className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-pink-600/10 blur-[120px]"
        animate={{ x: [0, 80, 0], y: [0, 60, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full bg-blue-600/10 blur-[120px]"
        animate={{ x: [0, -70, 0], y: [0, -50, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      {/* Плавающие частицы */}
      {[...Array(35)].map((_, i) => {
        const x = Math.random() * 100
        const y = Math.random() * 100
        const duration = 15 + Math.random() * 20
        const delay = Math.random() * 5
        const size = Math.random() * 2 + 1
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/20"
            style={{ left: `${x}%`, top: `${y}%`, width: size, height: size }}
            animate={{ y: [0, -35, 0], opacity: [0.15, 0.6, 0.15], scale: [1, 1.4, 1] }}
            transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
          />
        )
      })}

      {/* Тонкая сетка */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
    </div>
  )
}

export default function WhyUs() {
  return (
    <section id="why-us" className="relative py-28 lg:py-36 bg-[#030303] overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Заголовок */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-semibold tracking-wider text-pink-400 uppercase">Наши преимущества</span>
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Почему выбирают <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">нас</span>
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-gray-400 max-w-2xl mx-auto text-lg">
            Мы обеспечиваем полный цикл поддержки — от подбора решения до его внедрения и обслуживания
          </motion.p>
        </motion.div>

        {/* Карточки преимуществ */}
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover="hover"
              className="group relative bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-7 cursor-default overflow-hidden"
            >
              {/* Градиентный фон при наведении */}
              <div className={`absolute inset-0 bg-gradient-to-br ${b.gradient}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Иконка */}
              <motion.div 
                className={`relative w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-gradient-to-br ${b.gradient}/20 border border-white/10 text-white group-hover:scale-110 transition-transform duration-300`}
                whileHover={{ rotate: 5 }}
              >
                {b.icon}
                {/* Свечение иконки */}
                <div className={`absolute inset-0 bg-gradient-to-br ${b.gradient}/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity`} />
              </motion.div>
              
              <h3 className="relative text-lg font-bold text-white mb-2.5 group-hover:text-pink-400 transition-colors">
                {b.title}
              </h3>
              <p className="relative text-sm text-gray-400 leading-relaxed">
                {b.desc}
              </p>
              
              {/* Декоративный уголок */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${b.gradient}/10 rounded-tr-2xl rounded-bl-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Статистика */}
        <motion.div 
          className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Фоновое свечение */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 via-transparent to-blue-500/5" />
          
          <div className="relative z-10 grid sm:grid-cols-3 gap-8 text-center">
            {stats.map((s, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                className="group"
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500/20 to-blue-500/20 flex items-center justify-center group-hover:from-pink-500/30 group-hover:to-blue-500/30 transition-all">
                    <s.icon className="w-6 h-6 text-pink-400" />
                  </div>
                </div>
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {s.value}
                </div>
                <div className="text-gray-400 font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}