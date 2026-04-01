'use client'
import { useEffect } from 'react'

export default function AgencyPage() {
  useEffect(() => {
    const chatbotResponses: Record<string, string> = {
      hello: 'Hi! How can I help you today?',
      hi: 'Hello! Welcome to Signhify. What would you like to know?',
      services: 'We offer: Meta Ads, Google Ads, Lead Funnels, Telegram Marketing, Web Development, AI Analytics. Which interests you?',
      pricing: 'Our starting prices: Digital Marketing ₹9,999/mo, Web Dev ₹7,999, SEO ₹8,999/mo, Design ₹5,999. Want details?',
      contact: 'You can email us at piyushrajsingh092@gmail.com or WhatsApp +91 62024 42690',
      whatsapp: 'Visit https://wa.me/916202442690 to connect on WhatsApp',
      email: 'Our email is piyushrajsingh092@gmail.com',
      gymflow: 'Gymflow is our AI-powered gym management SaaS! It handles members, payments, plans & analytics. Check it out: https://gymflow-saas.vercel.app/',
      saas: 'We build premium SaaS products! Gymflow is an example - gym management software with multi-tenant architecture & real-time dashboards. Want to build your own SaaS?',
      default: 'Thanks for reaching out! For specific questions, email us at piyushrajsingh092@gmail.com or call +91 62024 42690. We\'re happy to help!',
    }

    function toggleChatbot() {
      document.getElementById('chatbot')?.classList.toggle('open')
    }

    function sendMessage() {
      const input = document.getElementById('chatInput') as HTMLInputElement
      const msg = input.value.trim().toLowerCase()
      if (!msg) return
      const msgs = document.getElementById('chatMessages')!
      msgs.innerHTML += `<div class="chat-msg user">${input.value}</div>`
      let resp = chatbotResponses.default
      for (const key in chatbotResponses) {
        if (msg.includes(key)) { resp = chatbotResponses[key]; break }
      }
      setTimeout(() => {
        msgs.innerHTML += `<div class="chat-msg bot">${resp}</div>`
        msgs.scrollTop = msgs.scrollHeight
      }, 500)
      input.value = ''
    }

    // Theme toggle
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'))
        btn.classList.add('active')
        document.documentElement.setAttribute('data-theme', (btn as HTMLElement).dataset.theme || 'dark')
        localStorage.setItem('theme', (btn as HTMLElement).dataset.theme || 'dark')
      })
    })
    if (localStorage.getItem('theme')) {
      document.documentElement.setAttribute('data-theme', localStorage.getItem('theme')!)
      document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', (btn as HTMLElement).dataset.theme === localStorage.getItem('theme'))
      })
    }

    // Lead form
    const form = document.getElementById('leadForm') as HTMLFormElement
    form?.addEventListener('submit', (e) => {
      e.preventDefault()
      const fd = new FormData(form)
      const data = {
        name: fd.get('name'),
        email: fd.get('email'),
        phone: fd.get('phone'),
        message: fd.get('message'),
      }
      const waMsg = `New Lead from Signhify Site!\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nMessage: ${data.message}`
      window.open(`https://wa.me/916202442690?text=${encodeURIComponent(waMsg)}`, '_blank')
      alert('Thanks! Redirecting to WhatsApp to complete your inquiry.')
      form.reset()
    })

    // Cursor glow
    document.addEventListener('mousemove', (e) => {
      const glow = document.getElementById('cursor-glow')
      if (glow) {
        glow.style.left = e.clientX + 'px'
        glow.style.top = e.clientY + 'px'
      }
    })

    // Scroll reveal
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          obs.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        e.preventDefault()
        const target = document.querySelector(a.getAttribute('href') || '')
        if (target) target.scrollIntoView({ behavior: 'smooth' })
      })
    })

    // Nav bg on scroll
    const nav = document.querySelector('nav') as HTMLElement
    window.addEventListener('scroll', () => {
      const theme = document.documentElement.getAttribute('data-theme')
      if (nav) {
        nav.style.background = window.scrollY > 50
          ? (theme === 'light' ? 'rgba(248,249,252,.95)' : 'rgba(6,6,12,.92)')
          : (theme === 'light' ? 'rgba(248,249,252,.85)' : 'rgba(6,6,12,.75)')
      }
    })

    // Chatbot event listeners
    const chatToggle = document.querySelector('.chatbot-toggle')
    chatToggle?.addEventListener('click', toggleChatbot)
    const chatClose = document.querySelector('.chatbot-close')
    chatClose?.addEventListener('click', toggleChatbot)
    const chatSendBtn = document.querySelector('.chatbot-input button')
    chatSendBtn?.addEventListener('click', sendMessage)
    const chatInput = document.getElementById('chatInput')
    chatInput?.addEventListener('keypress', (e) => {
      if ((e as KeyboardEvent).key === 'Enter') sendMessage()
    })

    // Mobile nav
    const hamburger = document.querySelector('.hamburger')
    const navLinks = document.querySelector('.nav-links') as HTMLElement
    hamburger?.addEventListener('click', () => {
      navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex'
    })
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        :root{
            --bg:#06060c;--surface:#0d0d18;--surface-2:#12121f;--surface-3:#181828;
            --border:rgba(255,255,255,.06);--border-hover:rgba(255,255,255,.12);
            --text:#eeeef5;--text-dim:#8888a0;--text-muted:#555570;
            --green:#00ff87;--green-dim:rgba(0,255,135,.15);--green-glow:rgba(0,255,135,.25);
            --blue:#4d9fff;--blue-dim:rgba(77,159,255,.12);
            --purple:#a855f7;--purple-dim:rgba(168,85,247,.12);
            --orange:#ff6b35;--orange-dim:rgba(255,107,53,.12);
            --radius:16px;--max:1200px;
            --nav-bg:rgba(6,6,12,.75);--nav-blur:24px;
        }
        [data-theme="light"]{
            --bg:#f8f9fc;--surface:#fff;--surface-2:#f0f2f8;--surface-3:#e8ecf4;
            --border:rgba(0,0,0,.06);--border-hover:rgba(0,0,0,.12);
            --text:#1a1a2e;--text-dim:#4a4a6a;--text-muted:#8888a0;
            --nav-bg:rgba(248,249,252,.85);
        }
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth;font-size:16px}
        body{font-family:'Plus Jakarta Sans',sans-serif;background:var(--bg);color:var(--text);line-height:1.7;overflow-x:hidden;transition:background .3s,color .3s}
        h1,h2,h3,h4{font-family:'Space Grotesk',sans-serif;line-height:1.15}
        a{text-decoration:none;color:inherit}
        img{max-width:100%;display:block}

        .theme-toggle{background:var(--surface-2);border:1px solid var(--border);border-radius:50px;padding:.3rem;cursor:pointer;display:flex;align-items:center;gap:.3rem;transition:all .3s}
        .theme-toggle:hover{border-color:var(--border-hover)}
        .theme-btn{width:28px;height:28px;border-radius:50%;border:none;cursor:pointer;font-size:.9rem;display:flex;align-items:center;justify-content:center;transition:all .3s;background:transparent;color:var(--text-muted)}
        .theme-btn.active{background:var(--green);color:#000;box-shadow:0 0 12px var(--green-glow)}

        body::before{content:'';position:fixed;inset:0;opacity:.03;pointer-events:none;z-index:9999;
            background:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}

        .ambient{position:fixed;inset:0;pointer-events:none;z-index:0;
            background:radial-gradient(ellipse 800px 600px at 20% 10%,rgba(0,255,135,.06),transparent),
                       radial-gradient(ellipse 600px 500px at 80% 80%,rgba(77,159,255,.04),transparent),
                       radial-gradient(ellipse 500px 400px at 60% 30%,rgba(168,85,247,.03),transparent)}
        [data-theme="light"] .ambient{background:radial-gradient(ellipse 800px 600px at 20% 10%,rgba(0,255,135,.04),transparent),
                       radial-gradient(ellipse 600px 500px at 80% 80%,rgba(77,159,255,.03),transparent),
                       radial-gradient(ellipse 500px 400px at 60% 30%,rgba(168,85,247,.02),transparent)}

        #cursor-glow{position:fixed;width:600px;height:600px;pointer-events:none;z-index:1;transform:translate(-50%,-50%);
            background:radial-gradient(circle,rgba(0,255,135,.04),transparent 70%);transition:opacity .3s}

        nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:.75rem 1.5rem;
            background:rgba(6,6,12,.75);backdrop-filter:blur(24px) saturate(1.5);border-bottom:1px solid var(--border)}
        .nav-inner{max-width:var(--max);margin:0 auto;display:flex;align-items:center;justify-content:space-between}
        .nav-brand{display:flex;align-items:center;gap:.6rem;font-family:'Space Grotesk';font-weight:700;font-size:1.1rem}
        .nav-brand img{height:32px;width:32px;border-radius:8px;object-fit:contain}
        .nav-brand span{background:linear-gradient(135deg,var(--green),var(--blue));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
        .nav-links{display:flex;align-items:center;gap:2rem}
        .nav-links a{color:var(--text-dim);font-size:.875rem;font-weight:500;transition:color .2s}
        .nav-links a:hover{color:var(--text)}
        .nav-cta{background:var(--green)!important;color:#000!important;padding:.55rem 1.2rem;border-radius:99px;font-weight:700;font-size:.85rem;transition:all .3s}
        .nav-cta:hover{box-shadow:0 0 30px var(--green-glow);transform:translateY(-1px)}
        .hamburger{display:none;background:none;border:none;color:var(--text);font-size:1.5rem;cursor:pointer}

        .container{max-width:var(--max);margin:0 auto;padding:0 1.5rem}
        section{padding:6rem 1.5rem;position:relative;z-index:2}

        .hero{min-height:100vh;display:flex;align-items:center;padding-top:5rem;position:relative;overflow:hidden}
        .hero-inner{max-width:var(--max);margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center}
        .hero-left{animation:fadeUp .8s ease forwards}
        .hero-badge{display:inline-flex;align-items:center;gap:.5rem;padding:.4rem 1rem;border-radius:99px;font-size:.8rem;font-weight:600;
            background:var(--green-dim);border:1px solid rgba(0,255,135,.2);color:var(--green);margin-bottom:1.5rem}
        .hero-badge .dot{width:6px;height:6px;border-radius:50%;background:var(--green);animation:blink 1.5s infinite}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.3}}
        .hero h1{font-size:clamp(2.4rem,5vw,3.8rem);font-weight:800;margin-bottom:1.2rem;letter-spacing:-.02em}
        .hero h1 .highlight{background:linear-gradient(135deg,var(--green),var(--blue));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
        .hero-desc{font-size:1.15rem;color:var(--text-dim);max-width:520px;margin-bottom:2rem;line-height:1.8}
        .hero-stats{display:flex;gap:2rem;margin-bottom:2.5rem}
        .hero-stat{text-align:center}
        .hero-stat .val{font-family:'Space Grotesk';font-size:1.6rem;font-weight:800;color:var(--green)}
        .hero-stat .lab{font-size:.75rem;color:var(--text-muted);margin-top:.15rem}
        .hero-ctas{display:flex;gap:1rem;flex-wrap:wrap}
        .btn{display:inline-flex;align-items:center;gap:.5rem;padding:.85rem 1.6rem;border-radius:99px;font-weight:700;font-size:.95rem;transition:all .3s;border:none;cursor:pointer}
        .btn-primary{background:linear-gradient(135deg,var(--green),#00cc6a);color:#000;box-shadow:0 4px 30px var(--green-glow)}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 40px rgba(0,255,135,.4)}
        .btn-outline{background:transparent;color:var(--text);border:1px solid var(--border-hover)}
        .btn-outline:hover{border-color:var(--green);color:var(--green)}
        .hero-right{animation:fadeUp .8s .2s ease both}
        .hero-card{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:2rem;position:relative;overflow:hidden}
        .hero-card::before{content:'';position:absolute;top:-50%;right:-50%;width:100%;height:100%;
            background:radial-gradient(circle,rgba(0,255,135,.08),transparent 70%)}
        .hero-card-title{font-size:.85rem;color:var(--text-muted);margin-bottom:1.5rem;text-transform:uppercase;letter-spacing:.1em}
        .metric-grid{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
        .metric{background:var(--surface-2);border:1px solid var(--border);border-radius:14px;padding:1.2rem;transition:all .3s;cursor:default}
        .metric:hover{border-color:rgba(0,255,135,.3);transform:translateY(-3px);box-shadow:0 10px 40px rgba(0,0,0,.3)}
        .metric .num{font-family:'Space Grotesk';font-size:1.5rem;font-weight:800;margin-bottom:.2rem}
        .metric .num.g{color:var(--green)}.metric .num.b{color:var(--blue)}.metric .num.p{color:var(--purple)}.metric .num.o{color:var(--orange)}
        .metric .lbl{font-size:.78rem;color:var(--text-muted)}
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}

        .marquee-section{padding:3rem 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);overflow:hidden}
        .marquee{display:flex;gap:3rem;animation:marquee 30s linear infinite}
        .marquee-item{white-space:nowrap;font-size:.85rem;color:var(--text-muted);font-weight:500;display:flex;align-items:center;gap:.5rem}
        .marquee-item::before{content:'✦';color:var(--green)}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}

        .sec-head{text-align:center;margin-bottom:4rem}
        .sec-head .tag{display:inline-block;padding:.35rem 1rem;border-radius:99px;font-size:.78rem;font-weight:600;text-transform:uppercase;letter-spacing:.08em;margin-bottom:1rem}
        .sec-head .tag.green{background:var(--green-dim);color:var(--green);border:1px solid rgba(0,255,135,.2)}
        .sec-head .tag.blue{background:var(--blue-dim);color:var(--blue);border:1px solid rgba(77,159,255,.2)}
        .sec-head .tag.purple{background:var(--purple-dim);color:var(--purple);border:1px solid rgba(168,85,247,.2)}
        .sec-head .tag.orange{background:var(--orange-dim);color:var(--orange);border:1px solid rgba(255,107,53,.2)}
        .sec-head h2{font-size:clamp(2rem,4vw,3rem);font-weight:800;margin-bottom:.8rem;letter-spacing:-.02em}
        .sec-head h2 .hl{background:linear-gradient(135deg,var(--green),var(--blue));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
        .sec-head p{color:var(--text-dim);font-size:1.1rem;max-width:600px;margin:0 auto}

        .services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem}
        .svc{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:2rem;transition:all .4s cubic-bezier(.175,.885,.32,1.275);position:relative;overflow:hidden}
        .svc::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--green),var(--blue));transform:scaleX(0);transition:transform .4s;transform-origin:left}
        .svc:hover::after{transform:scaleX(1)}
        .svc:hover{border-color:rgba(0,255,135,.2);transform:translateY(-5px);box-shadow:0 20px 60px rgba(0,0,0,.4)}
        .svc-icon{width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin-bottom:1.2rem}
        .svc-icon.g{background:var(--green-dim)}.svc-icon.b{background:var(--blue-dim)}.svc-icon.p{background:var(--purple-dim)}.svc-icon.o{background:var(--orange-dim)}
        .svc h3{font-size:1.1rem;font-weight:700;margin-bottom:.6rem}
        .svc p{color:var(--text-dim);font-size:.88rem;line-height:1.7}

        .portfolio-cat{margin-bottom:3rem}
        .portfolio-cat .cat-title{font-size:1.3rem;font-weight:700;margin-bottom:.5rem;display:flex;align-items:center;gap:.5rem}
        .portfolio-cat .cat-sub{color:var(--text-dim);font-size:.9rem;margin-bottom:1.5rem}
        .portfolio-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.25rem}
        .pf-card{background:var(--surface);border:1px solid var(--border);border-radius:20px;overflow:hidden;transition:all .4s;display:block}
        .pf-card:hover{border-color:rgba(0,255,135,.2);transform:translateY(-6px);box-shadow:0 20px 60px rgba(0,0,0,.4)}
        .pf-preview{height:140px;display:flex;align-items:center;justify-content:center;position:relative;font-size:2.8rem}
        .pf-preview::after{content:attr(data-tag);position:absolute;bottom:.6rem;left:50%;transform:translateX(-50%);font-size:.65rem;font-weight:700;
            background:rgba(0,0,0,.6);padding:.2rem .8rem;border-radius:99px;backdrop-filter:blur(8px);text-transform:uppercase;letter-spacing:.06em}
        .pf-body{padding:1.2rem 1.5rem}
        .pf-body h3{font-size:1rem;font-weight:700;margin-bottom:.4rem;
            background:linear-gradient(135deg,var(--green),var(--blue));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
        .pf-body p{color:var(--text-dim);font-size:.82rem;line-height:1.6;margin-bottom:.8rem}
        .pf-link{font-size:.82rem;font-weight:700;color:var(--green);display:inline-flex;align-items:center;gap:.3rem;transition:gap .3s}
        .pf-card:hover .pf-link{gap:.6rem}
        .pf-featured{border-color:rgba(168,85,247,.25)!important;position:relative;overflow:hidden}
        .pf-featured::before{content:'';position:absolute;inset:-2px;border-radius:22px;background:linear-gradient(135deg,var(--green),var(--blue),var(--purple));z-index:-1;opacity:0;transition:opacity .4s}
        .pf-featured:hover::before{opacity:1}
        .pf-featured .pf-preview{height:160px}
        .pf-featured .pf-body h3{font-size:1.1rem;background:linear-gradient(135deg,#1877f2,var(--purple))!important;-webkit-background-clip:text;-webkit-text-fill-color:transparent}
        .pf-featured .pf-body p{font-size:.88rem}
        .pf-featured:hover{box-shadow:0 0 60px rgba(168,85,247,.15),0 20px 60px rgba(0,0,0,.4)}
        .pf-featured::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--blue),var(--purple));transform:scaleX(0);transition:transform .4s;transform-origin:left}
        .pf-featured:hover::after{transform:scaleX(1)}

        .pricing-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.25rem}
        .price-card{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:2rem;transition:all .4s;display:flex;flex-direction:column;position:relative;overflow:hidden}
        .price-card:hover{border-color:rgba(77,159,255,.3);transform:translateY(-5px);box-shadow:0 20px 60px rgba(0,0,0,.4)}
        .price-card::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--blue),var(--green));transform:scaleX(0);transition:transform .4s;transform-origin:left}
        .price-card:hover::after{transform:scaleX(1)}
        .price-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.5rem;margin-bottom:1.2rem}
        .price-icon.g{background:var(--green-dim);color:var(--green)}
        .price-icon.b{background:var(--blue-dim);color:var(--blue)}
        .price-icon.p{background:var(--purple-dim);color:var(--purple)}
        .price-icon.o{background:var(--orange-dim);color:var(--orange)}
        .price-card h3{font-size:1.1rem;font-weight:700;margin-bottom:.5rem}
        .price-card .price{font-family:'Space Grotesk';font-size:1.8rem;font-weight:800;color:#fff;margin-bottom:.5rem}
        .price-card .price span{font-size:.9rem;font-weight:500;color:var(--text-muted)}
        .price-card p{color:var(--text-dim);font-size:.85rem;line-height:1.6;margin-bottom:1.5rem;flex-grow:1}
        .price-card .btn{width:100%;justify-content:center;padding:.75rem 1rem}

        .profile-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem}
        .prf{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:2rem;transition:all .3s}
        .prf:hover{border-color:rgba(77,159,255,.2);transform:translateY(-4px)}
        .prf-icon{font-size:1.8rem;margin-bottom:1rem}
        .prf h3{font-size:1.05rem;font-weight:700;margin-bottom:.6rem}
        .prf p{color:var(--text-dim);font-size:.85rem;line-height:1.7}

        .contact-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem}
        .ctc{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:2rem;text-align:center;transition:all .3s;display:block}
        .ctc:hover{border-color:rgba(0,255,135,.3);transform:translateY(-4px);box-shadow:0 10px 40px rgba(0,0,0,.3)}
        .ctc-icon{width:56px;height:56px;border-radius:50%;margin:0 auto 1rem;display:flex;align-items:center;justify-content:center;font-size:1.4rem;
            background:var(--green-dim);border:1px solid rgba(0,255,135,.15)}
        .ctc h3{font-size:1rem;font-weight:700;margin-bottom:.3rem}
        .ctc p{color:var(--green);font-size:.9rem;font-weight:600}

        footer{padding:2.5rem 1.5rem;text-align:center;border-top:1px solid var(--border);color:var(--text-muted);font-size:.82rem;position:relative;z-index:2}

        .reveal{opacity:0;transform:translateY(40px);transition:all .7s cubic-bezier(.22,1,.36,1)}
        .reveal.visible{opacity:1;transform:translateY(0)}
        .reveal-delay-1{transition-delay:.1s}.reveal-delay-2{transition-delay:.2s}.reveal-delay-3{transition-delay:.3s}
        .reveal-delay-4{transition-delay:.35s}.reveal-delay-5{transition-delay:.4s}

        @media(max-width:960px){
            .hero-inner{grid-template-columns:1fr;text-align:center}
            .hero-desc{margin:0 auto 2rem}
            .hero-stats{justify-content:center}
            .hero-ctas{justify-content:center}
            .services-grid,.profile-grid,.contact-grid,.pricing-grid{grid-template-columns:1fr}
            .nav-links{display:none}
            .hamburger{display:block}
            .metric-grid{grid-template-columns:1fr 1fr}
            .portfolio-grid{grid-template-columns:1fr}
            .pf-gymflow{grid-column:span 1}
            .gymflow-btns{flex-direction:column}
            .cta-btns{flex-direction:column;align-items:center}
            .lead-form{margin:2rem 1rem}
        }
        @media(max-width:600px){
            .hero h1{font-size:2rem}
            .services-grid{grid-template-columns:1fr}
            .chatbot{bottom:1rem;right:1rem}
            .chatbot-window{width:300px;height:400px}
            .cta-section{padding:3rem 1rem}
            .cta-btns .btn{width:100%;justify-content:center}
        }

        .tilt{transform-style:preserve-3d;perspective:1000px}
        .tilt-inner{transition:transform .3s}

        .pf-gymflow{grid-column:span 2;position:relative;background:linear-gradient(135deg,rgba(255,107,53,.08),rgba(255,159,28,.05));border-color:rgba(255,107,53,.25)!important}
        .pf-gymflow::before{content:'';position:absolute;inset:-2px;border-radius:22px;background:linear-gradient(135deg,var(--orange),#ffbf69,var(--green));z-index:-1;opacity:0;transition:opacity .4s}
        .pf-gymflow:hover::before{opacity:1}
        .pf-gymflow .pf-preview{height:200px;background:linear-gradient(135deg,#ff6b35,#ff9f1c)!important}
        .gymflow-preview-icons{font-size:3rem;display:flex;gap:1rem;justify-content:center;align-items:center}
        .gymflow-tags{display:flex;gap:.5rem;flex-wrap:wrap;margin:.8rem 0}
        .gymflow-tag{background:var(--surface-2);border:1px solid var(--border);padding:.3rem .8rem;border-radius:99px;font-size:.72rem;font-weight:600;color:var(--text-dim)}
        .gymflow-metrics{display:flex;gap:1rem;margin:1rem 0;flex-wrap:wrap}
        .gymflow-metric{background:var(--surface-2);border:1px solid rgba(255,107,53,.15);padding:.5rem 1rem;border-radius:10px}
        .gymflow-metric .gm-num{font-size:.8rem;font-weight:600;color:var(--orange)}
        .gymflow-btns{display:flex;gap:1rem;margin-top:1rem;flex-wrap:wrap}
        .pf-gymflow:hover{box-shadow:0 0 80px rgba(255,107,53,.2),0 20px 60px rgba(0,0,0,.4)}

        .cta-section{padding:4rem 1.5rem;background:var(--surface);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
        .cta-inner{max-width:var(--max);margin:0 auto;text-align:center}
        .cta-inner h2{font-size:clamp(1.8rem,3vw,2.5rem);margin-bottom:1rem}
        .cta-inner p{color:var(--text-dim);max-width:500px;margin:0 auto 2rem}
        .cta-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap}

        .lead-form{background:var(--surface);border:1px solid var(--border);border-radius:20px;padding:2rem;max-width:500px;margin:2rem auto}
        .lead-form h3{font-size:1.3rem;margin-bottom:1.5rem;text-align:center}
        .lead-form input,.lead-form textarea{width:100%;padding:1rem;border-radius:12px;border:1px solid var(--border);background:var(--surface-2);color:var(--text);font-family:inherit;font-size:.95rem;margin-bottom:1rem;transition:border-color .3s}
        .lead-form input:focus,.lead-form textarea:focus{outline:none;border-color:var(--green)}
        .lead-form textarea{resize:vertical;min-height:100px}
        .lead-form .btn{width:100%;justify-content:center}

        .chatbot{position:fixed;bottom:2rem;right:2rem;z-index:1000}
        .chatbot-toggle{width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,var(--green),var(--blue));border:none;cursor:pointer;font-size:1.5rem;box-shadow:0 10px 40px rgba(0,255,135,.3);transition:transform .3s;display:flex;align-items:center;justify-content:center}
        .chatbot-toggle:hover{transform:scale(1.1)}
        .chatbot-window{position:absolute;bottom:80px;right:0;width:350px;height:450px;background:var(--surface);border:1px solid var(--border);border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,.5);display:none;flex-direction:column;overflow:hidden}
        .chatbot.open .chatbot-window{display:flex}
        .chatbot-header{background:linear-gradient(135deg,var(--green),var(--blue));padding:1rem;color:#000;font-weight:700;display:flex;justify-content:space-between;align-items:center}
        .chatbot-close{background:none;border:none;color:#000;font-size:1.2rem;cursor:pointer}
        .chatbot-messages{flex:1;padding:1rem;overflow-y:auto;display:flex;flex-direction:column;gap:.8rem}
        .chat-msg{padding:.8rem 1rem;border-radius:12px;max-width:85%;font-size:.9rem}
        .chat-msg.bot{background:var(--surface-2);align-self:flex-start}
        .chat-msg.user{background:var(--green-dim);color:var(--text);align-self:flex-end}
        .chatbot-input{padding:1rem;border-top:1px solid var(--border);display:flex;gap:.5rem}
        .chatbot-input input{flex:1;padding:.8rem;border-radius:99px;border:1px solid var(--border);background:var(--surface-2);color:var(--text)}
        .chatbot-input button{background:var(--green);border:none;border-radius:50%;width:40px;height:40px;cursor:pointer;font-size:1rem}
      ` }} />

      <div className="ambient" />
      <div id="cursor-glow" />

      {/* NAV */}
      <nav>
        <div className="nav-inner">
          <a href="#" className="nav-brand"><span>Signhify</span></a>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#pricing">Pricing</a>
            <a href="#profile">About</a>
            <a href="/gymflow">Gymflow SaaS</a>
            <div className="theme-toggle" role="button" aria-label="Toggle theme">
              <button className="theme-btn active" data-theme="dark" aria-label="Dark mode">🌙</button>
              <button className="theme-btn" data-theme="light" aria-label="Light mode">☀️</button>
            </div>
            <a href="#contact" className="nav-cta">Book Free Call</a>
          </div>
          <button className="hamburger" aria-label="Toggle menu">☰</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-inner container">
          <div className="hero-left">
            <div className="hero-badge"><span className="dot" /> Taking 3 New Clients This Month</div>
            <h1>We Don&apos;t Run Ads.<br />We Engineer <span className="highlight">Revenue Machines.</span></h1>
            <p className="hero-desc">No fluff. No guesswork. Just ruthless, data-driven strategies that turn every dollar into 3, 5, or 10x — backed by AI, obsessively optimized, and built to compound.</p>
            <div className="hero-stats">
              <div className="hero-stat"><div className="val">6+</div><div className="lab">Services</div></div>
              <div className="hero-stat"><div className="val">5</div><div className="lab">Certifications</div></div>
              <div className="hero-stat"><div className="val">100%</div><div className="lab">Dedicated</div></div>
            </div>
            <div className="hero-ctas">
              <a href="#contact" className="btn btn-primary">Get Free Strategy Call →</a>
              <a href="#portfolio" className="btn btn-outline">See Our Work</a>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-card">
              <div className="hero-card-title">Live Performance Snapshot</div>
              <div className="metric-grid">
                <div className="metric"><div className="num g">6+</div><div className="lbl">Revenue Systems Built</div></div>
                <div className="metric"><div className="num b">5</div><div className="lbl">Oracle Certifications</div></div>
                <div className="metric"><div className="num p">2</div><div className="lbl">Global Job Simulations</div></div>
                <div className="metric"><div className="num o">24/7</div><div className="lbl">AI-Powered Optimization</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-section">
        <div className="marquee">
          {['Meta Ads Audit','Google Ads','ROAS Optimization','Lead Funnels','Telegram Marketing','Web Development','AI Analytics','Conversion Optimization','Landing Pages','Performance Reporting','Growth Strategy','Meta Ads Audit','Google Ads','ROAS Optimization','Lead Funnels','Telegram Marketing','Web Development','AI Analytics','Conversion Optimization','Landing Pages','Performance Reporting','Growth Strategy'].map((item, i) => (
            <span key={i} className="marquee-item">{item}</span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services">
        <div className="sec-head reveal">
          <div className="tag green">What We Do</div>
          <h2>Services That <span className="hl">Print Money</span></h2>
          <p>We don&apos;t do vanity metrics. Every move is calculated, every dollar tracked, every campaign built to outperform the last.</p>
        </div>
        <div className="services-grid container">
          <div className="svc reveal reveal-delay-1">
            <div className="svc-icon g">🚀</div>
            <h3>Meta Ads That Scale</h3>
            <p>Full-funnel Facebook & Instagram campaigns engineered for maximum ROAS. Scroll-stopping creatives, smart audiences, and relentless A/B testing.</p>
          </div>
          <div className="svc reveal reveal-delay-2">
            <div className="svc-icon b">🎯</div>
            <h3>Google Ads With Intent</h3>
            <p>Capture high-intent buyers at the exact moment they&apos;re searching. Search, display, and YouTube strategies built to dominate your niche.</p>
          </div>
          <div className="svc reveal reveal-delay-3">
            <div className="svc-icon p">💰</div>
            <h3>Lead Funnels That Convert</h3>
            <p>High-converting landing pages + automated email sequences that turn cold traffic into paying customers on autopilot.</p>
          </div>
          <div className="svc reveal reveal-delay-4">
            <div className="svc-icon o">📱</div>
            <h3>Telegram Growth Systems</h3>
            <p>Custom landing pages designed to explode your Telegram channel membership. Built specifically for sports tips, trading signals, and premium communities.</p>
          </div>
          <div className="svc reveal reveal-delay-5">
            <div className="svc-icon b">⚡</div>
            <h3>Web & App Development</h3>
            <p>Lightning-fast websites and web apps built with modern stacks. Optimized for speed, conversions, and scalability from day one.</p>
          </div>
          <div className="svc reveal reveal-delay-5">
            <div className="svc-icon g">🤖</div>
            <h3>AI-Powered Analytics</h3>
            <p>Leverage Oracle-certified AI expertise to uncover hidden profit opportunities. Real-time dashboards and predictive optimization.</p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing">
        <div className="sec-head reveal">
          <div className="tag blue">Investment</div>
          <h2>Clear Pricing For <span className="hl">Real Growth</span></h2>
          <p>Transparent starting prices for our core services. No hidden fees or surprises.</p>
        </div>
        <div className="pricing-grid container">
          <div className="price-card reveal reveal-delay-1">
            <div className="price-icon g">📈</div>
            <h3>Digital Marketing</h3>
            <div className="price">₹9,999<span>/Month</span></div>
            <p>Meta & Google Ads, PPC, Lead Generation</p>
            <a href="#contact" className="btn btn-outline">Start Growing</a>
          </div>
          <div className="price-card reveal reveal-delay-2">
            <div className="price-icon o">🎨</div>
            <h3>Design & Branding</h3>
            <div className="price">₹5,999<span /></div>
            <p>Logo, Graphics, Creatives, Branding</p>
            <a href="#contact" className="btn btn-outline">Start Growing</a>
          </div>
          <div className="price-card reveal reveal-delay-3">
            <div className="price-icon b">💻</div>
            <h3>Web Development</h3>
            <div className="price">₹7,999<span /></div>
            <p>Modern, Responsive, Custom Solutions</p>
            <a href="#contact" className="btn btn-outline">Start Growing</a>
          </div>
          <div className="price-card reveal reveal-delay-4">
            <div className="price-icon p">🔍</div>
            <h3>SEO</h3>
            <div className="price">₹8,999<span>/Month</span></div>
            <p>On-Page, Off-Page, Technical SEO</p>
            <a href="#contact" className="btn btn-outline">Start Growing</a>
          </div>
          <div className="price-card reveal reveal-delay-5">
            <div className="price-icon g">📱</div>
            <h3>Social Media</h3>
            <div className="price">Custom<span /></div>
            <p>Content, Management, Ads, Engagement</p>
            <a href="#contact" className="btn btn-outline">Start Growing</a>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio">
        <div className="sec-head reveal">
          <div className="tag blue">Our Work</div>
          <h2>Results That <span className="hl">Speak For Themselves</span></h2>
          <p>Every project is a profit system — engineered, tested, and scaled. Don&apos;t take our word for it. See the receipts.</p>
        </div>
        <div className="container">
          {/* GYMFLOW SAAS - FEATURED PROJECT */}
          <div className="portfolio-cat reveal">
            <div className="cat-title">🏆 Featured Project — Gymflow SaaS</div>
            <div className="cat-sub">An AI-powered gym management SaaS for handling members, payments, plans, and analytics across web and mobile platforms.</div>
            <div className="portfolio-grid">
              <div className="pf-card pf-featured pf-gymflow" id="gymflow-card">
                <div className="pf-preview" style={{background:'linear-gradient(135deg,#ff6b35,#ff9f1c,#ffbf69)'}} data-tag="SaaS • Fitness Tech">
                  <div className="gymflow-preview-icons">🏋️📱💳📊</div>
                </div>
                <div className="pf-body">
                  <h3>Gymflow SaaS</h3>
                  <p>AI-powered gym management platform with multi-tenant architecture, real-time dashboard, member management, payment processing, and comprehensive analytics. Built for gym owners who want to scale.</p>
                  <div className="gymflow-tags">
                    <span className="gymflow-tag">SaaS</span>
                    <span className="gymflow-tag">Fitness Tech</span>
                    <span className="gymflow-tag">Automation</span>
                    <span className="gymflow-tag">Mobile + Web</span>
                  </div>
                  <div className="gymflow-metrics">
                    <div className="gymflow-metric"><span className="gm-num">Performance Optimized</span></div>
                    <div className="gymflow-metric"><span className="gm-num">Multi-tenant Architecture</span></div>
                    <div className="gymflow-metric"><span className="gm-num">Real-time Dashboard</span></div>
                  </div>
                  <div className="gymflow-btns">
                    <a href="https://gymflow-saas.vercel.app/" target="_blank" className="btn btn-primary">🌐 Live Web App</a>
                    <a href="https://expo.dev/artifacts/eas/mmUgBVLCg7NSpwHwBpn2AA.apk" target="_blank" className="btn btn-outline">📲 Download APK</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Works: Featured */}
          <div className="portfolio-cat reveal">
            <div className="cat-title">🔥 Recent Work — WhatsApp CRM MVP</div>
            <div className="cat-sub">A live deployable CRM MVP that shows Signhify can go beyond ad management and build lead-handling systems for businesses that need shared inbox visibility, follow-ups, and cleaner pipeline control.</div>
            <div className="portfolio-grid">
              <a href="https://drive.google.com/file/d/16dHEoRCJvwYv6YEa9Qe8a7HSuxVc_iTT/view?usp=sharing" target="_blank" className="pf-card pf-featured">
                <div className="pf-preview" style={{background:'linear-gradient(135deg,#1877f2,#a855f7)'}} data-tag="Featured Report">📊</div>
                <div className="pf-body">
                  <h3>Meta Ads Performance Audit & Optimization Report</h3>
                  <p>A full-spectrum audit dissecting campaign structure, audience segmentation, creative fatigue, and bidding strategy — exposing exactly where ad spend was leaking and mapping a step-by-step optimization blueprint to unlock exponential ROAS.</p>
                  <span className="pf-link">View Full Report →</span>
                </div>
              </a>
              <a href="https://frontend-omega-eight-zbfx853zu2.vercel.app" target="_blank" className="pf-card">
                <div className="pf-preview" style={{background:'linear-gradient(135deg,#25d366,#128c7e)'}} data-tag="Live CRM">📱</div>
                <div className="pf-body">
                  <h3>WhatsApp CRM - Full Stack MVP</h3>
                  <p>Complete WhatsApp Business CRM with Frontend + Backend. Features: Contact management, Conversation tracking, Message templates, Analytics dashboard, Admin panel. Fully deployable MVP ready for production use.</p>
                  <span className="pf-link">View Frontend →</span>
                </div>
              </a>
            </div>
          </div>

          {/* Telegram */}
          <div className="portfolio-cat reveal">
            <div className="cat-title">📱 Telegram Channel Landing Pages</div>
            <div className="cat-sub">Conversion-optimized pages built to turn cold traffic into loyal community members</div>
            <div className="portfolio-grid">
              <a href="https://vip-free-tennis-page.vercel.app/" target="_blank" className="pf-card">
                <div className="pf-preview" style={{background:'linear-gradient(135deg,#00b847,#008335)'}} data-tag="Live">🎾</div>
                <div className="pf-body">
                  <h3>VIP Free Tennis</h3>
                  <p>Free tennis tips & predictions page that converts sports enthusiasts into loyal members</p>
                  <span className="pf-link">View Live →</span>
                </div>
              </a>
              <a href="https://tennis-king-jackpot.vercel.app/" target="_blank" className="pf-card">
                <div className="pf-preview" style={{background:'linear-gradient(135deg,#ffd700,#ff8c00)'}} data-tag="Live">👑</div>
                <div className="pf-body">
                  <h3>Tennis King Jackpot</h3>
                  <p>Exclusive jackpot predictions page for tennis enthusiasts seeking winning edge</p>
                  <span className="pf-link">View Live →</span>
                </div>
              </a>
              <a href="https://cricket-king-rahul.vercel.app/" target="_blank" className="pf-card">
                <div className="pf-preview" style={{background:'linear-gradient(135deg,#ff4757,#c0392b)'}} data-tag="Live">🏏</div>
                <div className="pf-body">
                  <h3>Cricket King Rahul</h3>
                  <p>Premium cricket tips & match predictions with insider-level analysis</p>
                  <span className="pf-link">View Live →</span>
                </div>
              </a>
              <a href="https://hari-cricket.vercel.app/" target="_blank" className="pf-card">
                <div className="pf-preview" style={{background:'linear-gradient(135deg,#3742fa,#2f3542)'}} data-tag="Live">🏏</div>
                <div className="pf-body">
                  <h3>Hari Cricket</h3>
                  <p>Daily cricket predictions, team analysis & betting insights for serious players</p>
                  <span className="pf-link">View Live →</span>
                </div>
              </a>
              <a href="https://rahul-silk.vercel.app/" target="_blank" className="pf-card">
                <div className="pf-preview" style={{background:'linear-gradient(135deg,#a55eea,#8854d0)'}} data-tag="Live">🧣</div>
                <div className="pf-body">
                  <h3>Rahul Silk</h3>
                  <p>Exclusive tips & premium predictions for serious investors</p>
                  <span className="pf-link">View Live →</span>
                </div>
              </a>
            </div>
          </div>

          {/* Custom Development */}
          <div className="portfolio-cat reveal">
            <div className="cat-title">💻 Custom Development Projects</div>
            <div className="cat-sub">Full-stack platforms engineered for speed, scale, and conversion from day one</div>
            <div className="portfolio-grid">
              <a href="https://frontend-omega-eight-zbfx853zu2.vercel.app" target="_blank" className="pf-card">
                <div className="pf-preview" style={{background:'linear-gradient(135deg,#25d366,#128c7e)'}} data-tag="Full Stack MVP">📱</div>
                <div className="pf-body">
                  <h3>WhatsApp CRM - Full Stack MVP</h3>
                  <p>Complete WhatsApp Business CRM with Frontend + Backend. Features include: Contact management, Conversation tracking, Message templates, Analytics dashboard, Admin panel. Fully deployable MVP ready for production use.</p>
                  <span className="pf-link">View Frontend →</span>
                </div>
              </a>
              <a href="https://whatsapp-crm-backend-one.vercel.app" target="_blank" className="pf-card">
                <div className="pf-preview" style={{background:'linear-gradient(135deg,#4d9fff,#2d7dd2)'}} data-tag="Backend API">⚙️</div>
                <div className="pf-body">
                  <h3>WhatsApp CRM Backend API</h3>
                  <p>RESTful API built with Node.js/Express. Features: User authentication, WhatsApp session management, Contact & conversation CRUD, Message handling, Analytics endpoints, MongoDB integration. Production-ready backend service.</p>
                  <span className="pf-link">View Backend API →</span>
                </div>
              </a>
              <a href="https://gplesports.vercel.app/" target="_blank" className="pf-card">
                <div className="pf-preview" style={{background:'linear-gradient(135deg,#ff6b35,#f7931e)'}} data-tag="Live">⚽</div>
                <div className="pf-body">
                  <h3>GPLE Sports</h3>
                  <p>Full-featured sports betting tips platform with live odds, predictions & user dashboard</p>
                  <span className="pf-link">View Live →</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PROFILE */}
      <section id="profile">
        <div className="sec-head reveal">
          <div className="tag purple">About Us</div>
          <h2>Why Top Brands <span className="hl">Choose Us</span></h2>
          <p>5 Oracle certifications. Global agency experience. A track record that speaks louder than promises.</p>
        </div>
        <div className="profile-grid container">
          <div className="prf reveal reveal-delay-1">
            <div className="prf-icon">🎓</div>
            <h3>Elite Education</h3>
            <p>University of Delhi (2022–2026), BA from Vinayaka Missions Sikkim University. Strong academic foundation from BSEB and CBSE boards.</p>
          </div>
          <div className="prf reveal reveal-delay-2">
            <div className="prf-icon">🏆</div>
            <h3>5 Oracle Certifications</h3>
            <p>OCI Foundations 2025, Data Science Professional, AI Foundations, OCI Generative AI Professional, Data Platform Foundations.</p>
          </div>
          <div className="prf reveal reveal-delay-3">
            <div className="prf-icon">💼</div>
            <h3>Real Experience</h3>
            <p>Yescom India Softech, HCLTech Internship, Accenture UK Developer Simulation, Deloitte Australia Cybersecurity Simulation.</p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="sec-head reveal">
          <div className="tag orange">Let&apos;s Talk</div>
          <h2>Ready to <span className="hl">10x Your Revenue?</span></h2>
          <p>Your competitors are already scaling. Your free strategy call is one click away.</p>
        </div>
        <div className="contact-grid container">
          <a href="mailto:piyushrajsingh092@gmail.com" className="ctc reveal reveal-delay-1">
            <div className="ctc-icon">📧</div>
            <h3>Email Us</h3>
            <p>piyushrajsingh092@gmail.com</p>
          </a>
          <a href="https://wa.me/916202442690" target="_blank" className="ctc reveal reveal-delay-2">
            <div className="ctc-icon">💬</div>
            <h3>WhatsApp</h3>
            <p>+91 62024 42690</p>
          </a>
          <a href="https://www.linkedin.com/in/piyushraj-singh" target="_blank" className="ctc reveal reveal-delay-3">
            <div className="ctc-icon">💼</div>
            <h3>LinkedIn</h3>
            <p>Connect with us</p>
          </a>
        </div>

        {/* LEAD CAPTURE FORM */}
        <div className="lead-form reveal">
          <h3>🚀 Get Your Free Consultation</h3>
          <form id="leadForm">
            <input type="text" name="name" placeholder="Your Name" required aria-label="Your name" />
            <input type="email" name="email" placeholder="Email Address" required aria-label="Email address" />
            <input type="tel" name="phone" placeholder="WhatsApp Number" required aria-label="WhatsApp number" />
            <textarea name="message" placeholder="Tell us about your project or requirements..." aria-label="Project details" />
            <button type="submit" className="btn btn-primary">Send Inquiry →</button>
          </form>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="cta-inner reveal">
          <h2>Build Your SaaS With Us</h2>
          <p>Turn your idea into a production-ready SaaS product. From MVP to scale, we handle everything.</p>
          <div className="cta-btns">
            <a href="#contact" className="btn btn-primary">Book Free Consultation →</a>
            <a href="https://gymflow-saas.vercel.app/" target="_blank" className="btn btn-outline">View Gymflow Demo</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© 2026 Signhify Agency. Engineered to convert. Built to scale.</p>
        <p style={{marginTop:'.5rem',fontSize:'.75rem',color:'var(--text-muted)'}}>Powered by <strong style={{color:'var(--green)'}}>Signhify</strong> — Building premium SaaS products</p>
      </footer>

      {/* AI CHATBOT */}
      <div className="chatbot" id="chatbot">
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>🤖 Signhify AI Assistant</span>
            <button className="chatbot-close" aria-label="Close chat">×</button>
          </div>
          <div className="chatbot-messages" id="chatMessages">
            <div className="chat-msg bot">Hi! I&apos;m here to help. Ask me about our services, pricing, or how we can help grow your business!</div>
          </div>
          <div className="chatbot-input">
            <input type="text" id="chatInput" placeholder="Type your message..." aria-label="Chat message" />
            <button aria-label="Send message">➤</button>
          </div>
        </div>
        <button className="chatbot-toggle" aria-label="Open chat">💬</button>
      </div>
    </>
  )
}
