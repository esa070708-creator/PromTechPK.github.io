import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import {
  Factory, FlaskConical, Thermometer, Truck,
  Cpu, HardDrive, Server,
  ArrowLeft, ArrowRight, Check, RotateCcw,
  Monitor, Settings, ChevronRight, Wrench,
  Send, Sparkles, Info, X,
  Award, Users, FileText, Zap, Shield, Wifi, HardDriveDownload
} from 'lucide-react'

// --- Интерфейсы ---
interface Option {
  id: string
  icon: React.ReactElement
  title: string
  desc: string
  details: string[]
  specs: string[]
}

interface Step {
  question: string
  subtitle: string
  options: Option[]
}

interface ResultItem {
  name: string
  image: string
  specs: string[]
  price: string
  features: string[]
  description: string
  applications: string[]
  certifications: string[]
  support: string
  components: {
    cpu: { name: string; desc: string; cores: string; tdp: string; features: string[] }
    ram: { name: string; desc: string; speed: string; capacity: string; ecc: boolean }
    storage: { name: string; desc: string; speed: string; endurance: string; interface: string }
    protection: { name: string; desc: string; rating: string; material: string; cooling: string }
  }
}

interface AdvConfig {
  formFactor: string
  cpu: string
  ram: string
  storage: string
  protection: string
  temperature: string
}

interface ModalState {
  isOpen: boolean
  type: 'details' | 'components' | null
  data?: any
}

// --- Данные с расширенной информацией ---
const steps: Step[] = [
  {
    question: 'Где будет использоваться оборудование?',
    subtitle: 'Выберите среду эксплуатации для точного подбора защиты и охлаждения',
    options: [
      {
        id: 'factory',
        icon: <Factory className="w-6 h-6" />,
        title: 'Производственный цех',
        desc: 'Вибрация, пыль, высокие нагрузки',
        details: ['Постоянная вибрация от станков', 'Высокая запылённость', 'Перепады температур', 'Брызги масел и СОЖ'],
        specs: ['IP65', 'Виброустойчивость 5G', 'Алюминиевый корпус']
      },
      {
        id: 'medical',
        icon: <FlaskConical className="w-6 h-6" />,
        title: 'Медицинская лаборатория',
        desc: 'Чистота, требования к материалам',
        details: ['Строгие санитарные нормы', 'Частая дезинфекция', 'Электромагнитная совместимость', 'Бесшумная работа'],
        specs: ['EN 60601-1', 'Антибактериальное покрытие', 'Бесшумный (<20 дБ)']
      },
      {
        id: 'outdoor',
        icon: <Thermometer className="w-6 h-6" />,
        title: 'Уличное применение',
        desc: 'Перепады температур, влажность',
        details: ['Температуры -40...+85°C', 'Осадки и УФ-излучение', 'Конденсат 95%', 'Грозовые перенапряжения'],
        specs: ['IP67', 'Расширенный темп. диапазон', 'Грозозащита']
      },
      {
        id: 'transport',
        icon: <Truck className="w-6 h-6" />,
        title: 'Транспорт',
        desc: 'Экстремальные вибрации, движение',
        details: ['Вибрация до 50G', 'Питание 9-36В DC', 'Связь 4G/5G, GPS', 'Тряска и резкие ускорения'],
        specs: ['MIL-STD-810H', 'Вход 9-36В DC', '4G LTE + GPS']
      },
    ],
  },
  {
    question: 'Какие задачи должен выполнять компьютер?',
    subtitle: 'Определите вычислительные потребности для подбора процессора и памяти',
    options: [
      {
        id: 'scada',
        icon: <Monitor className="w-6 h-6" />,
        title: 'SCADA / Визуализация',
        desc: 'Мониторинг и управление процессами',
        details: ['Мнемосхемы в реальном времени', 'Сбор данных с датчиков', 'Архивирование телеметрии', 'Удалённый доступ'],
        specs: ['Multi-display', '24/7 работа', 'Modbus/OPC UA']
      },
      {
        id: 'edge',
        icon: <Cpu className="w-6 h-6" />,
        title: 'Edge Computing / IoT',
        desc: 'Обработка данных на месте',
        details: ['Фильтрация данных', 'Локальная аналитика', 'Работа без связи', 'Шифрование'],
        specs: ['Low-power CPU', '2x LAN', 'TPM 2.0']
      },
      {
        id: 'ai',
        icon: <Zap className="w-6 h-6" />,
        title: 'AI / Машинное зрение',
        desc: 'Нейросети, распознавание дефектов',
        details: ['Инференс нейросетей', 'Видеопоток 4K', 'Обучение моделей', 'GPU ускорение'],
        specs: ['GPU NVIDIA', '32+ GB RAM', 'PoE+ для камер']
      },
      {
        id: 'control',
        icon: <Settings className="w-6 h-6" />,
        title: 'Управление оборудованием',
        desc: 'PLC, контроллеры, автоматизация',
        details: ['Детерминизм', 'Полевые шины PROFIBUS/CAN', 'Аварийное отключение', 'Интеграция АСУ ТП'],
        specs: ['Real-time OS', 'Изолированные порты', 'Watchdog таймер']
      },
    ],
  },
  {
    question: 'Какой бюджет вы рассматриваете?',
    subtitle: 'Выберите ценовой сегмент для оптимизации конфигурации',
    options: [
      {
        id: 'economy',
        icon: <HardDrive className="w-6 h-6" />,
        title: 'Эконом (до 150 000 руб.)',
        desc: 'Базовые задачи, мониторинг',
        details: ['Простая визуализация', 'Базовая защита', 'Гарантия 1 год', 'Апгрейд в будущем'],
        specs: ['Atom/Celeron', '4-8 GB RAM', 'IP54']
      },
      {
        id: 'standard',
        icon: <Server className="w-6 h-6" />,
        title: 'Стандарт (150 - 350 000 руб.)',
        desc: 'Оптимальное соотношение цена/качество',
        details: ['Баланс надежности', 'Расширенная гарантия', 'Пром. компоненты', '90% задач'],
        specs: ['Core i3/i5', '16 GB ECC', 'IP65']
      },
      {
        id: 'premium',
        icon: <Award className="w-6 h-6" />,
        title: 'Премиум (350 - 700 000 руб.)',
        desc: 'Максимальная надёжность',
        details: ['Долгий срок службы', 'Гарантия 5 лет', 'Поддержка 24/7', 'Сертификация'],
        specs: ['Core i7/Xeon', '32 GB ECC', 'IP67']
      },
      {
        id: 'enterprise',
        icon: <Sparkles className="w-6 h-6" />,
        title: 'Корпоративный (от 700 000 руб.)',
        desc: 'Серверные решения, кластеры',
        details: ['Высокая доступность', 'Полная кастомизация', 'Личный инженер', 'SLA'],
        specs: ['Dual Xeon', '64+ GB RAM', 'RAID']
      },
    ],
  },
]

const resultMap: Record<string, ResultItem> = {
  factory: {
    name: 'IPC-7200 Fanless Panel PC',
    image: 'https://cdn.qwenlm.ai/output/43453c47-3375-4823-b9e4-a74a93e4d0ab/t2i/4bc56ed1-45f9-495c-8cf6-a14b662d1440/17764332412298.png?key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNvdXJjZV91c2VyX2lkIjoiNDM0NTNjNDctMzM3NS00ODIzLWI5ZTQtYTc0YTkzZTRkMGFiIiwicmVzb3VyY2VfaWQiOiIxNzc2NDMzMjQxMjI5OCIsInJlc291cmNlX2NoYXRfaWQiOiJlZTVjNTA5Mi04YzFhLTRhMDEtODNkOC1kOTU2MzMzM2ZiNTcifQ.bL82CbjlrUwsP6aBS-THErnSy_fid4dUR3Ovu5k0dn8&x-oss-process=image/resize,m_mfit,w_450,h_450',
    specs: ['Intel Core i7-12700TE', '16 GB DDR5 ECC', '512 GB NVMe SSD', 'IP65 / -20...+60°C'],
    price: 'от 289 000 руб.',
    features: ['Безвентиляторное охлаждение', 'Виброустойчивость до 5G', 'Защита IP65', 'Расширенный температурный диапазон'],
    description: 'Панельный компьютер промышленного класса для производственных цехов. Алюминиевый корпус обеспечивает теплоотвод без вентиляторов.',
    applications: ['Автопром', 'Металлообработка', 'Пищепром'],
    certifications: ['CE', 'FCC', 'RoHS', 'IP65'],
    support: 'Гарантия 3 года, поддержка 24/7',
    components: {
      cpu: { name: 'Intel Core i7-12700TE', desc: '12 ядер (4P+8E), до 4.7 GHz.', cores: '12 ядер (4 производительных + 8 эффективных)', tdp: '35W TDP', features: ['Intel Turbo Boost до 4.7 GHz', 'Hyper-Threading', 'Intel vPro', 'Виртуализация VT-x/VT-d'] },
      ram: { name: '16 GB DDR5 ECC', desc: 'Память с коррекцией ошибок.', speed: '4800 MHz', capacity: '16 GB (до 64 GB)', ecc: true },
      storage: { name: '512 GB NVMe SSD', desc: 'Промышленный накопитель.', speed: 'Чтение 3500 MB/s', endurance: 'TBW 600', interface: 'PCIe 4.0 x4 NVMe 1.4' },
      protection: { name: 'IP65 + Алюминий', desc: 'Полная защита от пыли и струй воды.', rating: 'IP65', material: 'Алюминий 6061-T6', cooling: 'Пассивное охлаждение' }
    }
  },
  medical: {
    name: 'MPC-2400 Medical Panel PC',
    image: 'https://n-eb.ru/wp-content/uploads/2025/08/9aff70b2a700067562305f6273890892_high.webp',
    specs: ['Intel Core i5-1340PE', '16 GB DDR5', '256 GB SSD', 'IP54 / EN 60601-1'],
    price: 'от 345 000 руб.',
    features: ['Антибактериальное покрытие', 'Сертификация EN 60601-1', 'Бесшумная работа', 'Сенсор с перчатками'],
    description: 'Специализированный медицинский компьютер для лечебных учреждений. Гладкий корпус упрощает дезинфекцию.',
    applications: ['Лаборатории', 'Операционные', 'Реанимация'],
    certifications: ['EN 60601-1', 'FDA', 'IP54'],
    support: 'Гарантия 3 года, сервис в регионах',
    components: {
      cpu: { name: 'Intel Core i5-1340PE', desc: '10 ядер, низкое энергопотребление.', cores: '10 ядер (4P+6E)', tdp: '28W TDP', features: ['Низкое тепловыделение', 'Тихая работа', 'Медицинские стандарты', 'Долгий срок поставки 10+ лет'] },
      ram: { name: '16 GB DDR5', desc: 'Быстрая загрузка снимков КТ/МРТ.', speed: '4800 MHz', capacity: '16 GB (до 64 GB)', ecc: false },
      storage: { name: '256 GB SSD', desc: 'Надежный накопитель.', speed: 'Чтение 550 MB/s', endurance: 'TBW 150', interface: 'SATA III' },
      protection: { name: 'EN 60601-1', desc: 'Медицинский стандарт.', rating: 'IP54 + EN 60601-1', material: 'Антибактериальное покрытие', cooling: 'Бесшумное (<20 дБ)' }
    }
  },
  outdoor: {
    name: 'EPC-5600 Outdoor Embedded PC',
    image: 'https://mirento.ru/wp-content/uploads/2025/04/21.png',
    specs: ['Intel Atom x6425E', '8 GB DDR4', '128 GB SSD MLC', 'IP67 / -40...+85°C'],
    price: 'от 198 000 руб.',
    features: ['Температура -40...+85°C', 'Герметичность IP67', 'Защита от молний', 'Потребление 15 Вт'],
    description: 'Компактный встраиваемый ПК для суровых условий. Герметичный корпус защищает от воды и песка.',
    applications: ['Умные города', 'Транспорт', 'Сельское хозяйство'],
    certifications: ['IP67', 'MIL-STD-810G'],
    support: 'Гарантия 2 года, удаленная диагностика',
    components: {
      cpu: { name: 'Intel Atom x6425E', desc: 'Серия для экстремальных температур.', cores: '4 ядра', tdp: '12W TDP', features: ['-40...+85°C', 'Time Coordinated Computing', 'Функциональная безопасность', 'Сверхнизкое потребление'] },
      ram: { name: '8 GB DDR4', desc: 'Промышленная память.', speed: '3200 MHz', capacity: '8 GB (до 32 GB)', ecc: false },
      storage: { name: '128 GB SSD MLC', desc: 'MLC с повышенным ресурсом.', speed: 'Чтение 500 MB/s', endurance: 'MLC NAND (3x TLC)', interface: 'SATA III (-40...+85°C)' },
      protection: { name: 'IP67 + Супрессоры', desc: 'Герметичность.', rating: 'IP67', material: 'Алюминий + силикон', cooling: 'Пассивное через корпус' }
    }
  },
  transport: {
    name: 'VPC-3200 Vehicle Mount PC',
    image: 'https://zarnitza.ru/upload/resize_cache/iblock/7e5/350_263_140cd750bba9870f18aada2478b24840a/zczhyea96v6yi96ldto85do60x2s3109.jpg',
    specs: ['Intel Core i5-1235U', '16 GB DDR4', '256 GB SSD', 'MIL-STD-810H'],
    price: 'от 267 000 руб.',
    features: ['Стандарт MIL-STD-810H', 'Виброустойчивость 50G', 'Питание 9-36В', 'GPS + 4G + Wi-Fi'],
    description: 'ПК для подвижных объектов. Демпфирующие элементы гасят вибрацию, а защита питания бережет электронику.',
    applications: ['Логистика', 'Спецтехника', 'ЖД транспорт'],
    certifications: ['MIL-STD-810H', 'E-Mark', 'IP66'],
    support: 'Гарантия 3 года, замена в пути',
    components: {
      cpu: { name: 'Intel Core i5-1235U', desc: 'Для транспорта.', cores: '10 ядер (2P+8E)', tdp: '15W TDP', features: ['-40...+70°C', 'Устойчивость к вибрации', 'Быстрый запуск', 'Stable IT Platform'] },
      ram: { name: '16 GB DDR4', desc: 'Антивибрационное крепление.', speed: '3200 MHz', capacity: '16 GB (до 64 GB)', ecc: false },
      storage: { name: '256 GB SSD', desc: 'С виброзащитой.', speed: 'Чтение 550 MB/s', endurance: 'Усиленное крепление', interface: 'SATA III + амортизация' },
      protection: { name: 'MIL-STD-810H', desc: 'Военный стандарт.', rating: 'MIL-STD-810H + IP66', material: 'Алюминий + демпферы', cooling: 'Пассивное с виброразвязкой' }
    }
  },
}

const advancedOptions = {
  formFactor: ['Панельный ПК', 'Встраиваемый ПК', 'Стоечный (19")', 'Безвентиляторный Box PC'],
  cpu: ['Intel Atom x6425E', 'Intel Celeron N5105', 'Intel Core i3-1215UE', 'Intel Core i5-1340PE', 'Intel Core i7-12700TE'],
  ram: ['4 GB DDR4', '8 GB DDR4', '16 GB DDR5', '32 GB DDR5 ECC', '64 GB DDR5 ECC'],
  storage: ['128 GB SSD MLC', '256 GB NVMe SSD', '512 GB NVMe SSD', '1 TB NVMe SSD', '2x 1 TB RAID-1'],
  protection: ['IP20 (Офисные)', 'IP54 (Брызги)', 'IP65 (Струи)', 'IP67 (Герметичность)'],
  temperature: ['-10...+50°C', '-20...+60°C', '-30...+70°C', '-40...+85°C'],
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

// --- Фон ---
const ParticleField = () => {
  const [particles] = useState(() => Array.from({ length: 40 }).map(() => ({
    x: Math.random() * 100, y: Math.random() * 100, duration: 15 + Math.random() * 20, delay: Math.random() * 5, size: Math.random() * 2 + 1
  })))
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-[#030303]" />
      <motion.div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-pink-600/10 blur-[120px]" animate={{ x: [0, 80, 0], y: [0, 40, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} />
      <motion.div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px]" animate={{ x: [0, -60, 0], y: [0, -50, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} />
      {particles.map((p, i) => (
        <motion.div key={i} className="absolute rounded-full bg-white/15" style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }} animate={{ y: [0, -30, 0], opacity: [0.1, 0.5, 0.1] }} transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }} />
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
    </div>
  )
}

// --- Компонент уведомления о переходе ---
const TransitionToast = ({ message }: { message: string }) => (
  <motion.div
    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#0a0a0f] border border-pink-500/30 backdrop-blur-xl rounded-2xl px-6 py-4 shadow-2xl shadow-pink-500/20 flex items-center gap-3"
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 50, scale: 0.9 }}
  >
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-600 to-pink-500 flex items-center justify-center">
      <ArrowRight className="w-4 h-4 text-white animate-pulse" />
    </div>
    <span className="text-white font-medium">{message}</span>
  </motion.div>
)

// --- Основной компонент ---
export default function Configurator() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)
  const [advancedMode, setAdvancedMode] = useState(false)
  const [advConfig, setAdvConfig] = useState<AdvConfig>({ formFactor: '', cpu: '', ram: '', storage: '', protection: '', temperature: '' })
  const [advSubmitted, setAdvSubmitted] = useState(false)
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)
  const [modal, setModal] = useState<ModalState>({ isOpen: false, type: null })
  const [showToast, setShowToast] = useState(false)

  // Блокировка скролла при модалке
  useEffect(() => {
    if (modal.isOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
    return () => { document.body.style.overflow = ''; document.documentElement.style.overflow = '' }
  }, [modal.isOpen])

  const totalSteps = steps.length
  const current = steps[step]
  const result = resultMap[answers[0]] || resultMap['factory']

  const scrollbarStyles = `
    .custom-scrollbar::-webkit-scrollbar { width: 3px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #ec4899, #3b82f6); border-radius: 10px; }
  `

  // --- Сохранение и переход к контактам ---
  function handleRequestProposal(type: 'configurator' | 'advanced', resultData?: ResultItem | null) {
    const data: any = { 
      type, 
      timestamp: new Date().toISOString() 
    }
    
    if (type === 'configurator' && resultData) {
      data.buildInfo = {
        title: resultData.name,
        price: resultData.price,
        description: resultData.description,
        specs: resultData.specs,
        type: 'Автоматический подбор'
      }
    } else if (type === 'advanced') {
      const labels: Record<string, string> = { 
        formFactor: 'Форм-фактор', 
        cpu: 'Процессор', 
        ram: 'ОЗУ', 
        storage: 'Накопитель', 
        protection: 'Защита', 
        temperature: 'Температура' 
      }
      
      data.buildInfo = {
        title: 'Индивидуальная конфигурация',
        price: 'от 312 000 руб. (ориентировочно)',
        description: 'Сборка по индивидуальным параметрам заказчика',
        specs: Object.entries(advConfig).map(([key, val]) => `${labels[key]}: ${val}`),
        type: 'Ручная конфигурация'
      }
    }
    
    // 1. Сохраняем данные
    localStorage.setItem('pendingConfig', JSON.stringify(data))
    
    // 2. Меняем hash (триггерит hashchange в ContactForm)
    window.location.hash = 'contacts'
    
    // 3. Отправляем кастомное событие (дополнительный триггер)
    window.dispatchEvent(new Event('configDataLoaded'))
    
    // 4. Показываем уведомление
    setShowToast(true)
    
    // 5. Плавный скролл к форме (с небольшой задержкой для надёжности)
    setTimeout(() => {
      const contacts = document.getElementById('contacts')
      if (contacts) {
        contacts.scrollIntoView({ behavior: 'smooth' })
      }
      // Скрываем уведомление через 2 секунды
      setTimeout(() => setShowToast(false), 2000)
    }, 150)
  }

  function selectOption(id: string) {
    const next = [...answers]; next[step] = id; setAnswers(next)
  }
  function goNext() { if (step < totalSteps - 1) setStep(step + 1); else setShowResult(true) }
  function goBack() { if (step > 0) setStep(step - 1) }
  function reset() {
    setStep(0); setAnswers([]); setShowResult(false); setAdvancedMode(false); setAdvSubmitted(false)
    setAdvConfig({ formFactor: '', cpu: '', ram: '', storage: '', protection: '', temperature: '' })
  }

  // --- Расширенный режим (форма) ---
  if (advancedMode && !advSubmitted) {
    return (
      <section id="configurator" className="relative py-28 lg:py-36 bg-[#030303] overflow-hidden text-white">
        <ParticleField /><style>{scrollbarStyles}</style>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" initial="hidden" animate="visible" variants={containerVariants}>
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-6 backdrop-blur-sm">
              <Wrench className="w-4 h-4 text-pink-500" /><span className="text-sm font-semibold tracking-wider text-pink-400 uppercase">Ручная конфигурация</span>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-bold text-white mb-4">Соберите <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">идеальное решение</span></motion.h2>
          </motion.div>
          <motion.div className="bg-black/40 border border-white/10 backdrop-blur-xl rounded-3xl p-8 lg:p-10" variants={itemVariants} initial="hidden" animate="visible">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {Object.entries(advancedOptions).map(([key, opts]) => {
                const labels: Record<string, string> = { formFactor: 'Форм-фактор', cpu: 'Процессор', ram: 'Оперативная память', storage: 'Накопитель', protection: 'Класс защиты', temperature: 'Температурный диапазон' }
                return (
                  <div key={key}>
                    <label className="block text-sm font-semibold text-pink-400 mb-3 uppercase tracking-wider">{labels[key]}</label>
                    <select value={(advConfig as any)[key]} onChange={e => setAdvConfig(prev => ({ ...prev, [key]: e.target.value }))} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all appearance-none cursor-pointer">
                      <option value="" className="bg-[#0a0a0f]">-- Выберите --</option>
                      {opts.map(o => <option key={o} value={o} className="bg-[#0a0a0f]">{o}</option>)}
                    </select>
                  </div>
                )
              })}
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-white/10">
              <motion.button onClick={() => setAdvancedMode(false)} className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-pink-500/50 transition-all font-medium" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <ArrowLeft className="w-4 h-4" /> Назад к подбору
              </motion.button>
              <motion.button onClick={() => setAdvSubmitted(true)} disabled={Object.values(advConfig).some(v => !v)} className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 disabled:opacity-40 disabled:cursor-not-allowed text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-pink-500/20" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                Рассчитать конфигурацию <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    )
  }

  // --- Расширенный режим (результат) ---
  if (advSubmitted) {
    return (
      <section id="configurator" className="relative py-28 lg:py-36 bg-[#030303] overflow-hidden text-white">
        <ParticleField /><style>{scrollbarStyles}</style>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" initial="hidden" animate="visible" variants={containerVariants}>
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-full px-4 py-1.5 mb-6"><Check className="w-4 h-4" /> Конфигурация готова</motion.div>
            <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-bold text-white mb-4">Ваша <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">персональная сборка</span></motion.h2>
          </motion.div>
          <motion.div className="bg-black/40 border border-white/10 backdrop-blur-xl rounded-3xl p-8 lg:p-10" variants={itemVariants} initial="hidden" animate="visible">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {Object.entries(advConfig).map(([key, val]) => {
                const labels: Record<string, string> = { formFactor: 'Форм-фактор', cpu: 'Процессор', ram: 'ОЗУ', storage: 'Накопитель', protection: 'Класс защиты', temperature: 'Темп. диапазон' }
                return (
                  <motion.div key={key} className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/10" whileHover={{ borderColor: "#ec4899" }}>
                    <Check className="w-5 h-5 text-pink-500 shrink-0 mt-0.5" />
                    <div><div className="text-xs text-gray-500 uppercase tracking-wider">{labels[key]}</div><div className="text-sm font-semibold text-white mt-1">{val}</div></div>
                  </motion.div>
                )
              })}
            </div>
            <div className="bg-gradient-to-r from-pink-500/10 to-blue-500/10 rounded-2xl p-6 border border-white/10 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center"><Award className="w-6 h-6 text-pink-500" /></div>
                <div><div className="font-bold text-white text-lg">Ориентировочная стоимость</div><div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">от 312 000 руб.</div></div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button 
                onClick={() => handleRequestProposal('advanced')} 
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white px-6 py-4 rounded-xl font-semibold transition-all shadow-lg shadow-pink-500/20"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send className="w-4 h-4" />
                Отправить заявку на эту сборку
              </motion.button>
              <motion.button onClick={reset} className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-pink-500/50 font-medium transition-all" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <RotateCcw className="w-4 h-4" /> Собрать заново
              </motion.button>
            </div>
          </motion.div>
        </div>
        {/* Уведомление о переходе */}
        <AnimatePresence>
          {showToast && <TransitionToast message="📋 Переход к форме заявки..." />}
        </AnimatePresence>
      </section>
    )
  }

  // --- Результат подбора ---
  if (showResult) {
    return (
      <section id="configurator" className="relative py-28 lg:py-36 bg-[#030303] overflow-hidden text-white">
        <ParticleField /><style>{scrollbarStyles}</style>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" initial="hidden" animate="visible" variants={containerVariants}>
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-green-500/20 border border-green-500/30 text-green-400 rounded-full px-4 py-1.5 mb-6"><Check className="w-4 h-4" /> Подбор завершён</motion.div>
            <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-bold text-white mb-4">Рекомендованное <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">решение</span></motion.h2>
          </motion.div>

          <motion.div className="bg-black/40 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden" variants={itemVariants} initial="hidden" animate="visible">
            <div className="grid lg:grid-cols-2">
              <div className="relative bg-gradient-to-br from-pink-500/5 to-blue-500/5 overflow-hidden">
  <motion.img 
    src={result.image} 
    alt={result.name} 
    className="w-full h-full object-cover shadow-2xl shadow-black/50 grayscale hover:grayscale-0 transition-all duration-500" 
    whileHover={{ scale: 1.03 }} 
  />
  <div className="absolute top-4 left-4 bg-gradient-to-r from-pink-600 to-pink-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-pink-500/30">✓ Оптимальный выбор</div>
</div>
              <div className="p-8 lg:p-10 flex flex-col">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">{result.name}</h3>
                <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent mb-6">{result.price}</div>
                <p className="text-gray-300 mb-8 leading-relaxed">{result.description}</p>
                
                <div className="space-y-3 mb-8">
                  <h4 className="text-sm font-semibold text-pink-400 uppercase tracking-wider">Технические характеристики</h4>
                  {result.specs.map((s, i) => (<div key={i} className="flex items-center gap-3 text-sm"><div className="w-1.5 h-1.5 bg-pink-500 rounded-full" /><span className="text-gray-300">{s}</span></div>))}
                </div>
                <div className="space-y-3 mb-8">
                  <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Ключевые преимущества</h4>
                  {result.features.map((f, i) => (<div key={i} className="flex items-start gap-3 text-sm"><Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" /><span className="text-gray-300">{f}</span></div>))}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10"><div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Применение</div><ul className="space-y-1">{result.applications.map((app, i) => <li key={i} className="text-sm text-gray-300">• {app}</li>)}</ul></div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10"><div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Сертификаты</div><ul className="space-y-1">{result.certifications.map((cert, i) => <li key={i} className="text-sm text-gray-300">• {cert}</li>)}</ul></div>
                </div>

                <div className="p-4 bg-gradient-to-r from-pink-500/10 to-blue-500/10 rounded-xl border border-white/10 mb-8">
                  <div className="flex items-center gap-2 mb-2"><Users className="w-4 h-4 text-pink-400" /><span className="text-sm font-semibold text-white">Поддержка</span></div>
                  <p className="text-sm text-gray-400">{result.support}</p>
                </div>

                <div className="mt-auto flex flex-col gap-3">
                  <div className="grid grid-cols-2 gap-4">
                    <motion.button onClick={() => handleRequestProposal('configurator', result)} className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white px-4 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-pink-500/20" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Send className="w-4 h-4" /> Отправить заявку
                    </motion.button>
                    <motion.button onClick={() => setModal({ isOpen: true, type: 'components', data: result })} className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-3 rounded-xl font-medium transition-all" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Cpu className="w-4 h-4" /> О компонентах
                    </motion.button>
                  </div>
                  <motion.button onClick={reset} className="flex items-center justify-center gap-2 text-gray-400 hover:text-white font-medium transition-colors text-sm py-2" whileHover={{ scale: 1.02 }}>
                    <RotateCcw className="w-4 h-4" /> Подобрать другой вариант
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Модальное окно компонентов */}
        <AnimatePresence>
          {modal.isOpen && modal.type === 'components' && modal.data && (
            <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModal({ isOpen: false, type: null })}>
              <motion.div className="bg-[#0a0a0f] border border-white/10 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl shadow-pink-500/10 relative" initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} onClick={e => e.stopPropagation()}>
                <button onClick={() => setModal({ isOpen: false, type: null })} className="absolute top-6 right-6 z-50 w-10 h-10 bg-black/50 hover:bg-pink-500/50 backdrop-blur-md text-white rounded-full flex items-center justify-center transition-colors">
                  <X className="w-5 h-5" />
                </button>
                <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 bg-gradient-to-br from-pink-600 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-pink-500/30"><Cpu className="w-7 h-7" /></div>
                      <div><div className="text-sm text-pink-400 uppercase tracking-wider font-semibold">Детальная информация</div><h3 className="text-2xl font-bold text-white">{modal.data.name}</h3></div>
                    </div>
                    <div className="space-y-6">
                      {Object.entries(modal.data.components).map(([key, comp]: [string, any]) => (
                        <div key={key} className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-pink-500/30 transition-colors">
                          <div className="flex items-center gap-3 mb-3">
                            {key === 'cpu' && <Cpu className="w-5 h-5 text-pink-400" />}
                            {key === 'ram' && <HardDriveDownload className="w-5 h-5 text-blue-400" />}
                            {key === 'storage' && <HardDrive className="w-5 h-5 text-purple-400" />}
                            {key === 'protection' && <Shield className="w-5 h-5 text-green-400" />}
                            <div className="text-sm font-semibold text-pink-400 uppercase tracking-wider">{key}</div>
                          </div>
                          <div className="text-xl font-bold text-white mb-2">{comp.name}</div>
                          <p className="text-gray-400 text-sm mb-4">{comp.desc}</p>
                          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                            {comp.cores && <div className="text-sm"><div className="text-gray-500 text-xs mb-1">Ядра</div><div className="text-white">{comp.cores}</div></div>}
                            {comp.tdp && <div className="text-sm"><div className="text-gray-500 text-xs mb-1">TDP</div><div className="text-white">{comp.tdp}</div></div>}
                            {comp.speed && <div className="text-sm"><div className="text-gray-500 text-xs mb-1">Скорость</div><div className="text-white">{comp.speed}</div></div>}
                            {comp.capacity && <div className="text-sm"><div className="text-gray-500 text-xs mb-1">Ёмкость</div><div className="text-white">{comp.capacity}</div></div>}
                            {comp.rating && <div className="text-sm"><div className="text-gray-500 text-xs mb-1">Рейтинг</div><div className="text-white">{comp.rating}</div></div>}
                            {comp.material && <div className="text-sm"><div className="text-gray-500 text-xs mb-1">Материал</div><div className="text-white">{comp.material}</div></div>}
                          </div>
                          {comp.features && comp.features.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-white/10">
                              <div className="text-sm font-semibold text-white mb-2">Ключевые особенности:</div>
                              <ul className="space-y-1.5">
                                {comp.features.map((feature: string, i: number) => (
                                  <li key={i} className="text-sm text-gray-400 flex items-start gap-2">
                                    <Check className="w-3.5 h-3.5 text-green-400 shrink-0 mt-0.5" />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Уведомление о переходе */}
        <AnimatePresence>
          {showToast && <TransitionToast message="📋 Переход к форме заявки..." />}
        </AnimatePresence>
      </section>
    )
  }

  // --- Основной пошаговый опрос ---
  return (
    <section id="configurator" className="relative py-28 lg:py-36 bg-[#030303] overflow-hidden text-white">
      <ParticleField /><style>{scrollbarStyles}</style>
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="text-center mb-12" initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-5 py-2 mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-pink-500" /><span className="text-sm font-semibold tracking-wider text-pink-400 uppercase">Интеллектуальный подбор</span>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl lg:text-5xl font-bold text-white mb-4">Найдите <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">идеальное оборудование</span></motion.h2>
          <motion.p variants={itemVariants} className="text-gray-400 max-w-2xl mx-auto text-lg">Ответьте на 3 вопроса и получите персональную рекомендацию</motion.p>
        </motion.div>

        <motion.div className="text-center mb-10" variants={itemVariants}>
          <motion.button onClick={() => setAdvancedMode(true)} className="inline-flex items-center gap-2 border border-white/10 text-gray-400 hover:text-white hover:border-pink-500/50 hover:bg-white/5 rounded-full px-5 py-2 text-sm font-medium transition-all" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Wrench className="w-4 h-4" /> Расширенная конфигурация вручную
          </motion.button>
        </motion.div>

        <motion.div className="bg-black/40 border border-white/10 backdrop-blur-xl rounded-3xl p-8 lg:p-10" variants={itemVariants} initial="hidden" animate="visible">
          <div className="flex items-center justify-between mb-10">
            <div className="text-sm font-semibold text-pink-400">Шаг {step + 1} из {totalSteps}</div>
            <div className="flex items-center gap-2.5">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <motion.div key={i} className={`w-3 h-3 rounded-full transition-all duration-300 ${i <= step ? 'bg-gradient-to-r from-pink-500 to-blue-500 scale-110 shadow-lg shadow-pink-500/30' : 'bg-white/10'}`} animate={i === step ? { scale: [1, 1.3, 1] } : {}} transition={{ duration: 0.3 }} />
              ))}
            </div>
          </div>

          <motion.h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">{current.question}</motion.h3>
          <motion.p className="text-gray-400 mb-8 text-lg">{current.subtitle}</motion.p>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {current.options.map((opt) => {
              const selected = answers[step] === opt.id
              const isHovered = hoveredOption === opt.id
              return (
                <motion.button key={opt.id} onClick={() => selectOption(opt.id)} onMouseEnter={() => setHoveredOption(opt.id)} onMouseLeave={() => setHoveredOption(null)} initial="rest" whileHover="hover" className={`relative flex items-start gap-4 p-6 rounded-2xl border-2 text-left transition-all duration-300 group ${selected ? 'border-pink-500 bg-pink-500/10 shadow-lg shadow-pink-500/15' : 'border-white/10 bg-white/5 hover:border-white/30'}`}>
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 z-10 ${selected ? 'bg-gradient-to-br from-pink-600 to-pink-500 text-white shadow-lg shadow-pink-500/30' : 'bg-white/10 text-gray-400 group-hover:text-pink-400 group-hover:bg-pink-500/10'}`}>{opt.icon}</div>
                  <div className="z-10 flex-1"><div className="font-semibold text-white text-base">{opt.title}</div><div className="text-xs text-gray-500 mt-1">{opt.desc}</div></div>
                  {selected && (<motion.div className="absolute top-4 right-4 w-7 h-7 bg-gradient-to-br from-pink-600 to-pink-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-pink-500/30 z-10" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500 }}><Check className="w-4 h-4" /></motion.div>)}
                  
                  {/* Подсказка — без просвечивания карточек */}
                  <AnimatePresence>
                    {isHovered && !selected && (
                      <motion.div 
                        className="absolute -top-3 left-1/2 transform -translate-x-1/2 -translate-y-full w-[340px] z-50 rounded-2xl p-5 border border-pink-500/30 shadow-2xl"
                        style={{ background: '#0a0a0f' }}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }} 
                        animate={{ opacity: 1, y: 0, scale: 1 }} 
                        exit={{ opacity: 0, y: 10, scale: 0.95 }} 
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Info className="w-4 h-4 text-pink-400" />
                          <span className="text-sm font-semibold text-pink-400 uppercase tracking-wider">Подробнее</span>
                        </div>
                        <ul className="space-y-2 mb-4">
                          {opt.details.map((d, i) => (
                            <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                              <ChevronRight className="w-3 h-3 text-pink-500 shrink-0 mt-1" />
                              {d}
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10">
                          {opt.specs.map((s, i) => (
                            <span key={i} className="px-2.5 py-1 bg-pink-500/20 border border-pink-500/30 rounded text-[10px] text-pink-300 font-medium">{s}</span>
                          ))}
                        </div>
                        {/* Стрелочка вниз */}
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 border-r border-b border-pink-500/30 rotate-45" style={{ background: '#0a0a0f' }} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              )
            })}
          </div>

          <div className="flex justify-between items-center pt-6 border-t border-white/10">
            <motion.button onClick={goBack} disabled={step === 0} className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-pink-500/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-medium" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <ArrowLeft className="w-4 h-4" /> Назад
            </motion.button>
            <motion.button onClick={goNext} disabled={!answers[step]} className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 disabled:opacity-40 disabled:cursor-not-allowed text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-pink-500/20" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              {step === totalSteps - 1 ? 'Получить результат' : 'Далее'} <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Уведомление о переходе */}
      <AnimatePresence>
        {showToast && <TransitionToast message="📋 Переход к форме заявки..." />}
      </AnimatePresence>
    </section>
  )
}