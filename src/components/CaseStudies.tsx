import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Car, Flame, UtensilsCrossed, Warehouse, ArrowRight, TrendingUp, Clock, Sparkles, X, CheckCircle2, ChevronRight, Cpu, Settings, Award, Users, MapPin, Send } from 'lucide-react'

// --- Интерфейсы ---
interface CaseItem {
  id: string
  icon: React.ReactElement
  industry: string
  title: string
  task: string
  solution: string
  result: string
  image?: string
  highlight?: { performance: string; downtime: string; timeline: string }
  details?: {
    equipment: string[]
    technologies: string[]
    challenges: string[]
    client: string
    location: string
    duration: string
    teamSize: string
  }
}

interface ModalState {
  isOpen: boolean
  caseId: string | null
}

// --- Данные ---
const cases: CaseItem[] = [
  {
    id: 'auto',
    icon: <Car className="w-5 h-5" />,
    industry: 'Автомобильная промышленность',
    title: 'Цифровизация сборочной линии автозавода',
    task: 'Модернизация системы контроля качества на конвейере с интеграцией машинного зрения',
    solution: 'Развертывание 48 панельных ПК IPC-7200 с GPU-ускорением для анализа дефектов в реальном времени',
    result: 'Повышение выявления дефектов на 95%, сокращение брака на 60%',
    image: 'https://chudo.tech/wp-content/uploads/Snimok-ekrana-2024-11-02-v-09.29.54-copy.jpg',
    highlight: { performance: '+40%', downtime: '-70%', timeline: '2 месяца' },
    details: {
      equipment: ['48x IPC-7200 Panel PCs', 'NVIDIA Jetson AGX Xavier', '4K Industrial Cameras', 'PoE+ Switches'],
      technologies: ['TensorFlow', 'OpenCV', 'CUDA', 'Docker', 'Kubernetes'],
      challenges: ['Интеграция с legacy системами', 'Работа в условиях вибрации', 'Требования к IP65'],
      client: 'Крупный автопроизводитель',
      location: 'г. Калуга, Россия',
      duration: '8 недель',
      teamSize: '12 специалистов'
    }
  },
  {
    id: 'metal',
    icon: <Flame className="w-5 h-5" />,
    industry: 'Металлургия',
    title: 'Металлургический завод',
    task: 'Замена устаревших систем управления производством',
    solution: 'Внедрение 24 промышленных компьютеров с защитой IP67',
    result: 'Повышение эффективности на 35%, снижение простоев на 60%',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Надеждинский_Металлургический_завод.jpg',
    highlight: { performance: '+35%', downtime: '-60%', timeline: '3 месяца' },
    details: {
      equipment: ['24x Rugged IPC-8000', 'Redundant Power Supply', 'Industrial Ethernet Switches'],
      technologies: ['Modbus TCP', 'OPC UA', 'SCADA System', 'Historian Database'],
      challenges: ['Температура до 85°C', 'Металлическая пыль', 'Электромагнитные помехи'],
      client: 'Металлургический комбинат',
      location: 'г. Магнитогорск, Россия',
      duration: '12 недель',
      teamSize: '8 специалистов'
    }
  },
  {
    id: 'food',
    icon: <UtensilsCrossed className="w-5 h-5" />,
    industry: 'Пищевая промышленность',
    title: 'Пищевое производство',
    task: 'Соответствие санитарным нормам и автоматизация линии',
    solution: 'Панельные ПК с гигиеническим исполнением',
    result: '100% соответствие ХАССП, увеличение производительности на 25%',
    image: 'https://www.cleverence.ru/upload/images/articles/1.163.png',
    highlight: { performance: '+25%', downtime: '-45%', timeline: '6 недель' },
    details: {
      equipment: ['16x Stainless Steel Panel PCs', 'Touchscreen Displays', 'Barcode Scanners'],
      technologies: ['HACCP Compliance', 'MES System', 'Traceability Software'],
      challenges: ['Частая мойка', 'Агрессивная химия', 'Влажность 95%'],
      client: 'Пищевой комбинат',
      location: 'г. Москва, Россия',
      duration: '6 недель',
      teamSize: '6 специалистов'
    }
  },
  {
    id: 'logistics',
    icon: <Warehouse className="w-5 h-5" />,
    industry: 'Транспорт',
    title: 'Логистическая компания',
    task: 'Автоматизация складских операций',
    solution: 'Компактные безвентиляторные ПК для складских роботов',
    result: 'Обработка грузов увеличена в 3 раза, ошибок сокращено на 90%',
    image: 'https://avatars.mds.yandex.net/get-altay/12595784/2a0000018f6f94b4efc1b86b34ab9b9eb009/orig',
    highlight: { performance: '+300%', downtime: '-90%', timeline: '4 месяца' },
    details: {
      equipment: ['32x Compact Fanless IPC', 'AGV Robots', 'RFID Readers', 'Wireless APs'],
      technologies: ['ROS (Robot OS)', 'WMS Integration', 'Computer Vision', '5G Network'],
      challenges: ['Пыль', 'Круглосуточная работа', 'Беспроводная связь'],
      client: 'Логистический оператор',
      location: 'г. Санкт-Петербург, Россия',
      duration: '16 недель',
      teamSize: '10 специалистов'
    }
  },
]

// --- Анимации ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 80, damping: 12 }
  }
}

// --- Компонент падающих метеоров (летят ВВЕРХ) ---
const CardMeteorBackground = () => {
  const [meteors, setMeteors] = useState<Array<{ id: number; left: number; delay: number; duration: number; size: number }>>([])

  useEffect(() => {
    const newMeteors = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 2,
      size: 1 + Math.random() * 2,
    }))
    setMeteors(newMeteors)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-xl">
      {meteors.map((meteor) => (
        <motion.div
          key={meteor.id}
          className="absolute"
          style={{
            left: `${meteor.left}%`,
            bottom: -10,
          }}
          initial={{ y: 10, opacity: 0 }}
          animate={{ 
            y: -300, 
            opacity: [0, 0.6, 0.6, 0],
            x: [0, 8, 16]
          }}
          transition={{
            duration: meteor.duration,
            delay: meteor.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div 
            className="bg-gradient-to-t from-pink-500/80 to-transparent rounded-full"
            style={{ 
              width: meteor.size, 
              height: meteor.size * 4,
              filter: 'blur(0.5px)'
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

// --- Компонент частиц фона ---
const ParticleField = () => {
  const [particles, setParticles] = useState<Array<{ x: number; y: number; duration: number; delay: number; size: number }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 5,
      size: Math.random() * 3 + 1
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-[#030303]" />
      
      <motion.div 
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-pink-600/10 blur-[120px]"
        animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px]"
        animate={{ x: [0, -80, 0], y: [0, -60, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute top-[40%] left-[40%] w-[400px] h-[400px] rounded-full bg-purple-600/5 blur-[100px]"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />

      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.1, 0.6, 0.1],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
    </div>
  )
}

export default function CaseStudies() {
  const [modal, setModal] = useState<ModalState>({ isOpen: false, caseId: null })
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const featured = cases[0]
  const rest = cases.slice(1)

  // 🔒 Блокировка скролла при открытом модальном окне
  useEffect(() => {
    if (modal.isOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [modal.isOpen])

  // 🎯 Функция для передачи кейса в форму контактов
  const handleDiscussProject = (caseData: CaseItem) => {
    const data: any = {
      type: 'case' as const,
      timestamp: new Date().toISOString(),
      buildInfo: {
        title: `Проект: ${caseData.title}`,
        price: 'По запросу',
        description: `${caseData.industry}. ${caseData.result}`,
        specs: [
          `Отрасль: ${caseData.industry}`,
          `Результат: ${caseData.result}`,
          `Решение: ${caseData.solution}`
        ],
        type: 'Кейс из портфолио'
      }
    }
    
    console.log('💾 Сохраняем данные кейса:', data)
    localStorage.setItem('pendingConfig', JSON.stringify(data))
    
    // Меняем hash на #contacts
    window.location.hash = 'contacts'
    
    // Отправляем кастомное событие для уведомления формы
    window.dispatchEvent(new Event('configDataLoaded'))
    
    // Закрываем модалку
    setModal({ isOpen: false, caseId: null })
  }

  const handleViewDetails = (caseId: string) => {
    setModal({ isOpen: true, caseId })
  }

  const handleCloseModal = () => {
    setModal({ isOpen: false, caseId: null })
  }

  const selectedCase = modal.caseId ? cases.find(c => c.id === modal.caseId) : null

  return (
    <section id="cases" className="relative py-28 lg:py-36 bg-[#030303] overflow-hidden text-white">
      <ParticleField />

      {/* --- СТИЛИ ДЛЯ СКРОЛЛБАРА --- */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #ec4899, #3b82f6);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ec4899;
        }
      `}</style>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          className="text-center mb-24"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-6 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span className="text-sm font-semibold tracking-wider text-pink-400 uppercase">
              Портфолио проектов
            </span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Успешные <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">внедрения</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Реальные кейсы наших клиентов из различных отраслей промышленности. 
            <br />
            Технологии, которые меняют бизнес.
          </motion.p>
        </motion.div>

        {/* Featured Case */}
        <motion.div 
          className="bg-black/40 border border-white/10 backdrop-blur-xl rounded-2xl overflow-hidden mb-16 group hover:border-pink-500/30 transition-colors duration-500"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
          whileHover={{
            boxShadow: "0 0 50px -15px rgba(236, 72, 153, 0.2)"
          }}
        >
          <div className="grid lg:grid-cols-2">
            <div className="relative overflow-hidden h-[400px] lg:h-auto">
              <motion.div
                className="w-full h-full"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
              >
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </motion.div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <motion.div 
                  className="flex items-center gap-3 mb-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-pink-500/30">
                    {featured.icon}
                  </div>
                  <span className="text-sm font-medium text-white">{featured.industry}</span>
                </motion.div>
              </div>
            </div>
            
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-3xl font-bold text-white mb-6 leading-tight">
                  {featured.title}
                </h3>
                
                <p className="text-gray-400 mb-10 leading-relaxed text-lg">
                  {featured.solution}
                </p>

                {featured.highlight && (
                  <div className="grid grid-cols-3 gap-6 mb-10 pb-10 border-b border-white/10">
                    {[
                      { label: "Производительность", value: featured.highlight.performance, color: "text-pink-500", icon: TrendingUp },
                      { label: "Простой", value: featured.highlight.downtime, color: "text-blue-500", icon: TrendingUp, rotate: true },
                      { label: "Срок", value: featured.highlight.timeline, color: "text-white", icon: Clock }
                    ].map((stat, idx) => (
                      <motion.div 
                        key={idx}
                        className="text-center relative group/stat"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + idx * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2 transition-transform ${stat.rotate ? 'rotate-180' : ''}`} />
                        <div className={`text-2xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover/stat:opacity-100 transition-opacity rounded-lg pointer-events-none" />
                      </motion.div>
                    ))}
                  </div>
                )}
                
                <motion.div 
                  onClick={() => handleViewDetails(featured.id)}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-pink-500/20 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Подробнее о проекте
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Сетка карточек с метеорами внутри */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((c) => (
            <motion.div 
              key={c.id} 
              className="bg-black/40 border border-white/10 backdrop-blur-md rounded-xl cursor-pointer group relative overflow-hidden"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredCard(c.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleViewDetails(c.id)}
            >
              {/* Метеоры внутри карточки (летят вверх) */}
              <CardMeteorBackground />

              {/* Градиентный оверлей при наведении */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-blue-400 group-hover:text-pink-400 group-hover:border-pink-500/30 transition-all duration-300">
                    {c.icon}
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                </div>

                <div className="mb-6">
                  <span className="text-xs font-bold text-pink-500 uppercase tracking-wider mb-2 block">
                    {c.industry}
                  </span>
                  <h4 className="text-xl font-bold text-white mb-4 group-hover:text-white transition-colors line-clamp-2">
                    {c.title}
                  </h4>
                </div>

                <p className="text-sm text-gray-400 mb-6 line-clamp-3 leading-relaxed">
                  {c.solution}
                </p>

                <motion.div 
                  className="flex flex-wrap gap-2"
                  animate={{ opacity: hoveredCard === c.id ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Теги убраны по запросу */}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Модальное окно */}
      <AnimatePresence>
        {modal.isOpen && selectedCase && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div 
              className="bg-[#0a0a0f] border border-white/10 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl shadow-pink-500/10 relative"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Крестик - фиксированный (sticky) */}
              <button 
                onClick={handleCloseModal}
                className="absolute top-6 right-6 z-50 w-10 h-10 bg-black/50 hover:bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Скроллящийся контент с классом custom-scrollbar */}
              <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
                <div className="relative h-64 overflow-hidden rounded-t-3xl">
                  <img 
                    src={selectedCase.image} 
                    alt={selectedCase.title}
                    className="w-full h-full object-cover grayscale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
                  
                  <div className="absolute bottom-6 left-8">
                    <div className="flex items-center gap-2 text-pink-500 mb-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-xs font-bold uppercase tracking-widest">Кейс закрыт</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white">{selectedCase.title}</h2>
                  </div>
                </div>

                <div className="p-8">
                  {/* Быстрая статистика */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 p-6 bg-white/5 rounded-2xl border border-white/5">
                    {selectedCase.highlight && (
                      <>
                        <div className="text-center p-3">
                          <div className="text-2xl font-bold text-pink-500">{selectedCase.highlight.performance}</div>
                          <div className="text-xs text-gray-500 uppercase mt-1">Эффективность</div>
                        </div>
                        <div className="text-center p-3 border-x border-white/10">
                          <div className="text-2xl font-bold text-blue-500">{selectedCase.highlight.downtime}</div>
                          <div className="text-xs text-gray-500 uppercase mt-1">Простой</div>
                        </div>
                        <div className="text-center p-3 border-x border-white/10">
                          <div className="text-2xl font-bold text-white">{selectedCase.highlight.timeline}</div>
                          <div className="text-xs text-gray-500 uppercase mt-1">Реализация</div>
                        </div>
                        <div className="text-center p-3">
                          <Users className="w-6 h-6 text-purple-500 mx-auto mb-1" />
                          <div className="text-lg font-bold text-purple-500">{selectedCase.details?.teamSize}</div>
                          <div className="text-xs text-gray-500 uppercase mt-1">Команда</div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Основная информация */}
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="text-sm font-bold text-pink-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="w-6 h-[1px] bg-gradient-to-r from-pink-500 to-transparent"></span>
                        Задача
                      </h4>
                      <p className="text-gray-300 text-lg leading-relaxed">{selectedCase.task}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-bold text-blue-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="w-6 h-[1px] bg-gradient-to-r from-blue-500 to-transparent"></span>
                        Решение
                      </h4>
                      <p className="text-gray-300 text-lg leading-relaxed">{selectedCase.solution}</p>
                    </div>
                  </div>

                  {/* Детали проекта */}
                  {selectedCase.details && (
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Cpu className="w-4 h-4 text-pink-500" />
                          Оборудование
                        </h4>
                        <ul className="space-y-2">
                          {selectedCase.details.equipment.map((item, i) => (
                            <li key={i} className="text-gray-400 text-sm flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-pink-500 rounded-full" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Settings className="w-4 h-4 text-blue-500" />
                          Технологии
                        </h4>
                        <ul className="space-y-2">
                          {selectedCase.details.technologies.map((item, i) => (
                            <li key={i} className="text-gray-400 text-sm flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                          <Award className="w-4 h-4 text-yellow-500" />
                          Вызовы
                        </h4>
                        <ul className="space-y-2">
                          {selectedCase.details.challenges.map((item, i) => (
                            <li key={i} className="text-gray-400 text-sm flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-green-500" />
                          Информация
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Клиент:</span>
                            <span className="text-gray-300">{selectedCase.details.client}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Локация:</span>
                            <span className="text-gray-300">{selectedCase.details.location}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Длительность:</span>
                            <span className="text-gray-300">{selectedCase.details.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-3 flex items-center gap-2">
                      <span className="w-6 h-[1px] bg-gradient-to-r from-white to-transparent"></span>
                      Результат
                    </h4>
                    <div className="p-6 bg-gradient-to-r from-pink-500/10 to-blue-500/10 border border-white/10 rounded-xl">
                      <p className="text-white font-medium text-lg">{selectedCase.result}</p>
                    </div>
                  </div>

                  {/* Кнопка "Обсудить подобный проект" с передачей данных кейса */}
                  <div className="flex gap-4 mt-10 pt-8 border-t border-white/10">
                    <motion.button
                      onClick={() => handleDiscussProject(selectedCase)}
                      className="flex-1 px-8 py-4 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white rounded-xl font-bold transition-all shadow-lg shadow-pink-500/20 flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Send className="w-4 h-4" />
                      Обсудить подобный проект
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}