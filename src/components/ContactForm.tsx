import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Download, CheckCircle2, AlertCircle, X, FileText, Cpu, Zap, Check } from 'lucide-react'

// --- Интерфейс для переданной конфигурации ---
interface ConfigData {
  type: 'configurator' | 'advanced' | 'case'
  result?: {
    name: string
    price: string
    specs: string[]
    features: string[]
    description: string
  }
  advConfig?: {
    formFactor: string
    cpu: string
    ram: string
    storage: string
    protection: string
    temperature: string
  }
  timestamp: string
}

// --- Анимации ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 12 } }
}

// --- Фон с частицами ---
const ParticleField = () => {
  const [particles] = useState(() =>
    Array.from({ length: 40 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 5,
      size: Math.random() * 2 + 1
    }))
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-[#030303]" />
      <motion.div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-pink-600/10 blur-[120px]" animate={{ x: [0, 100, 0], y: [0, 50, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} />
      <motion.div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px]" animate={{ x: [0, -80, 0], y: [0, -60, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
      {particles.map((p, i) => (
        <motion.div key={i} className="absolute rounded-full bg-white/15" style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }} animate={{ y: [0, -40, 0], opacity: [0.1, 0.5, 0.1] }} transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }} />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
    </div>
  )
}

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', comment: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [configData, setConfigData] = useState<ConfigData | null>(null)
  const [showConfig, setShowConfig] = useState(true)
  const [agree, setAgree] = useState(false)

  // 🔍 Функция загрузки конфигурации
  const loadConfigFromStorage = () => {
    const saved = localStorage.getItem('pendingConfig')
    console.log('🔍 Проверка localStorage:', saved)
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        console.log('✅ Данные получены:', parsed)
        
        const configData: ConfigData = {
          type: parsed.type,
          timestamp: parsed.timestamp,
          result: parsed.buildInfo ? {
            name: parsed.buildInfo.title,
            price: parsed.buildInfo.price,
            specs: parsed.buildInfo.specs || [],
            features: [],
            description: parsed.buildInfo.description
          } : undefined,
          advConfig: parsed.advConfig
        }
        
        setConfigData(configData)
        
        // Автозаполнение комментария
        if (parsed.buildInfo) {
          const commentText = `📦 ${parsed.buildInfo.title}\n💰 ${parsed.buildInfo.price}\n📋 ${parsed.buildInfo.description}\n\n🔧 Характеристики:\n${(parsed.buildInfo.specs || []).join('\n')}`
          console.log('📝 Автозаполнение комментария:', commentText)
          setForm(prev => ({
            ...prev,
            comment: commentText
          }))
        }
        
        // Очищаем после прочтения
        localStorage.removeItem('pendingConfig')
        console.log('🗑️ localStorage очищен')
        return true
      } catch (e) {
        console.error('❌ Ошибка парсинга:', e)
      }
    }
    return false
  }

  useEffect(() => {
    // 1. Проверяем сразу при монтировании
    loadConfigFromStorage()
    
    // 2. Проверяем когда меняется hash на #contacts
    const handleHashChange = () => {
      console.log('📍 Hash изменился на:', window.location.hash)
      if (window.location.hash === '#contacts') {
        setTimeout(() => {
          loadConfigFromStorage()
        }, 100)
      }
    }
    
    window.addEventListener('hashchange', handleHashChange)
    
    // 3. Проверяем каждые 300ms в течение 5 секунд (на случай если данные сохранятся позже)
    const interval = setInterval(() => {
      const loaded = loadConfigFromStorage()
      if (loaded) {
        console.log('✅ Данные загружены через интервал')
        clearInterval(interval)
      }
    }, 300)
    
    // Очищаем интервал через 5 секунд
    setTimeout(() => {
      clearInterval(interval)
      console.log('⏱️ Интервал проверки остановлен')
    }, 5000)
    
    // 4. Слушаем кастомное событие (если CaseStudies его отправит)
    const handleConfigEvent = () => {
      console.log('📡 Получено кастомное событие configData')
      setTimeout(() => {
        loadConfigFromStorage()
      }, 50)
    }
    
    window.addEventListener('configDataLoaded', handleConfigEvent)
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      window.removeEventListener('configDataLoaded', handleConfigEvent)
      clearInterval(interval)
    }
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const newErrors: Record<string, boolean> = {}
    if (!form.name.trim()) newErrors.name = true
    if (!form.email.trim()) newErrors.email = true
    if (!form.phone.trim()) newErrors.phone = true
    if (!agree) newErrors.agree = true
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 8000)
  }

  function handleChange(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => { const n = { ...prev }; delete n[field]; return n })
  }

  // --- Стили для скроллбара ---
  const scrollbarStyles = `
    .custom-scrollbar::-webkit-scrollbar { width: 3px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #ec4899, #3b82f6); border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #ec4899; }
  `

  return (
    <section id="contacts" className="relative py-28 lg:py-36 bg-[#030303] overflow-hidden text-white">
      <ParticleField />
      <style>{scrollbarStyles}</style>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="grid lg:grid-cols-2 gap-10 lg:gap-16" variants={containerVariants} initial="hidden" animate="visible">
          
          {/* === Форма === */}
          <motion.div className="bg-black/40 border border-white/10 backdrop-blur-xl rounded-3xl p-8 lg:p-10 order-2 lg:order-1" variants={itemVariants}>
            {submitted ? (
              <motion.div className="flex flex-col items-center justify-center py-16 text-center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
                <motion.div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/30" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.5 }}>
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-3">Заявка отправлена!</h3>
                <p className="text-gray-400 max-w-sm">Наш инженер свяжется с вами в течение 15 минут в рабочее время. Проверьте почту — мы отправили подтверждение.</p>
                <motion.button onClick={() => setSubmitted(false)} className="mt-6 text-pink-400 hover:text-pink-300 font-medium flex items-center gap-2" whileHover={{ scale: 1.03 }}>
                  <X className="w-4 h-4" /> Отправить ещё одну заявку
                </motion.button>
              </motion.div>
            ) : (
              <>
                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-bold text-white mb-2">Получить консультацию</h3>
                  <p className="text-gray-400 text-sm mb-8">Наш инженер свяжется с вами в течение 15 минут</p>
                </motion.div>

                {/* === Блок с конфигурацией (если есть) === */}
                <AnimatePresence>
                  {configData && showConfig && (
                    <motion.div 
                      className="mb-8 p-6 bg-gradient-to-r from-pink-500/10 to-blue-500/10 rounded-2xl border border-white/10 relative"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <button onClick={() => setShowConfig(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                      
                      <div className="flex items-center gap-3 mb-4">
                        <FileText className="w-5 h-5 text-pink-400" />
                        <h4 className="font-semibold text-white">Прикреплённая конфигурация</h4>
                      </div>

                      {configData.result && (
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <Cpu className="w-4 h-4 text-pink-400 shrink-0 mt-1" />
                            <div>
                              <div className="text-sm text-gray-500">Модель</div>
                              <div className="text-white font-medium">{configData.result.name}</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <Zap className="w-4 h-4 text-blue-400 shrink-0 mt-1" />
                            <div>
                              <div className="text-sm text-gray-500">Ориентировочная цена</div>
                              <div className="text-white font-medium">{configData.result.price}</div>
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 mb-2">Характеристики</div>
                            <div className="flex flex-wrap gap-2">
                              {configData.result.specs.slice(0, 4).map((spec, i) => (
                                <span key={i} className="px-2.5 py-1 bg-white/10 rounded text-xs text-gray-300">{spec}</span>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-400 italic border-l-2 border-pink-500/50 pl-3">
                            "{configData.result.description.slice(0, 150)}..."
                          </p>
                        </div>
                      )}

                      {configData.advConfig && (
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries(configData.advConfig).map(([key, val]) => (
                            <div key={key} className="text-sm">
                              <div className="text-gray-500 capitalize">{key}:</div>
                              <div className="text-white font-medium">{val}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    { field: 'name', label: 'Имя *', type: 'text', placeholder: 'Ваше имя' },
                    { field: 'company', label: 'Компания', type: 'text', placeholder: 'Название организации' },
                    { field: 'email', label: 'Email *', type: 'email', placeholder: 'you@company.com' },
                    { field: 'phone', label: 'Телефон *', type: 'tel', placeholder: '+7 (___) ___-__-__' }
                  ].map(({ field, label, type, placeholder }) => (
                    <motion.div key={field} variants={itemVariants}>
                      <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={(form as any)[field]}
                        onChange={e => handleChange(field, e.target.value)}
                        className={`w-full bg-black/50 border rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all ${errors[field] ? 'border-red-500 bg-red-500/10' : 'border-white/10'}`}
                      />
                      {errors[field] && (
                        <motion.p className="text-xs text-red-400 mt-1.5 flex items-center gap-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                          <AlertCircle className="w-3 h-3" /> Обязательное поле
                        </motion.p>
                      )}
                    </motion.div>
                  ))}

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Комментарий</label>
                    <textarea
                      placeholder="Опишите вашу задачу или уточните требования..."
                      rows={4}
                      value={form.comment}
                      onChange={e => handleChange('comment', e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all resize-none custom-scrollbar"
                    />
                  </motion.div>

                  {/* Чекбокс согласия */}
                  <div className="flex items-start gap-3 mb-2">
                    <div className="relative flex items-center mt-0.5">
                      <input
                        type="checkbox"
                        id="agree"
                        checked={agree}
                        onChange={e => setAgree(e.target.checked)}
                        className="peer sr-only"
                      />
                      <label
                        htmlFor="agree"
                        className={`w-5 h-5 rounded-md border cursor-pointer flex items-center justify-center transition-all duration-200 ${
                          agree
                            ? 'bg-gradient-to-r from-pink-600 to-pink-500 border-pink-500 shadow-lg shadow-pink-500/30'
                            : errors.agree
                            ? 'bg-red-500/10 border-red-500'
                            : 'bg-black/50 border-white/20 hover:border-pink-500/50'
                        }`}
                      >
                        {agree && <Check className="w-3.5 h-3.5 text-white" />}
                      </label>
                    </div>
                    <label htmlFor="agree" className="text-xs text-gray-400 cursor-pointer select-none leading-relaxed">
                      Я соглашаюсь на{' '}
                      <a href="/privacy" className="text-pink-400 hover:text-pink-300 underline transition-colors">
                        обработку персональных данных
                      </a>
                      {errors.agree && (
                        <motion.p 
                          className="text-xs text-red-400 mt-1.5 flex items-center gap-1" 
                          initial={{ opacity: 0, y: -5 }} 
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <AlertCircle className="w-3 h-3" /> Обязательно
                        </motion.p>
                      )}
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-pink-500/25 active:scale-[0.98]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Send className="w-5 h-5" />
                    Получить консультацию
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>

          {/* === Контактная информация === */}
          <motion.div className="order-1 lg:order-2 space-y-8" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-white mb-8">Свяжитесь с нами удобным способом</h3>
              
              <div className="space-y-6">
                {[
                  { icon: Phone, title: '+7 (495) 123-45-67', subtitle: 'Бесплатные звонки по России', href: 'tel:+74951234567', accent: 'text-pink-400' },
                  { icon: Mail, title: 'info@promtechcomp.ru', subtitle: 'Ответим в течение часа', href: 'mailto:info@promtechcomp.ru', accent: 'text-blue-400' },
                  { icon: MapPin, title: 'г. Москва, ул. Промышленная, 15', subtitle: 'БЦ «Технопарк», офис 412', href: '#', accent: 'text-pink-400' },
                  { icon: Clock, title: 'Пн-Пт: 9:00 - 18:00', subtitle: 'Техподдержка 24/7', href: '#', accent: 'text-blue-400' }
                ].map((item, i) => (
                  <motion.a 
                    key={i} 
                    href={item.href}
                    className="flex items-start gap-4 group"
                    whileHover={{ x: 4 }}
                    variants={itemVariants}
                  >
                    <div className={`w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:border-pink-500/50 group-hover:bg-pink-500/10 transition-all ${item.accent}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white group-hover:text-pink-400 transition-colors">{item.title}</div>
                      <div className={`text-sm ${item.accent.includes('pink') ? 'text-pink-400' : 'text-blue-400'} font-medium`}>{item.subtitle}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Мессенджеры */}
            <motion.div variants={itemVariants} className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-sm font-semibold text-white mb-4">Предпочитаете другие способы связи?</p>
              <div className="space-y-3">
                {[
                  { icon: MessageCircle, title: 'Telegram', subtitle: '@industrial_pc_support', color: 'text-blue-400', href: '#' },
                  { icon: Phone, title: 'WhatsApp', subtitle: '+7 (495) 123-45-67', color: 'text-green-400', href: '#' },
                  { icon: Download, title: 'Скачать полный каталог', subtitle: 'PDF, 1 МБ', color: 'text-pink-400', href: '/catalog.pdf' }
                ].map((m, i) => (
                  <motion.a 
                    key={i}
                    href={m.href}
                    className="flex items-center gap-3 bg-black/30 rounded-xl px-4 py-3 border border-white/10 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <m.icon className={`w-5 h-5 ${m.color}`} />
                    <div>
                      <div className="text-sm font-medium text-white group-hover:text-pink-400 transition-colors">{m.title}</div>
                      <div className="text-xs text-gray-500">{m.subtitle}</div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}