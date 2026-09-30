import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react'

// ── ICONS ─────────────────────────────────────────────
const ICON_PATHS = {
  globe: 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 0c2.8 2.7 4 6.2 4 10s-1.2 7.3-4 10m0-20C9.2 4.7 8 8.2 8 12s1.2 7.3 4 10M2.5 9h19M2.5 15h19',
  phone: 'M8 2h8a2 2 0 012 2v16a2 2 0 01-2 2H8a2 2 0 01-2-2V4a2 2 0 012-2zm3 17h2',
  bag: 'M5 8h14l-1 12a2 2 0 01-2 2H8a2 2 0 01-2-2L5 8zm4 0V6a3 3 0 016 0v2',
  search: 'M11 4a7 7 0 100 14 7 7 0 000-14zm9 16l-4-4',
  pen: 'M4 20l4-1 11-11-3-3L5 16l-1 4zM14 6l3 3',
  code: 'M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16',
  rocket: 'M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2m-.5-4.5L12 18c4-2 8-6 8-14-8 0-12 4-14 8l1.5 1.5zM15 9a1 1 0 100-2 1 1 0 000 2z',
  car: 'M5 17h14M5 17a2 2 0 104 0M15 17a2 2 0 104 0M3 17v-5l2-5h14l2 5v5M3 12h18',
  leaf: 'M5 21c0-9 5-15 16-16-1 11-7 16-16 16zm0 0l8-8',
  megaphone: 'M3 10v4a1 1 0 001 1h3l6 4V5L7 9H4a1 1 0 00-1 1zm15-2a5 5 0 010 8',
  lock: 'M6 11h12v10H6V11zm2 0V7a4 4 0 018 0v4',
  bot: 'M12 3v3M6 8h12a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2v-8a2 2 0 012-2zm3 5v1m6-1v1',
  cart: 'M3 4h2l2.5 11h10L20 7H6.5M9 20a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z',
  mail: 'M3 6h18v12H3V6zm0 0l9 7 9-7',
  call: 'M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z',
  chat: 'M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z',
  linkedin: 'M4 9h4v11H4V9zm2-6a2 2 0 110 4 2 2 0 010-4zm4 6h4v2c.6-1.2 2-2.2 4-2.2 3 0 4 2 4 5V20h-4v-5.5c0-1.4-.5-2.5-1.8-2.5S14 13 14 14.5V20h-4V9z',
  github: 'M9 19c-4 1.5-4-2-6-2.5m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 00-1.3-3.2 4.2 4.2 0 00-.1-3.2s-1-.3-3.4 1.3a11.8 11.8 0 00-6.2 0C6.6 1.3 5.6 1.6 5.6 1.6a4.2 4.2 0 00-.1 3.2A4.6 4.6 0 004.2 8c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V22',
  arrow: 'M5 12h14m-6-6l6 6-6 6',
  arrowUp: 'M12 19V5m-6 6l6-6 6 6',
  check: 'M5 12l5 5 9-10',
  sun: 'M12 4V2m0 20v-2m8-8h2M2 12h2m13.7-5.7l1.4-1.4M4.9 19.1l1.4-1.4m0-11.4L4.9 4.9m14.2 14.2l-1.4-1.4M12 7a5 5 0 100 10 5 5 0 000-10z',
  moon: 'M21 13A9 9 0 1111 3a7 7 0 0010 10z',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zm-3 9l2 2 4-4',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7l1-8z',
  sparkle: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z',
  clock: 'M12 3a9 9 0 100 18 9 9 0 000-18zm0 4v5l3 2',
}

function Icon({ name, size = 20, stroke = 1.6, className }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={ICON_PATHS[name]} />
    </svg>
  )
}

// ── DATA ──────────────────────────────────────────────
const WHATSAPP = 'https://wa.me/917200250454'

const NAV = [
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Work' },
  { id: 'process', label: 'Process' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'team', label: 'Team' },
  { id: 'faq', label: 'FAQ' },
]

const SERVICES = [
  { icon: 'globe', title: 'Web Development', desc: 'Custom-built, responsive websites with modern frameworks, blazing-fast performance, and pixel-perfect design.', points: ['React & Next.js', 'SEO-ready', '95+ Lighthouse'] },
  { icon: 'phone', title: 'App Development', desc: 'Cross-platform mobile applications with intuitive UX, real-time features, and smooth animations.', points: ['iOS & Android', 'Realtime sync', 'PWA support'] },
  { icon: 'bag', title: 'E-Commerce Solutions', desc: 'Full-stack online stores with secure payments, inventory management, and analytics dashboards.', points: ['Payments & UPI', 'Inventory', 'Analytics'] },
]

const GITHUB = 'https://github.com/samuelSS1602'

const PROJECT_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web' },
  { id: 'ai', label: 'AI' },
  { id: 'iot', label: 'IoT' },
]

// `img` — basename in /public/projects (served as -720.webp and -1400.webp).
// `live` — deployed URL; the live-site button only appears once this is filled in.
const PROJECTS = [
  {
    id: 'spp', kind: 'web', category: 'Web / Business', title: 'Sri Padmavati Pleasants',
    desc: 'Responsive business website with room listings, booking inquiry and contact flows, built for performance, SEO and cross-device usability.',
    tech: ['React', 'Node.js', 'Firebase', 'GCP'],
    live: 'https://www.sripadmavatipleasants.com/', github: `${GITHUB}/SPP`, url: 'sripadmavatipleasants.com',
  },
  {
    id: 'lodge', kind: 'web', category: 'Web / Lodge Management', title: 'Lodge Management & Guest CRM',
    desc: 'Centralized lodge operations dashboard for managing reservations, rooms, guests, check-ins, check-outs, billing and day-to-day operational records.',
    tech: ['React', 'Node.js', 'Firebase', 'GCP'],
    live: 'https://spp-admin-alpha.vercel.app/', github: `${GITHUB}/SPP-ADMIN`, url: 'spp-admin-alpha.vercel.app',
  },
  {
    id: 'speakup', kind: 'ai', category: 'AI / EdTech', title: 'Nice SpeakUp',
    desc: 'AI speaking coach for children aged 6–12 that builds communication and soft skills through voice-first conversations with Pip, games and learning missions — with XP, streaks and parent & teacher insights.',
    tech: ['React', 'React Router', 'Framer Motion', 'Tailwind CSS', 'Web Speech API'],
    live: 'https://testnice-silk.vercel.app/', url: 'testnice-silk.vercel.app',
  },
  {
    id: 'agri', kind: 'ai', category: 'AI / Agritech', title: 'AGRI-AI Assistant',
    desc: 'Voice-enabled agricultural assistant combining speech, text and images with multilingual AI for crop guidance, weather information and plant-disease support.',
    tech: ['React Native', 'FastAPI', 'MongoDB', 'AI4Bharat', 'Python'],
    github: `${GITHUB}/AGRI-SMART`, url: 'github.com/samuelSS1602/AGRI-SMART',
  },
  {
    id: 'iot', kind: 'iot', category: 'IoT / Smart City', title: 'Smart Garbage Management',
    desc: 'IoT-based monitoring and vehicle allocation concept using sensor data, Firebase and a web dashboard to improve waste collection efficiency.',
    tech: ['React', 'Python', 'Django', 'IoT Sensors', 'ESP8266'],
    github: GITHUB, url: 'github.com/samuelSS1602',
  },
  {
    id: 'nutri', kind: 'ai', category: 'AI / Health & Nutrition', title: 'NutriEats',
    desc: 'Nutrition-focused food application designed to help users discover meals and make healthier food choices through a focused, accessible experience.',
    tech: ['React', 'AI Recommendations', 'Nutrition', 'Responsive UI'],
    github: `${GITHUB}/NUTRI-EATS`, url: 'github.com/samuelSS1602/NUTRI-EATS',
  },
  {
    id: 'pricewatch', kind: 'web', category: 'Web / E-Commerce', title: 'PriceWatch',
    desc: 'Web-based price comparison and tracking platform that compares products across stores, shows historical price trends and sends alerts when products reach a target price.',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Node.js'],
    github: `${GITHUB}/PRICE-WATCH`, url: 'github.com/samuelSS1602/PRICE-WATCH',
  },
  {
    id: 'crime', kind: 'web', category: 'Web / Civic Tech', title: 'CrimeRegistry',
    desc: 'Web-based crime reporting and complaint management system for citizen registration, online complaint filing, case tracking and police case administration.',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    github: `${GITHUB}/CRIME-REPORTING-SYSTEM`, url: 'github.com/samuelSS1602/CRIME-REPORTING-SYSTEM',
  },
].map((p, i) => ({ ...p, no: String(i + 1).padStart(2, '0'), img: p.id }))

const PROCESS_STEPS = [
  { num: '01', title: 'Discovery', desc: 'Understanding your goals, audience, and requirements.', icon: 'search', time: 'Day 1–2' },
  { num: '02', title: 'Design', desc: 'Crafting wireframes, mockups, and visual identity.', icon: 'pen', time: 'Day 3–5' },
  { num: '03', title: 'Develop', desc: 'Building with modern tech stacks and best practices.', icon: 'code', time: 'Week 2–3' },
  { num: '04', title: 'Deploy', desc: 'Launching, testing, and providing ongoing support.', icon: 'rocket', time: 'Launch day' },
]

const TECH_STACK = [
  { name: 'React', color: '#61dafb' }, { name: 'Node.js', color: '#68a063' },
  { name: 'Firebase', color: '#ffca28' }, { name: 'MongoDB', color: '#4db33d' },
  { name: 'Python', color: '#3776ab' }, { name: 'Django', color: '#44b78b' },
  { name: 'JavaScript', color: '#f7df1e' }, { name: 'TypeScript', color: '#3178c6' },
  { name: 'HTML5', color: '#e34f26' }, { name: 'CSS3', color: '#1572b6' },
  { name: 'Git', color: '#f05032' }, { name: 'Figma', color: '#a259ff' },
  { name: 'VS Code', color: '#007acc' }, { name: 'Vite', color: '#646cff' },
  { name: 'Tailwind', color: '#38bdf8' }, { name: 'Next.js', color: '#a1a1aa' },
]

const STATS = [
  { count: 10, suffix: '+', label: 'Projects shipped' },
  { count: 15, suffix: '+', label: 'Happy clients' },
  { count: 4, suffix: '+', label: 'Years of craft' },
  { count: 100, suffix: '%', label: 'On-time delivery' },
]

// Placeholder quotes — replace with real client testimonials before going live.
const TESTIMONIALS = [
  { name: 'Arjun M.', role: 'Founder, Local Retail Brand', quote: 'They took our rough idea and turned it into a store that actually sells. Orders doubled in the first month.' },
  { name: 'Priya R.', role: 'Clinic Owner', quote: 'Professional, fast and genuinely caring. Our booking site looks better than clinics ten times our size.' },
  { name: 'Karthik S.', role: 'Startup Co-founder', quote: 'The attention to detail is unreal. Every animation, every pixel — it just feels premium.' },
  { name: 'Divya N.', role: 'Event Organizer', quote: 'Delivered ahead of schedule and handled every change request without a fuss. Highly recommend.' },
  { name: 'Rohan T.', role: 'Restaurant Owner', quote: 'Our new site brings in reservations every single day. Best investment we made this year.' },
]

const PRICING = [
  {
    tier: 'Starter', price: '₹4,999', period: 'per project', popular: false, blurb: 'Perfect for a sharp online presence.',
    features: ['Single-page website', 'Responsive design', 'Contact form', 'SEO basics', '1 revision round', '5-day delivery'],
  },
  {
    tier: 'Professional', price: '₹14,999', period: 'per project', popular: true, blurb: 'For businesses ready to grow.',
    features: ['Multi-page website', 'Custom UI/UX design', 'CMS integration', 'Advanced SEO', '3 revision rounds', 'Performance optimization', 'Analytics setup', '10-day delivery'],
  },
  {
    tier: 'Enterprise', price: 'Custom', period: 'tailored quote', popular: false, blurb: 'Full-stack products, end to end.',
    features: ['Full-stack application', 'Custom backend & API', 'Database design', 'Payment integration', 'Unlimited revisions', 'Priority support', 'DevOps & hosting', 'Ongoing maintenance'],
  },
]

const GUARANTEES = [
  { icon: 'shield', title: '30-day free fixes', desc: 'Every launch is covered.' },
  { icon: 'bolt', title: 'Blazing performance', desc: 'Built to load in a blink.' },
  { icon: 'clock', title: 'Reply within 24h', desc: 'We never leave you waiting.' },
  { icon: 'sparkle', title: 'Pay in milestones', desc: '50% upfront, 50% on delivery.' },
]

const FAQS = [
  { q: 'How long does it take to build a website?', a: 'Timelines vary based on complexity. A simple landing page takes 5–7 days, while a full-stack web application can take 3–6 weeks. We provide a detailed timeline after our initial discovery call.' },
  { q: 'What technologies do you use?', a: 'We work with modern frameworks like React, Next.js, Node.js, Firebase, MongoDB, and Python/Django. We choose the best stack based on your project requirements, scalability needs, and budget.' },
  { q: 'Do you offer post-launch support?', a: 'Yes! All our packages include 30 days of free bug fixes after launch. We also offer ongoing maintenance plans for continued support, feature additions, and performance monitoring.' },
  { q: 'Can you redesign my existing website?', a: "Absolutely. We specialize in redesigning and modernizing existing websites while preserving your content and SEO rankings. We'll give your site a fresh, professional look with improved performance." },
  { q: 'What is your payment structure?', a: 'We typically require 50% upfront to begin work and 50% upon completion. For larger projects, we can arrange milestone-based payments. We accept UPI, bank transfers, and online payments.' },
  { q: 'Do you build mobile apps?', a: 'Yes! We build cross-platform mobile applications using React Native and Flutter, as well as progressive web apps (PWAs) that work seamlessly across all devices.' },
]

const BLOGS = [
  { title: 'Why Every Small Business Needs a Website in 2025', category: 'Business', date: 'Jul 25, 2025', readTime: '5 min read', hue: '150' },
  { title: 'React vs Next.js: Choosing the Right Framework', category: 'Technology', date: 'Jul 18, 2025', readTime: '8 min read', hue: '214' },
  { title: 'The Ultimate Guide to SEO for New Websites', category: 'Marketing', date: 'Jul 10, 2025', readTime: '6 min read', hue: '262' },
]

const CLIENT_LOGOS = ['TechVentures', 'GreenLeaf Co.', 'UrbanNest', 'DataFlow', 'CloudPeak', 'SwiftServe']
const ROTATING_WORDS = ['sell', 'convert', 'scale', 'delight']

// ── SMALL COMPONENTS ──────────────────────────────────
function Counter({ to, suffix }) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const dur = 1800
      const tick = (now) => {
        const t = Math.min((now - start) / dur, 1)
        setVal(Math.round(to * (1 - Math.pow(1 - t, 4))))
        if (t < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.6 })
    io.observe(el)
    return () => io.disconnect()
  }, [to])
  return <span ref={ref}>{val}{suffix}</span>
}

// Magnetic hover: element drifts toward the pointer.
function magnet(e) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = e.clientX - r.left - r.width / 2
  const y = e.clientY - r.top - r.height / 2
  el.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`
}
function unmagnet(e) { e.currentTarget.style.transform = '' }

// 3D tilt + spotlight position via CSS vars.
function tilt(e) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const px = (e.clientX - r.left) / r.width
  const py = (e.clientY - r.top) / r.height
  el.style.setProperty('--mx', px * 100 + '%')
  el.style.setProperty('--my', py * 100 + '%')
  el.style.setProperty('--rx', (0.5 - py) * 8 + 'deg')
  el.style.setProperty('--ry', (px - 0.5) * 10 + 'deg')
}
function untilt(e) {
  e.currentTarget.style.setProperty('--rx', '0deg')
  e.currentTarget.style.setProperty('--ry', '0deg')
}

function SectionHead({ label, title, accent, subtitle }) {
  return (
    <div className="section-head" data-reveal>
      <span className="eyebrow"><span className="eyebrow-line" />{label}</span>
      <h2 className="section-title">{title} {accent && <em>{accent}</em>}</h2>
      {subtitle && <p className="section-sub">{subtitle}</p>}
    </div>
  )
}

function Stars() {
  return <span className="stars" aria-label="5 out of 5 stars">★★★★★</span>
}

function Projects({ ready }) {
  const [filter, setFilter] = useState('all')
  const [inView, setInView] = useState(false)
  const [pill, setPill] = useState(null)
  const gridRef = useRef(null)
  const tabsRef = useRef(null)
  const list = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.kind === filter)
  // Full-width cards keep the 2-column grid free of holes: the first one for an odd
  // count, first and last (mirrored) for an even count of four or more.
  const odd = list.length % 2 === 1
  const bookend = !odd && list.length >= 4

  // Start the staggered entrance once the grid scrolls into view.
  useEffect(() => {
    if (!ready || !gridRef.current) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); io.disconnect() }
    }, { threshold: 0.05, rootMargin: '0px 0px -60px 0px' })
    io.observe(gridRef.current)
    return () => io.disconnect()
  }, [ready])

  // Slide the gold pill under the selected filter tab.
  useLayoutEffect(() => {
    const measure = () => {
      const btn = tabsRef.current?.querySelector('[aria-selected="true"]')
      if (btn) setPill({ width: btn.offsetWidth, transform: `translateX(${btn.offsetLeft}px)` })
    }
    measure()
    document.fonts?.ready.then(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [filter])

  return (
    <>
      <div className="project-filters-wrap" data-reveal>
        <div className="project-filters" role="tablist" aria-label="Filter projects" ref={tabsRef}>
          <span className="filter-pill" style={pill || { opacity: 0 }} aria-hidden="true" />
          {PROJECT_FILTERS.map(f => (
            <button key={f.id} role="tab" aria-selected={filter === f.id} onClick={() => setFilter(f.id)}>
              {f.label}
              <small>{f.id === 'all' ? PROJECTS.length : PROJECTS.filter(p => p.kind === f.id).length}</small>
            </button>
          ))}
        </div>
      </div>

      <div className={`projects ${inView ? 'in' : ''}`} ref={gridRef}>
        {list.map((p, i) => {
          const flip = bookend && i === list.length - 1
          const featured = ((odd || bookend) && i === 0) || flip
          return (
            <article className={`card project ${featured ? 'featured' : ''} ${flip ? 'flip' : ''}`} key={`${filter}-${p.id}`}
              style={{ '--i': i }} onMouseMove={tilt} onMouseLeave={untilt}>
              <div className="card-glow" />
              <a className="project-media" href={p.live || p.github} target="_blank" rel="noreferrer" aria-label={`Open ${p.title}`}>
                <div className="pw-bar"><i /><i /><i /><span>{p.url}</span></div>
                <div className="project-shot">
                  <img
                    src={`/projects/${p.img}-720.webp`}
                    srcSet={`/projects/${p.img}-720.webp 720w, /projects/${p.img}-1400.webp 1400w`}
                    sizes={featured ? '(max-width: 900px) 100vw, 720px' : '(max-width: 680px) 100vw, 600px'}
                    alt={`${p.title} preview`} width="1400" height="700" loading="lazy" decoding="async"
                  />
                  <span className="project-view"><Icon name="arrow" size={20} /></span>
                </div>
              </a>
              <div className="project-body">
                <div className="project-meta">
                  <span className="project-no">{p.no}</span>
                  <span className="project-cat">{p.category}</span>
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="tags">{p.tech.map(t => <span key={t}>{t}</span>)}</div>
                <div className="project-links">
                  {p.live && (
                    <a className="primary" href={p.live} target="_blank" rel="noreferrer">
                      Live site <Icon name="arrow" size={14} />
                    </a>
                  )}
                  {p.github && (
                    <a className={p.live ? '' : 'primary'} href={p.github} target="_blank" rel="noreferrer">
                      <Icon name="github" size={15} /> GitHub
                    </a>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </>
  )
}

// ── APP ───────────────────────────────────────────────
export default function App() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [darkMode, setDarkMode] = useState(() => {
    try { return localStorage.getItem('cc-theme') !== 'light' } catch { return true }
  })
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [wordIdx, setWordIdx] = useState(0)
  const [openFaq, setOpenFaq] = useState(0)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const barRef = useRef(null)
  const spotRef = useRef(null)

  // Theme
  useEffect(() => {
    document.body.classList.toggle('light-mode', !darkMode)
    try { localStorage.setItem('cc-theme', darkMode ? 'dark' : 'light') } catch { /* ignore */ }
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', darkMode ? '#07070a' : '#faf8f5')
  }, [darkMode])

  // Loader: count to 100 then lift the curtain
  useEffect(() => {
    const start = performance.now()
    let id
    const tick = (now) => {
      const t = Math.min((now - start) / 1400, 1)
      setProgress(Math.round(100 * (1 - Math.pow(1 - t, 3))))
      if (t < 1) id = requestAnimationFrame(tick)
      else setTimeout(() => setLoading(false), 250)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [])

  // Rotating hero word
  useEffect(() => {
    const id = setInterval(() => setWordIdx(i => (i + 1) % ROTATING_WORDS.length), 2400)
    return () => clearInterval(id)
  }, [])

  // Scroll: header state + progress bar
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      const h = document.documentElement.scrollHeight - window.innerHeight
      if (barRef.current) barRef.current.style.transform = `scaleX(${h > 0 ? y / h : 0})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Cursor spotlight (pointer devices only)
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const onMove = (e) => {
      if (spotRef.current) spotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // Reveal-on-scroll + active nav section
  useEffect(() => {
    if (loading) return
    const reveal = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); reveal.unobserve(e.target) }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('[data-reveal]').forEach(el => reveal.observe(el))

    const spy = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
    }, { rootMargin: '-45% 0px -50% 0px' })
    NAV.forEach(n => { const el = document.getElementById(n.id); if (el) spy.observe(el) })

    return () => { reveal.disconnect(); spy.disconnect() }
  }, [loading])

  useEffect(() => {
    document.body.style.overflow = menuOpen || loading ? 'hidden' : ''
  }, [menuOpen, loading])

  const handleFormChange = useCallback((e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  // Hand the enquiry to WhatsApp as a pre-filled chat; the visitor just taps send.
  const handleFormSubmit = useCallback((e) => {
    e.preventDefault()
    const text = [
      `*New project enquiry — Code Crafters*`,
      ``,
      `*Name:* ${formData.name}`,
      `*Email:* ${formData.email}`,
      `*Subject:* ${formData.subject}`,
      ``,
      formData.message,
    ].join('\n')
    window.open(`${WHATSAPP}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3500)
  }, [formData])

  const heroWords = ['We', 'craft', 'digital', 'experiences', 'that']

  return (
    <>
      {/* ====== LOADER ====== */}
      <div className={`loader ${loading ? '' : 'done'}`} aria-hidden={!loading}>
        <div className="loader-inner">
          <img src="/logo.svg" alt="" className="loader-logo" />
          <div className="loader-brand">Code Crafters</div>
          <div className="loader-bar"><span style={{ width: progress + '%' }} /></div>
          <div className="loader-count">{String(progress).padStart(3, '0')}</div>
        </div>
      </div>

      <div className="scroll-bar" ref={barRef} />
      <div className="spotlight" ref={spotRef} aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      {/* ====== HEADER ====== */}
      <header className={`nav-wrap ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
        <nav className="nav">
          <a href="#home" className="brand" onClick={() => setMenuOpen(false)}>
            <img src="/logo.svg" alt="" className="brand-logo" />
            <span>Code Crafters</span>
          </a>
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {NAV.map(n => (
              <li key={n.id}>
                <a href={`#${n.id}`} className={active === n.id ? 'active' : ''} onClick={() => setMenuOpen(false)}>{n.label}</a>
              </li>
            ))}
            <li className="nav-mobile-cta"><a href="#contact" className="btn btn-gold" onClick={() => setMenuOpen(false)}>Start a project</a></li>
          </ul>
          <div className="nav-right">
            <button className="icon-btn" onClick={() => setDarkMode(d => !d)} aria-label="Toggle theme">
              <Icon name={darkMode ? 'sun' : 'moon'} size={18} />
            </button>
            <a href="#contact" className="btn btn-gold btn-sm nav-cta">Start a project</a>
            <button className={`burger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(o => !o)} aria-label="Menu" aria-expanded={menuOpen}>
              <span /><span />
            </button>
          </div>
        </nav>
      </header>

      <main className={loading ? '' : 'ready'}>
        {/* ====== HERO ====== */}
        <section className="hero" id="home">
          <div className="aurora" aria-hidden="true">
            <span className="blob b1" /><span className="blob b2" /><span className="blob b3" />
          </div>
          <div className="hero-grid" aria-hidden="true" />

          <div className="container hero-inner">
            <div className="hero-copy">
              <a href="#contact" className="pill">
                <span className="pulse-dot" />
                Now booking — limited slots this month
                <Icon name="arrow" size={14} />
              </a>

              <h1 className="hero-title">
                {heroWords.map((w, i) => (
                  <span className="word" key={i}><span style={{ '--d': `${0.15 + i * 0.08}s` }}>{w}</span></span>
                ))}
                <span className="word rotator">
                  <span style={{ '--d': '0.6s' }}>
                    <em key={wordIdx} className="rotating">{ROTATING_WORDS[wordIdx]}.</em>
                  </span>
                </span>
              </h1>

              <p className="hero-sub">
                A boutique studio turning ideas into polished websites, apps and e-commerce
                platforms that feel premium from the very first click.
              </p>

              <div className="hero-ctas">
                <a href="#contact" className="btn btn-gold btn-lg" onMouseMove={magnet} onMouseLeave={unmagnet}>
                  Get a free quote <Icon name="arrow" size={18} />
                </a>
                <a href="#projects" className="btn btn-ghost btn-lg" onMouseMove={magnet} onMouseLeave={unmagnet}>
                  See our work
                </a>
              </div>

              <div className="trust">
                <div className="avatars">
                  {['S', 'R', 'A', 'P'].map((c, i) => <span key={i} style={{ '--i': i }}>{c}</span>)}
                </div>
                <div>
                  <Stars />
                  <p>Loved by <strong>15+ clients</strong> across India</p>
                </div>
              </div>
            </div>

            {/* Floating product mockup */}
            <div className="hero-visual" aria-hidden="true">
              <div className="mock">
                <div className="mock-bar"><i /><i /><i /><span>yourbrand.com</span></div>
                <div className="mock-body">
                  <div className="mock-hero-line w70" />
                  <div className="mock-hero-line w45" />
                  <div className="mock-btn" />
                  <div className="mock-chart">
                    {[40, 62, 48, 75, 58, 88, 70, 96].map((h, i) => (
                      <span key={i} style={{ '--h': h + '%', '--i': i }} />
                    ))}
                  </div>
                  <div className="mock-cards"><span /><span /><span /></div>
                </div>
              </div>
              <div className="float-chip chip-a">
                <span className="chip-icon"><Icon name="bolt" size={16} /></span>
                <div><strong>100</strong><small>Performance</small></div>
              </div>
              <div className="float-chip chip-b">
                <span className="chip-icon green">↑</span>
                <div><strong>+142%</strong><small>Conversions</small></div>
              </div>
              <div className="float-chip chip-c">
                <Stars /><small>“Absolutely stunning”</small>
              </div>
            </div>
          </div>

          <a href="#clients" className="scroll-hint" aria-label="Scroll down"><span /></a>
        </section>

        {/* ====== CLIENTS MARQUEE ====== */}
        <section className="clients" id="clients">
          <p className="clients-label">Trusted by ambitious teams</p>
          <div className="marquee">
            <div className="marquee-track">
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((n, i) => (
                <span className="client" key={i}><Icon name="sparkle" size={14} />{n}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ====== SERVICES ====== */}
        <section className="section" id="services">
          <div className="container">
            <SectionHead label="What we do" title="Services built to" accent="grow you."
              subtitle="End-to-end digital solutions tailored to help your business stand out and win customers." />
            <div className="services">
              {SERVICES.map((s, i) => (
                <article className="card service" key={i} data-reveal style={{ '--delay': `${i * 0.1}s` }} onMouseMove={tilt} onMouseLeave={untilt}>
                  <div className="card-glow" />
                  <div className="service-icon"><Icon name={s.icon} size={26} /></div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <ul className="service-points">
                    {s.points.map(p => <li key={p}><Icon name="check" size={14} />{p}</li>)}
                  </ul>
                  <a href="#contact" className="card-link">Discuss your project <Icon name="arrow" size={16} /></a>
                </article>
              ))}
            </div>

            <div className="guarantees" data-reveal>
              {GUARANTEES.map((g, i) => (
                <div className="guarantee" key={i}>
                  <span className="guarantee-icon"><Icon name={g.icon} size={20} /></span>
                  <div><strong>{g.title}</strong><small>{g.desc}</small></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== PROJECTS ====== */}
        <section className="section section-alt" id="projects">
          <div className="container">
            <SectionHead label="Selected work" title="Projects we're" accent="proud of."
              subtitle="Real products across web, AI and IoT — shipped, deployed and solving real-world problems." />
            <Projects ready={!loading} />
          </div>
        </section>

        {/* ====== PROCESS ====== */}
        <section className="section" id="process">
          <div className="container">
            <SectionHead label="How we work" title="A process that" accent="just works."
              subtitle="A streamlined workflow that delivers results on time, every time." />
            <div className="process" data-reveal>
              <div className="process-line"><span /></div>
              {PROCESS_STEPS.map((s, i) => (
                <div className="step" key={i} style={{ '--delay': `${0.2 + i * 0.18}s` }}>
                  <div className="step-node"><Icon name={s.icon} size={22} /></div>
                  <span className="step-num">{s.num}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <span className="step-time">{s.time}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== STATS ====== */}
        <section className="stats-band">
          <div className="container stats">
            {STATS.map((s, i) => (
              <div className="stat" key={i} data-reveal style={{ '--delay': `${i * 0.1}s` }}>
                <span className="stat-num"><Counter to={s.count} suffix={s.suffix} /></span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ====== TECH STACK ====== */}
        <section className="section tech-section" id="techstack">
          <div className="container">
            <SectionHead label="Technologies" title="Our modern" accent="toolkit."
              subtitle="Battle-tested tools and frameworks we use to build world-class products." />
          </div>
          <div className="marquee tech-marquee">
            <div className="marquee-track">
              {[...TECH_STACK.slice(0, 8), ...TECH_STACK.slice(0, 8)].map((t, i) => (
                <span className="tech" key={i} style={{ '--c': t.color }}><i />{t.name}</span>
              ))}
            </div>
          </div>
          <div className="marquee tech-marquee reverse">
            <div className="marquee-track">
              {[...TECH_STACK.slice(8), ...TECH_STACK.slice(8)].map((t, i) => (
                <span className="tech" key={i} style={{ '--c': t.color }}><i />{t.name}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ====== TESTIMONIALS ====== */}
        <section className="section section-alt" id="testimonials">
          <div className="container">
            <SectionHead label="Kind words" title="Clients who" accent="love us."
              subtitle="Don't take our word for it — here's what the people we've worked with say." />
          </div>
          <div className="marquee testimonials-marquee">
            <div className="marquee-track">
              {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
                <figure className="testimonial" key={i}>
                  <Stars />
                  <blockquote>“{t.quote}”</blockquote>
                  <figcaption>
                    <span className="t-avatar">{t.name[0]}</span>
                    <div><strong>{t.name}</strong><small>{t.role}</small></div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ====== PRICING ====== */}
        <section className="section" id="pricing">
          <div className="container">
            <SectionHead label="Pricing" title="Simple," accent="transparent pricing."
              subtitle="Choose a plan that fits your needs — no hidden fees, no surprises." />
            <div className="pricing">
              {PRICING.map((plan, i) => (
                <div className={`price-card ${plan.popular ? 'popular' : ''}`} key={i} data-reveal style={{ '--delay': `${i * 0.12}s` }}>
                  <div className="price-inner">
                    {plan.popular && <span className="price-badge"><Icon name="sparkle" size={12} /> Most popular</span>}
                    <h3>{plan.tier}</h3>
                    <p className="price-blurb">{plan.blurb}</p>
                    <div className="price">
                      <span className="price-amount">{plan.price}</span>
                      <span className="price-period">/ {plan.period}</span>
                    </div>
                    <a href={WHATSAPP} target="_blank" rel="noreferrer" className={`btn btn-block ${plan.popular ? 'btn-gold' : 'btn-ghost'}`}>
                      Get started <Icon name="arrow" size={16} />
                    </a>
                    <ul className="price-features">
                      {plan.features.map(f => <li key={f}><span><Icon name="check" size={12} stroke={2.4} /></span>{f}</li>)}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== TEAM ====== */}
        <section className="section section-alt" id="team">
          <div className="container">
            <SectionHead label="The team" title="Meet the" accent="builders."
              subtitle="The people behind the code — you'll work with us directly, no middlemen." />
            <div className="team">
              {[
                { img: '/qws.svg', name: 'Samuel S', role: 'Full Stack Developer', bio: 'Tech enthusiast passionate about building impactful digital solutions.', mail: 'samuelsuresh447@gmail.com', li: 'https://www.linkedin.com/in/samuel-s1607/', gh: 'https://github.com/samuelSS1602' },
                { img: '/rah.svg', name: 'Rahul K', role: 'Frontend Developer & UI/UX', bio: 'Dedicated to crafting beautiful and user-friendly interfaces.', mail: 'rahulkarthi695@gmail.com', li: 'https://www.linkedin.com/in/rahul-k-45b815270/', gh: 'https://github.com/' },
              ].map((m, i) => (
                <div className="card member" key={i} data-reveal style={{ '--delay': `${i * 0.12}s` }} onMouseMove={tilt} onMouseLeave={untilt}>
                  <div className="card-glow" />
                  <div className="member-photo"><img src={m.img} alt={m.name} /></div>
                  <h3>{m.name}</h3>
                  <p className="member-role">{m.role}</p>
                  <p className="member-bio">{m.bio}</p>
                  <div className="socials">
                    <a href={`mailto:${m.mail}`} aria-label="Email"><Icon name="mail" size={18} /></a>
                    <a href={m.li} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Icon name="linkedin" size={18} /></a>
                    <a href={m.gh} target="_blank" rel="noreferrer" aria-label="GitHub"><Icon name="github" size={18} /></a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== FAQ ====== */}
        <section className="section" id="faq">
          <div className="container faq-layout">
            <SectionHead label="FAQ" title="Questions?" accent="Answered."
              subtitle="Everything you need to know before we start. Still curious? Just message us." />
            <div className="faq" data-reveal>
              {FAQS.map((f, i) => (
                <div className={`faq-item ${openFaq === i ? 'open' : ''}`} key={i}>
                  <button className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                    <span>{f.q}</span><span className="faq-plus" />
                  </button>
                  <div className="faq-a"><div><p>{f.a}</p></div></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== BLOG ====== */}
        <section className="section section-alt" id="blog">
          <div className="container">
            <SectionHead label="Insights" title="From our" accent="journal."
              subtitle="Thoughts, guides, and resources from our team." />
            <div className="blogs">
              {BLOGS.map((b, i) => (
                <article className="card blog" key={i} data-reveal style={{ '--delay': `${i * 0.1}s`, '--hue': b.hue }}>
                  <div className="blog-img"><span className="blog-cat">{b.category}</span></div>
                  <div className="blog-body">
                    <div className="blog-meta">{b.date} · {b.readTime}</div>
                    <h3>{b.title}</h3>
                    <span className="card-link">Read article <Icon name="arrow" size={16} /></span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ====== CTA BAND ====== */}
        <section className="cta-band">
          <div className="container">
            <div className="cta-box" data-reveal>
              <div className="cta-aurora" aria-hidden="true" />
              <span className="eyebrow"><span className="eyebrow-line" />Let's build together</span>
              <h2>Ready to look <em>premium</em>?</h2>
              <p>Book a free 15-minute call. We'll map out your idea, timeline and budget — no strings attached.</p>
              <div className="hero-ctas center">
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn btn-gold btn-lg" onMouseMove={magnet} onMouseLeave={unmagnet}>
                  <Icon name="chat" size={18} /> Chat on WhatsApp
                </a>
                <a href="#contact" className="btn btn-ghost btn-lg" onMouseMove={magnet} onMouseLeave={unmagnet}>Send a message</a>
              </div>
            </div>
          </div>
        </section>

        {/* ====== CONTACT ====== */}
        <section className="section" id="contact">
          <div className="container">
            <SectionHead label="Get in touch" title="Start your" accent="project."
              subtitle="Tell us about your idea and we'll get back to you within 24 hours." />
            <div className="contact" data-reveal>
              <div className="contact-info">
                {[
                  { icon: 'mail', label: 'Email', value: 'codecrafters454@gmail.com', href: 'mailto:codecrafters454@gmail.com' },
                  { icon: 'call', label: 'Phone', value: '+91 72002 50454', href: 'tel:+917200250454' },
                  { icon: 'chat', label: 'WhatsApp', value: 'Chat with us instantly', href: WHATSAPP, ext: true },
                ].map((c, i) => (
                  <a className="contact-item" key={i} href={c.href} {...(c.ext ? { target: '_blank', rel: 'noreferrer' } : {})}>
                    <span className="contact-icon"><Icon name={c.icon} size={20} /></span>
                    <div><small>{c.label}</small><strong>{c.value}</strong></div>
                    <Icon name="arrow" size={16} className="contact-arrow" />
                  </a>
                ))}
                <div className="availability">
                  <span className="pulse-dot" /> Usually replies within a few hours
                </div>
              </div>

              <form className="card contact-form" onSubmit={handleFormSubmit}>
                {formSubmitted ? (
                  <div className="form-success">
                    <span className="success-ring"><Icon name="check" size={34} stroke={2.2} /></span>
                    <h3>Opening WhatsApp…</h3>
                    <p>Your message is ready — just tap send and we'll reply within 24 hours.</p>
                  </div>
                ) : (
                  <>
                    <div className="form-row">
                      <div className="field">
                        <input type="text" id="name" name="name" placeholder=" " value={formData.name} onChange={handleFormChange} required />
                        <label htmlFor="name">Your name</label>
                      </div>
                      <div className="field">
                        <input type="email" id="email" name="email" placeholder=" " value={formData.email} onChange={handleFormChange} required />
                        <label htmlFor="email">Email address</label>
                      </div>
                    </div>
                    <div className="field">
                      <input type="text" id="subject" name="subject" placeholder=" " value={formData.subject} onChange={handleFormChange} required />
                      <label htmlFor="subject">Subject</label>
                    </div>
                    <div className="field">
                      <textarea id="message" name="message" rows="5" placeholder=" " value={formData.message} onChange={handleFormChange} required />
                      <label htmlFor="message">Tell us about your project…</label>
                    </div>
                    <button type="submit" className="btn btn-gold btn-lg btn-block"><Icon name="chat" size={18} /> Send via WhatsApp</button>
                  </>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* ====== FOOTER ====== */}
        <footer className="footer">
          <div className="container">
            <div className="footer-top">
              <div className="footer-brand">
                <a href="#home" className="brand"><img src="/logo.svg" alt="" className="brand-logo" /><span>Code Crafters</span></a>
                <p>Transforming ideas into reality — websites, apps & e-commerce solutions that grow your business online.</p>
              </div>
              <div className="footer-cols">
                <div>
                  <h4>Studio</h4>
                  {NAV.slice(0, 4).map(n => <a key={n.id} href={`#${n.id}`}>{n.label}</a>)}
                </div>
                <div>
                  <h4>Contact</h4>
                  <a href="mailto:codecrafters454@gmail.com">Email</a>
                  <a href={WHATSAPP} target="_blank" rel="noreferrer">WhatsApp</a>
                  <a href="tel:+917200250454">Call us</a>
                </div>
              </div>
            </div>
            <div className="footer-word" aria-hidden="true">CODE CRAFTERS</div>
            <div className="footer-bottom">
              <p>© {new Date().getFullYear()} Code Crafters. All rights reserved.</p>
              <p>Crafted with care in India.</p>
            </div>
          </div>
        </footer>
      </main>

      {/* ====== FLOATING ACTIONS ====== */}
      <a href={WHATSAPP} className={`wa-float ${scrolled ? 'show' : ''}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
      <a href="#home" className={`to-top ${scrolled ? 'show' : ''}`} aria-label="Back to top"><Icon name="arrowUp" size={18} /></a>
    </>
  )
}
