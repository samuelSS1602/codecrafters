import React, { useState, useEffect, useRef, useCallback } from 'react'

// ── DATA ──────────────────────────────────────────────
const PROJECTS = [
  {
    icon: '🚗', title: 'RIDE REMINDER', gradient: 'linear-gradient(135deg, #0f766e, #14b8a6)',
    desc: 'A smart web dashboard to track, manage, and get reminders for vehicle documents like Permit, FC, Insurance, Tax, and Green Tax.',
    tech: ['Html', 'CSS', 'Node.js', 'Firebase'],
    links: [{ label: 'Live Demo' }, { label: 'GitHub' }],
  },
  {
    icon: '🗑️', title: 'ECO SMART', gradient: 'linear-gradient(135deg, #065f46, #34d399)',
    desc: 'IoT-based Smart Garbage Vehicle Allocation System using ultrasonic & weight sensors with ESP8266, Firebase, and a live dashboard.',
    tech: ['Html', 'CSS', 'Node.js', 'Firebase', 'IoT'],
    links: [{ label: 'Live Demo' }, { label: 'GitHub' }],
  },
  {
    icon: '📢', title: 'CampusBuzz', gradient: 'linear-gradient(135deg, #7c3aed, #a78bfa)',
    desc: 'One-stop hub for college announcements, updates, alerts, events, circulars, results, and important notices from your campus dashboard.',
    tech: ['Html', 'CSS', 'React.js', 'mongoDB'],
    links: [{ label: 'Visit Site' }, { label: 'GitHub' }],
  },
  {
    icon: '🔐', title: 'Cryptix', gradient: 'linear-gradient(135deg, #1e3a5f, #60a5fa)',
    desc: 'A powerful encryption and decryption tool designed to protect your text, images, and files with top-level security.',
    tech: ['Python', 'Django', 'mongoDB'],
    links: [{ label: 'Demo' }, { label: 'Documentation' }],
  },
  {
    icon: '🤖', title: 'AI Chat Assistant', gradient: 'linear-gradient(135deg, #581c87, #c084fc)',
    desc: 'Intelligent chatbot with natural language processing and machine learning capabilities for customer support.',
    tech: ['HTML', 'CSS', 'React.js', 'OpenAI'],
    links: [{ label: 'Try It' }, { label: 'API Docs' }],
  },
  {
    icon: '🛒', title: 'QuickPick', gradient: 'linear-gradient(135deg, #92400e, #fbbf24)',
    desc: 'Your go-to e-commerce platform for everyday essentials, trending products, and unbeatable deals – all in one place.',
    tech: ['Html', 'CSS', 'Node.js', 'Firebase'],
    links: [{ label: 'Live Tool' }, { label: 'Source' }],
  },
]

const PROCESS_STEPS = [
  { num: '01', title: 'Discovery', desc: 'Understanding your goals, audience, and requirements', icon: '🔍' },
  { num: '02', title: 'Design', desc: 'Crafting wireframes, mockups, and visual identity', icon: '🎨' },
  { num: '03', title: 'Develop', desc: 'Building with modern tech stacks and best practices', icon: '⚙️' },
  { num: '04', title: 'Deploy', desc: 'Launching, testing, and providing ongoing support', icon: '🚀' },
]

const TECH_STACK = [
  { name: 'React', color: '#61dafb' }, { name: 'Node.js', color: '#68a063' },
  { name: 'Firebase', color: '#ffca28' }, { name: 'MongoDB', color: '#4db33d' },
  { name: 'Python', color: '#3776ab' }, { name: 'Django', color: '#092e20' },
  { name: 'JavaScript', color: '#f7df1e' }, { name: 'TypeScript', color: '#3178c6' },
  { name: 'HTML5', color: '#e34f26' }, { name: 'CSS3', color: '#1572b6' },
  { name: 'Git', color: '#f05032' }, { name: 'Figma', color: '#a259ff' },
  { name: 'VS Code', color: '#007acc' }, { name: 'Vite', color: '#646cff' },
  { name: 'Tailwind', color: '#38bdf8' }, { name: 'Next.js', color: '#ffffff' },
]

const PRICING = [
  {
    tier: 'Starter', price: '₹4,999', period: 'per project', popular: false,
    features: ['Single-page website', 'Responsive design', 'Contact form', 'SEO basics', '1 revision round', '5-day delivery'],
  },
  {
    tier: 'Professional', price: '₹14,999', period: 'per project', popular: true,
    features: ['Multi-page website', 'Custom UI/UX design', 'CMS integration', 'Advanced SEO', '3 revision rounds', 'Performance optimization', 'Analytics setup', '10-day delivery'],
  },
  {
    tier: 'Enterprise', price: 'Custom', period: 'get a quote', popular: false,
    features: ['Full-stack application', 'Custom backend & API', 'Database design', 'Payment integration', 'Unlimited revisions', 'Priority support', 'DevOps & hosting', 'Ongoing maintenance'],
  },
]

const FAQS = [
  { q: 'How long does it take to build a website?', a: 'Timelines vary based on complexity. A simple landing page takes 5–7 days, while a full-stack web application can take 3–6 weeks. We provide a detailed timeline after our initial discovery call.' },
  { q: 'What technologies do you use?', a: 'We work with modern frameworks like React, Next.js, Node.js, Firebase, MongoDB, and Python/Django. We choose the best stack based on your project requirements, scalability needs, and budget.' },
  { q: 'Do you offer post-launch support?', a: 'Yes! All our packages include 30 days of free bug fixes after launch. We also offer ongoing maintenance plans for continued support, feature additions, and performance monitoring.' },
  { q: 'Can you redesign my existing website?', a: 'Absolutely. We specialize in redesigning and modernizing existing websites while preserving your content and SEO rankings. We\'ll give your site a fresh, professional look with improved performance.' },
  { q: 'What is your payment structure?', a: 'We typically require 50% upfront to begin work and 50% upon completion. For larger projects, we can arrange milestone-based payments. We accept UPI, bank transfers, and online payments.' },
  { q: 'Do you build mobile apps?', a: 'Yes! We build cross-platform mobile applications using React Native and Flutter, as well as progressive web apps (PWAs) that work seamlessly across all devices.' },
]

const BLOGS = [
  { title: 'Why Every Small Business Needs a Website in 2025', category: 'Business', date: 'Jul 25, 2025', readTime: '5 min read', gradient: 'linear-gradient(135deg, #065f46, #10b981)' },
  { title: 'React vs Next.js: Choosing the Right Framework', category: 'Technology', date: 'Jul 18, 2025', readTime: '8 min read', gradient: 'linear-gradient(135deg, #1e3a5f, #60a5fa)' },
  { title: 'The Ultimate Guide to SEO for New Websites', category: 'Marketing', date: 'Jul 10, 2025', readTime: '6 min read', gradient: 'linear-gradient(135deg, #581c87, #a78bfa)' },
]

const CLIENT_LOGOS = ['TechVentures', 'GreenLeaf Co.', 'UrbanNest', 'DataFlow', 'CloudPeak', 'SwiftServe']

// ── COMPONENT ──────────────────────────────────────────
export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cc-theme')
      return saved ? saved === 'dark' : true
    }
    return true
  })
  const [openFaq, setOpenFaq] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const canvasRef = useRef(null)
  const cursorRef = useRef(null)
  const cursorDotRef = useRef(null)
  const progressRef = useRef(null)
  const mousePos = useRef({ x: 0, y: 0 })

  // ── Dark mode ──
  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove('light-mode')
    } else {
      document.body.classList.add('light-mode')
    }
    localStorage.setItem('cc-theme', darkMode ? 'dark' : 'light')
    // Update meta theme-color
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', darkMode ? '#030712' : '#f8fafc')
  }, [darkMode])

  // ── Loading screen ──
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  // ── Main effects ──
  useEffect(() => {
    if (isLoading) return

    // Scroll progress bar
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      if (progressRef.current) {
        progressRef.current.style.width = progress + '%'
      }
    }

    // Header + back-to-top
    const header = document.querySelector('header')
    const backToTop = document.getElementById('backToTop')
    const onScroll = () => {
      if (window.scrollY > 80) header?.classList.add('scrolled')
      else header?.classList.remove('scrolled')
      if (window.scrollY > 400) backToTop?.classList.add('visible')
      else backToTop?.classList.remove('visible')
      updateProgress()
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Mobile menu
    function toggleMenu() {
      document.querySelector('.nav-links')?.classList.toggle('open')
      document.querySelector('.menu-toggle')?.classList.toggle('active')
    }
    const menuBtn = document.querySelector('.menu-toggle')
    menuBtn?.addEventListener('click', toggleMenu)

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        document.querySelector('.nav-links')?.classList.remove('open')
        document.querySelector('.menu-toggle')?.classList.remove('active')
      })
    })

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    })

    // Intersection observer for fade-in
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.06, rootMargin: '0px 0px -30px 0px' }
    )
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el))

    // Stat counter
    function animateCounter(element) {
      const target = parseInt(element.getAttribute('data-count'))
      const suffix = element.getAttribute('data-suffix') || ''
      const duration = 2000
      const step = target / (duration / 16)
      let current = 0
      const timer = setInterval(() => {
        current += step
        if (current >= target) { current = target; clearInterval(timer) }
        element.textContent = Math.floor(current) + suffix
      }, 16)
    }
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-number').forEach(c => animateCounter(c))
            statsObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )
    const statsSection = document.querySelector('.stats')
    if (statsSection) statsObserver.observe(statsSection)

    // Project card spotlight
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect()
        card.style.setProperty('--mouse-x', ((e.clientX - rect.left) / rect.width) * 100 + '%')
        card.style.setProperty('--mouse-y', ((e.clientY - rect.top) / rect.height) * 100 + '%')
      })
    })

    // Cursor trail
    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = e.clientX + 'px'
        cursorDotRef.current.style.top = e.clientY + 'px'
      }
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    document.body.classList.add('loaded')

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [isLoading])

  // ── Particle canvas ──
  useEffect(() => {
    if (isLoading) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []
    const PARTICLE_COUNT = 50
    const MAX_DIST = 120

    function resize() {
      const hero = canvas.parentElement
      canvas.width = hero.offsetWidth
      canvas.height = hero.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
      })
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const accentRGB = darkMode ? '110,231,183' : '16,185,129'

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${accentRGB}, 0.4)`
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x
          const dy = p.y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(${accentRGB}, ${0.12 * (1 - dist / MAX_DIST)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [isLoading, darkMode])

  // ── Form handler ──
  const handleFormChange = useCallback((e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }, [])

  const handleFormSubmit = useCallback((e) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }, [])

  // ── RENDER ──────────────────────────────────────────
  return (
    <>
      {/* ====== LOADING SCREEN ====== */}
      <div className={`loading-screen ${!isLoading ? 'hidden' : ''}`}>
        <div className="loading-content">
          <div className="loading-logo">
            <img src="/logo.svg" alt="Loading" style={{ width: 56, height: 56, borderRadius: 14 }} />
          </div>
          <div className="loading-spinner"></div>
          <p className="loading-text">CODE CRAFTERS</p>
        </div>
      </div>

      {/* ====== SCROLL PROGRESS ====== */}
      <div className="scroll-progress-track">
        <div className="scroll-progress-bar" ref={progressRef}></div>
      </div>

      {/* ====== CURSOR TRAIL ====== */}
      <div className="cursor-glow" ref={cursorRef}></div>
      <div className="cursor-dot" ref={cursorDotRef}></div>

      {/* ====== HEADER ====== */}
      <header>
        <nav>
          <a href="#" className="logo">
            <div className="logo-icon">
              <img src="/logo.svg" alt="Logo" style={{ width: 32, height: 32, borderRadius: 6, objectFit: 'contain' }} />
            </div>
            CODE CRAFTERS
          </a>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#pricing">Pricing</a></li>
            <li><a href="#team">Team</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="nav-right">
            <button
              className="theme-toggle"
              onClick={() => setDarkMode(d => !d)}
              aria-label="Toggle theme"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <div className="menu-toggle">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* ====== HERO ====== */}
        <section className="hero" id="home">
          <canvas ref={canvasRef} className="particle-canvas"></canvas>
          <div className="hero-bg"></div>
          <div className="hero-content">
            <div className="hero-logo glow">
              <img src="/logo.svg" alt="Code Crafters Logo" style={{ width: 72, height: 72, borderRadius: 16, objectFit: 'cover' }} />
            </div>
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              Available for Projects
            </div>
            <h1>Crafting modern digital experiences</h1>
            <p className="hero-tagline">
              We turn ideas into polished websites, apps, and e-commerce platforms
              that feel premium from the first click.
            </p>
            <div className="hero-pills">
              <span>⚡ Fast & Responsive</span>
              <span>🎨 Modern UI</span>
              <span>🚀 Scalable Solutions</span>
            </div>
            <div className="hero-buttons">
              <a href="#projects" className="cta-button">View Our Projects ↓</a>
              <a href="#contact" className="cta-button-secondary">Get in Touch →</a>
            </div>
          </div>
        </section>

        {/* ====== CLIENT LOGOS ====== */}
        <section className="clients-section">
          <div className="container">
            <p className="clients-label">Trusted by innovative teams</p>
            <div className="clients-row">
              {CLIENT_LOGOS.map((name, i) => (
                <div className="client-logo" key={i}>
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== SERVICES ====== */}
        <section className="services" id="services">
          <div className="container">
            <div className="section-header fade-in">
              <div className="section-label">◊ What We Do</div>
              <h2 className="section-title">Our Services</h2>
              <p className="section-subtitle">
                End-to-end digital solutions tailored to help your business grow and stand out
              </p>
            </div>
            <div className="services-grid">
              <div className="service-card fade-in">
                <div className="service-icon">🌐</div>
                <h3>Web Development</h3>
                <p>Custom-built, responsive websites with modern frameworks, blazing-fast performance, and pixel-perfect design.</p>
              </div>
              <div className="service-card fade-in">
                <div className="service-icon">📱</div>
                <h3>App Development</h3>
                <p>Cross-platform mobile applications with intuitive UX, real-time features, and smooth animations.</p>
              </div>
              <div className="service-card fade-in">
                <div className="service-icon">🛍️</div>
                <h3>E-Commerce Solutions</h3>
                <p>Full-stack online stores with secure payments, inventory management, and analytics dashboards.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ====== PROCESS ====== */}
        <section className="process-section" id="process">
          <div className="container">
            <div className="section-header fade-in">
              <div className="section-label">◊ How We Work</div>
              <h2 className="section-title">Our Process</h2>
              <p className="section-subtitle">A streamlined workflow that delivers results on time, every time</p>
            </div>
            <div className="process-grid">
              {PROCESS_STEPS.map((step, i) => (
                <div className="process-step fade-in" key={i}>
                  <div className="process-num">{step.num}</div>
                  <div className="process-icon">{step.icon}</div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                  {i < PROCESS_STEPS.length - 1 && <div className="process-connector"></div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== PROJECTS ====== */}
        <section className="projects" id="projects">
          <div className="container">
            <div className="section-header fade-in">
              <div className="section-label">◊ Portfolio</div>
              <h2 className="section-title">Our Projects</h2>
              <p className="section-subtitle">A curated collection of solutions we've built for real-world problems</p>
            </div>
            <div className="project-grid">
              {PROJECTS.map((p, i) => (
                <div className="project-card fade-in" key={i}>
                  <div className="project-preview" style={{ background: p.gradient }}>
                    <span className="project-preview-icon">{p.icon}</span>
                  </div>
                  <div className="project-body">
                    <div className="project-icon">{p.icon}</div>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <div className="tech-stack">
                      {p.tech.map((t, j) => <span className="tech-tag" key={j}>{t}</span>)}
                    </div>
                    <div className="project-links">
                      {p.links.map((l, j) => <a className="project-link" key={j}>{l.label}</a>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== TECH STACK ====== */}
        <section className="techstack-section" id="techstack">
          <div className="container">
            <div className="section-header fade-in">
              <div className="section-label">◊ Technologies</div>
              <h2 className="section-title">Our Tech Stack</h2>
              <p className="section-subtitle">Modern tools and frameworks we use to build world-class products</p>
            </div>
            <div className="techstack-grid fade-in">
              {TECH_STACK.map((t, i) => (
                <div className="techstack-item" key={i} style={{ '--tech-color': t.color }}>
                  <span className="techstack-dot" style={{ background: t.color }}></span>
                  <span className="techstack-name">{t.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== STATS ====== */}
        <section className="stats" id="stats">
          <div className="container">
            <div className="section-header fade-in" style={{ marginBottom: '3rem' }}>
              <div className="section-label">◊ Numbers</div>
              <h2 className="section-title">Our Track Record</h2>
              <p className="section-subtitle">Numbers that reflect our commitment to quality</p>
            </div>
            <div className="stats-grid">
              <div className="stat-item fade-in">
                <span className="stat-number" data-count="10" data-suffix="+">0</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-item fade-in">
                <span className="stat-number" data-count="15" data-suffix="+">0</span>
                <span className="stat-label">Happy Clients</span>
              </div>
              <div className="stat-item fade-in">
                <span className="stat-number" data-count="4" data-suffix="+">0</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item fade-in">
                <span className="stat-number" data-count="20" data-suffix="+">0</span>
                <span className="stat-label">Tech Tools Used</span>
              </div>
            </div>
          </div>
        </section>

        {/* ====== PRICING ====== */}
        <section className="pricing-section" id="pricing">
          <div className="container">
            <div className="section-header fade-in">
              <div className="section-label">◊ Pricing</div>
              <h2 className="section-title">Simple, Transparent Pricing</h2>
              <p className="section-subtitle">Choose a plan that fits your needs — no hidden fees, no surprises</p>
            </div>
            <div className="pricing-grid">
              {PRICING.map((plan, i) => (
                <div className={`pricing-card fade-in ${plan.popular ? 'popular' : ''}`} key={i}>
                  {plan.popular && <div className="pricing-badge">Most Popular</div>}
                  <h3 className="pricing-tier">{plan.tier}</h3>
                  <div className="pricing-price">
                    <span className="pricing-amount">{plan.price}</span>
                    <span className="pricing-period">{plan.period}</span>
                  </div>
                  <ul className="pricing-features">
                    {plan.features.map((f, j) => (
                      <li key={j}><span className="pricing-check">✓</span>{f}</li>
                    ))}
                  </ul>
                  <a
                    href="https://wa.me/917200250454"
                    className={`pricing-cta ${plan.popular ? 'primary' : ''}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Get Started
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== TEAM ====== */}
        <section className="team-section" id="team">
          <div className="container">
            <div className="section-header fade-in">
              <div className="section-label">◊ Team</div>
              <h2 className="section-title">Meet the Builders</h2>
              <p className="section-subtitle">The people behind the code</p>
            </div>
            <div className="team-grid">
              <div className="team-card fade-in">
                <img src="/qws.svg" alt="Samuel S" className="team-avatar" />
                <h3>Samuel S</h3>
                <p className="team-role">Full Stack Developer</p>
                <p className="team-bio">Tech enthusiast passionate about building impactful digital solutions.</p>
                <div className="team-links">
                  <a href="mailto:samuelsuresh447@gmail.com" title="Email">📧</a>
                  <a href="https://www.linkedin.com/in/samuel-s1607/" target="_blank" rel="noreferrer" title="LinkedIn">💼</a>
                  <a href="https://github.com/samuelSS1602" target="_blank" rel="noreferrer" title="GitHub">🐙</a>
                </div>
              </div>
              <div className="team-card fade-in">
                <img src="/rah.svg" alt="Rahul K" className="team-avatar" />
                <h3>Rahul K</h3>
                <p className="team-role">Frontend Developer & UI/UX</p>
                <p className="team-bio">Dedicated to crafting beautiful and user-friendly interfaces.</p>
                <div className="team-links">
                  <a href="mailto:rahulkarthi695@gmail.com" title="Email">📧</a>
                  <a href="https://www.linkedin.com/in/rahul-k-45b815270/" target="_blank" rel="noreferrer" title="LinkedIn">💼</a>
                  <a href="https://github.com/" target="_blank" rel="noreferrer" title="GitHub">🐙</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ====== FAQ ====== */}
        <section className="faq-section" id="faq">
          <div className="container">
            <div className="section-header fade-in">
              <div className="section-label">◊ FAQ</div>
              <h2 className="section-title">Frequently Asked Questions</h2>
              <p className="section-subtitle">Got questions? We've got answers</p>
            </div>
            <div className="faq-list fade-in">
              {FAQS.map((faq, i) => (
                <div className={`faq-item ${openFaq === i ? 'open' : ''}`} key={i} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <div className="faq-question">
                    <span>{faq.q}</span>
                    <span className="faq-chevron">›</span>
                  </div>
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== BLOG ====== */}
        <section className="blog-section" id="blog">
          <div className="container">
            <div className="section-header fade-in">
              <div className="section-label">◊ Insights</div>
              <h2 className="section-title">From Our Blog</h2>
              <p className="section-subtitle">Thoughts, guides, and resources from our team</p>
            </div>
            <div className="blog-grid">
              {BLOGS.map((post, i) => (
                <div className="blog-card fade-in" key={i}>
                  <div className="blog-image" style={{ background: post.gradient }}>
                    <span className="blog-category">{post.category}</span>
                  </div>
                  <div className="blog-body">
                    <h3>{post.title}</h3>
                    <div className="blog-meta">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== CONTACT ====== */}
        <section className="contact-section" id="contact">
          <div className="container">
            <div className="section-header fade-in">
              <div className="section-label">◊ Get in Touch</div>
              <h2 className="section-title">Start Your Project</h2>
              <p className="section-subtitle">Tell us about your idea and we'll get back to you within 24 hours</p>
            </div>
            <div className="contact-wrapper fade-in">
              <div className="contact-info">
                <div className="contact-info-item">
                  <span className="contact-info-icon">📧</span>
                  <div>
                    <p className="contact-info-label">Email</p>
                    <a href="mailto:codecrafters454@gmail.com">codecrafters454@gmail.com</a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <span className="contact-info-icon">📞</span>
                  <div>
                    <p className="contact-info-label">Phone</p>
                    <a href="tel:+917200250454">+91 72002 50454</a>
                  </div>
                </div>
                <div className="contact-info-item">
                  <span className="contact-info-icon">💬</span>
                  <div>
                    <p className="contact-info-label">WhatsApp</p>
                    <a href="https://wa.me/917200250454" target="_blank" rel="noreferrer">Chat with us</a>
                  </div>
                </div>
              </div>
              <form className="contact-form" onSubmit={handleFormSubmit}>
                {formSubmitted ? (
                  <div className="form-success">
                    <span className="form-success-icon">✓</span>
                    <h3>Message Sent!</h3>
                    <p>We'll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" placeholder="Your name" value={formData.name} onChange={handleFormChange} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleFormChange} required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <input type="text" id="subject" name="subject" placeholder="Project inquiry" value={formData.subject} onChange={handleFormChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea id="message" name="message" rows="5" placeholder="Tell us about your project..." value={formData.message} onChange={handleFormChange} required></textarea>
                    </div>
                    <button type="submit" className="form-submit">Send Message →</button>
                  </>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* ====== FOOTER ====== */}
        <footer>
          <div className="footer-content">
            <div className="footer-brand">
              <div className="footer-logo">C</div>
              <span className="footer-text">CODE CRAFTERS</span>
            </div>
            <div className="footer-description">
              <p>Transforming ideas into reality — Websites, Apps & E-commerce solutions to grow your business online.</p>
            </div>
            <div className="social-links">
              <a href="mailto:codecrafters454@gmail.com" className="social-link" title="Email">📧</a>
              <a href="https://wa.me/917200250454" className="social-link" title="WhatsApp">💬</a>
              <a href="tel:+917200250454" className="social-link" title="Call">📞</a>
            </div>
            <div className="footer-divider"></div>
            <div className="footer-bottom">
              <p>© 2025 Code Crafters. All rights reserved.</p>
            </div>
          </div>
        </footer>

        {/* ====== WHATSAPP FLOAT ====== */}
        <a href="https://wa.me/917200250454" className="whatsapp-float" target="_blank" rel="noreferrer" title="Chat on WhatsApp">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>

        <a href="#home" className="back-to-top" id="backToTop">↑</a>
      </main>
    </>
  )
}
