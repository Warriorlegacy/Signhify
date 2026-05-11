'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function AgencyPage() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    // Conversation history for context
    const conversationHistory: { role: string; content: string }[] = []

    function toggleChatbot() {
      document.getElementById('chatbot')?.classList.toggle('open')
    }

    async function sendMessage() {
      const input = document.getElementById('chatInput') as HTMLInputElement
      const userText = input.value.trim()
      if (!userText) return

      const msgs = document.getElementById('chatMessages')!
      input.value = ''
      input.disabled = true

      // Add user message to UI
      msgs.innerHTML += `<div class="chat-msg user">${userText}</div>`
      msgs.scrollTop = msgs.scrollHeight

      // Add typing indicator
      const typingId = 'typing-' + Date.now()
      msgs.innerHTML += `<div class="chat-msg bot typing" id="${typingId}"><span class="dot-pulse"><span></span><span></span><span></span></span></div>`
      msgs.scrollTop = msgs.scrollHeight

      // Add to history
      conversationHistory.push({ role: 'user', content: userText })

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: conversationHistory }),
        })
        const data = await res.json()
        const reply = data.reply || "I'm having trouble right now. Please WhatsApp us at +91 62024 42690!"

        // Remove typing indicator and add real response
        document.getElementById(typingId)?.remove()
        msgs.innerHTML += `<div class="chat-msg bot">${reply}</div>`
        msgs.scrollTop = msgs.scrollHeight

        // Save assistant reply to history
        conversationHistory.push({ role: 'assistant', content: reply })
      } catch {
        document.getElementById(typingId)?.remove()
        msgs.innerHTML += `<div class="chat-msg bot">Connection error. Please WhatsApp us directly at +91 62024 42690 🙏</div>`
        msgs.scrollTop = msgs.scrollHeight
      } finally {
        input.disabled = false
        input.focus()
      }
    }

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
      const waMsg = `New Lead from Signhify (Premium)!\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nMessage: ${data.message}`
      window.open(`https://wa.me/916202442690?text=${encodeURIComponent(waMsg)}`, '_blank')
      alert('Thanks! Redirecting to WhatsApp to complete your inquiry.')
      form.reset()
    })

    // Cursor tracking
    const cursor = document.getElementById('cursor-glow')
    document.addEventListener('mousemove', (e) => {
      if (cursor) {
        cursor.style.left = e.clientX + 'px'
        cursor.style.top = e.clientY + 'px'
      }
    })

    // Dynamic Card Glow (Glassmorphism highlight)
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      target.style.setProperty("--mouse-x", `${x}px`);
      target.style.setProperty("--mouse-y", `${y}px`);
    };

    document.querySelectorAll('.glass-card, .pf-card').forEach((card) => {
      (card as HTMLElement).addEventListener('mousemove', handleMouseMove);
    });

    // Scroll Reveal Observer
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
          obs.unobserve(entry.target)
        }
      })
    }, { threshold: 0.05, rootMargin: '0px 0px 100px 0px' })
    
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))

    // Fallback: force-reveal all elements after 2.5s in case observer misses any
    const fallbackTimer = setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('active'))
    }, 2500)

    // Navbar Scroll Effect
    const nav = document.querySelector('nav')
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) nav?.classList.add('scrolled')
      else nav?.classList.remove('scrolled')
    })

    return () => {
      clearTimeout(fallbackTimer)
      document.querySelectorAll('.glass-card, .pf-card').forEach((card) => {
        (card as HTMLElement).removeEventListener('mousemove', handleMouseMove);
      });
    };
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Syne:wght@600;700;800&display=swap');

        :root {
          --bg: #030305;
          --bg-gradient: radial-gradient(circle at 50% -20%, rgba(20, 10, 45, 0.8) 0%, #030305 50%);
          --surface: rgba(255, 255, 255, 0.015);
          --border: rgba(255, 255, 255, 0.05);
          --border-hover: rgba(255, 255, 255, 0.15);
          --text: #f0f0f5;
          --text-dim: #9ca3af;
          --accent-1: #00ff87; /* Neon Green */
          --accent-2: #a855f7; /* Deep Violet */
          --accent-3: #00e5ff; /* Cyan */
          --font-heading: 'Syne', sans-serif;
          --font-body: 'Outfit', sans-serif;
          --max: 1280px;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; font-size: 16px; }
        body { 
          font-family: var(--font-body); 
          background: var(--bg); 
          background-image: var(--bg-gradient);
          color: var(--text); 
          line-height: 1.6; 
          overflow-x: hidden; 
        }

        ::selection { background: var(--accent-1); color: #000; }

        /* Typography */
        h1, h2, h3, h4 { font-family: var(--font-heading); line-height: 1.1; letter-spacing: -0.02em; }
        .text-gradient {
          background: linear-gradient(135deg, var(--accent-1), var(--accent-3));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .text-gradient-alt {
          background: linear-gradient(135deg, var(--accent-2), var(--accent-3));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Ambient Backgrounds */
        .mesh-bg {
          position: fixed; inset: 0; z-index: -2; pointer-events: none;
          background-image: 
            radial-gradient(circle at 15% 50%, rgba(0, 255, 135, 0.04) 0%, transparent 40%),
            radial-gradient(circle at 85% 30%, rgba(168, 85, 247, 0.05) 0%, transparent 40%);
          filter: blur(60px);
        }
        .noise {
          position: fixed; inset: 0; z-index: -1; opacity: 0.025; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
        }

        /* Cursor Glow */
        #cursor-glow {
          position: fixed; width: 500px; height: 500px; border-radius: 50%; pointer-events: none; z-index: 0;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(0, 255, 135, 0.03) 0%, transparent 60%);
          transition: width 0.3s, height 0.3s;
        }

        /* Navigation */
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 1.2rem 2rem;
          background: rgba(3, 3, 5, 0.4); backdrop-filter: blur(24px) saturate(1.5);
          border-bottom: 1px solid transparent; transition: all 0.4s ease;
        }
        nav.scrolled { padding: 0.8rem 2rem; background: rgba(3, 3, 5, 0.8); border-bottom-color: var(--border); }
        .nav-inner { max-width: var(--max); margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
        .nav-brand { display: flex; align-items: center; gap: 0.8rem; font-family: var(--font-heading); font-size: 1.4rem; font-weight: 800; text-decoration: none; color: #fff; letter-spacing: -0.03em; }
        .nav-brand img { height: 38px; width: 38px; border-radius: 10px; transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .nav-brand:hover img, .nav-brand:hover .nav-logo { transform: scale(1.15) rotate(8deg); box-shadow: 0 0 30px rgba(0, 255, 135, 0.5), 0 10px 40px rgba(0, 255, 135, 0.3); }
        
        .nav-links { display: flex; align-items: center; gap: 2.5rem; }
        .nav-links a { color: var(--text-dim); text-decoration: none; font-weight: 500; font-size: 0.95rem; transition: color 0.3s; position: relative; }
        .nav-links a:not(.nav-cta)::after {
          content: ''; position: absolute; bottom: -4px; left: 0; width: 0%; height: 2px;
          background: var(--accent-1); transition: width 0.3s ease;
        }
        .nav-links a:hover { color: #fff; }
        .nav-links a:hover::after { width: 100%; }
        
        .nav-cta {
          background: #fff; color: #000 !important; padding: 0.6rem 1.4rem; border-radius: 100px; font-weight: 700;
          transition: all 0.3s !important; border: 1px solid transparent;
        }
        .nav-cta:hover { background: transparent; color: var(--accent-1) !important; border-color: var(--accent-1); box-shadow: 0 0 20px rgba(0, 255, 135, 0.2); }
        .hamburger { display: none; background: none; border: none; color: #fff; font-size: 1.8rem; cursor: pointer; }

        /* Buttons */
        .btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 0.6rem;
          padding: 1.1rem 2.2rem; border-radius: 100px; font-family: var(--font-heading); font-weight: 700; font-size: 1rem;
          text-decoration: none; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); cursor: pointer; border: none;
        }
        .btn-glow {
          background: linear-gradient(135deg, var(--accent-1), #00cc6a); color: #000;
          box-shadow: 0 10px 30px -10px rgba(0, 255, 135, 0.5); position: relative; overflow: hidden;
        }
        .btn-glow::after {
          content: ''; position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
          transform: skewX(-20deg); transition: left 0.5s ease;
        }
        .btn-glow:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 20px 40px -10px rgba(0, 255, 135, 0.7); color: #000; }
        .btn-glow:hover::after { left: 200%; }

        .btn-glass {
          background: rgba(255,255,255,0.03); color: #fff; border: 1px solid var(--border); backdrop-filter: blur(10px);
        }
        .btn-glass:hover { background: rgba(255,255,255,0.08); border-color: var(--accent-3); transform: translateY(-3px); color: var(--accent-3); box-shadow: 0 10px 30px -10px rgba(0, 229, 255, 0.3); }

        /* Hero */
        .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; padding: 8rem 2rem 4rem; z-index: 1; text-align: center; overflow: hidden; }
        .hero::before {
          content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
          width: 800px; height: 800px; border-radius: 50%;
          background: radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 60%); z-index: -1;
        }
        .hero-content { max-width: 900px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; animation: fadeUp 1s ease forwards; }
        
        .badge {
          display: inline-flex; align-items: center; gap: 0.6rem; padding: 0.5rem 1.2rem; border-radius: 100px; font-size: 0.85rem; font-weight: 600;
          background: rgba(0, 255, 135, 0.05); border: 1px solid rgba(0, 255, 135, 0.15); color: var(--accent-1); margin-bottom: 2.5rem;
          backdrop-filter: blur(10px);
        }
        .pulse-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent-1); box-shadow: 0 0 12px var(--accent-1); animation: pulse 2s infinite; }
        
        .hero h1 { font-size: clamp(2.5rem, 5vw, 4.5rem); margin-bottom: 1.5rem; text-transform: uppercase; line-height: 1.1; }
        .hero p { font-size: 1.1rem; color: var(--text-dim); max-width: 650px; margin-bottom: 3rem; line-height: 1.7; font-weight: 400; }
        .hero-btns { display: flex; gap: 1.2rem; flex-wrap: wrap; justify-content: center; margin-bottom: 4rem; }

        .hero-stats { display: flex; gap: 4rem; justify-content: center; border-top: 1px solid var(--border); padding-top: 3rem; width: 100%; max-width: 800px; }
        .stat-item { display: flex; flex-direction: column; gap: 0.2rem; }
        .stat-val { font-family: var(--font-heading); font-size: 2rem; font-weight: 800; color: var(--accent-1); }
        .stat-lbl { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-dim); font-weight: 500; }

        /* Sections */
        section { padding: 6rem 2rem; position: relative; z-index: 2; }
        .container { max-width: var(--max); margin: 0 auto; }
        .sec-title { text-align: center; margin-bottom: 4rem; }
        .sec-title .label { font-family: var(--font-heading); color: var(--accent-1); text-transform: uppercase; letter-spacing: 3px; font-size: 0.85rem; font-weight: 700; display: block; margin-bottom: 1rem; }
        .sec-title h2 { font-size: clamp(2rem, 4vw, 3rem); text-transform: uppercase; line-height: 1.1; }

        /* Dynamic Glass Cards */
        .glass-card {
          background: var(--surface); border: 1px solid var(--border); border-radius: 24px; padding: 3rem;
          backdrop-filter: blur(16px); transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); position: relative; overflow: hidden;
        }
        .glass-card::before {
          content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%);
          opacity: 0; transition: opacity 0.5s; z-index: 0; pointer-events: none;
        }
        .glass-card:hover::before { opacity: 1; }
        .glass-card:hover { transform: translateY(-8px); border-color: rgba(255,255,255,0.15); box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
        .glass-card > * { position: relative; z-index: 1; }

        /* Services Grid */
        .svc-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; }
        .svc-icon { 
          width: 70px; height: 70px; border-radius: 20px; background: rgba(255,255,255,0.02); border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center; font-size: 2rem; margin-bottom: 2rem; transition: all 0.5s;
        }
        .glass-card:hover .svc-icon { transform: scale(1.1) rotate(-5deg); border-color: var(--accent-1); background: rgba(0,255,135,0.05); box-shadow: 0 10px 20px rgba(0,255,135,0.1); }
        .glass-card h3 { font-size: 1.5rem; margin-bottom: 1rem; }
        .glass-card p { color: var(--text-dim); font-size: 1rem; line-height: 1.7; }

        /* Portfolio Grid */
        .pf-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 2rem; }
        .pf-card { 
          background: var(--surface); border: 1px solid var(--border); border-radius: 24px; overflow: hidden;
          display: flex; flex-direction: column; text-decoration: none; color: var(--text); transition: all 0.5s;
          position: relative; opacity: 1 !important; transform: none;
        }
        .pf-category { grid-column: 1 / -1; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border); display: block !important; opacity: 1 !important; transform: none !important; }
        .pf-card::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.05), transparent 40%);
          opacity: 0; transition: opacity 0.5s; z-index: 3;
        }
        .pf-card:hover::before { opacity: 1; }
        .pf-card:hover { transform: translateY(-10px) !important; border-color: var(--accent-3); box-shadow: 0 20px 50px rgba(0, 229, 255, 0.15); }
        
        .pf-visual { height: 260px; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
        .pf-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 40%, rgba(3,3,5,0.95)); z-index: 1; }
        
        /* Custom Abstract Visuals for Projects */
        .visual-gigmind { background: linear-gradient(135deg, #0f172a, #1e3a8a); }
        .visual-gigmind .shape { width: 150px; height: 150px; border-radius: 30px; background: linear-gradient(45deg, #3b82f6, #06b6d4); transform: rotate(15deg); filter: drop-shadow(0 20px 30px rgba(0,0,0,0.5)); transition: transform 0.7s; }
        .pf-card:hover .visual-gigmind .shape { transform: rotate(0deg) scale(1.1); }

        .visual-tuition { background: linear-gradient(135deg, #1e1b4b, #4c1d95); }
        .visual-tuition .shape { width: 140px; height: 140px; border-radius: 50%; background: linear-gradient(45deg, #8b5cf6, #d946ef); box-shadow: inset -20px -20px 40px rgba(0,0,0,0.5); transition: transform 0.7s; }
        .pf-card:hover .visual-tuition .shape { transform: scale(1.1) translate(-10px, -10px); }

        .visual-gymflow { background: linear-gradient(135deg, #450a0a, #991b1b); }
        .visual-gymflow .shape { width: 160px; height: 100px; border-radius: 20px; background: linear-gradient(45deg, #ef4444, #f97316); transform: skewX(-15deg); transition: transform 0.7s; }
        .pf-card:hover .visual-gymflow .shape { transform: skewX(0deg) scale(1.1); }

        .visual-crm { background: linear-gradient(135deg, #064e3b, #047857); }
        .visual-crm .shape { width: 120px; height: 120px; background: linear-gradient(45deg, #10b981, #34d399); transform: rotate(45deg); transition: transform 0.7s; }
        .pf-card:hover .visual-crm .shape { transform: rotate(90deg) scale(1.1); }

        .visual-report { background: linear-gradient(135deg, #1877f2, #a855f7); }
        .visual-report .shape { width: 140px; height: 140px; border-radius: 15px; background: linear-gradient(45deg, #ffffff, #e2e8f0); transform: rotate(-10deg); transition: transform 0.7s; }
        .pf-card:hover .visual-report .shape { transform: rotate(0deg) scale(1.1); }

        .visual-telegram { background: linear-gradient(135deg, #0088cc, #005580); }
        .visual-telegram .shape { width: 100px; height: 100px; border-radius: 50%; background: #ffffff; transform: scale(1); transition: transform 0.7s; }
        .pf-card:hover .visual-telegram .shape { transform: scale(1.2); }

        .pf-badge { 
          position: absolute; top: 1.5rem; right: 1.5rem; z-index: 2; padding: 0.5rem 1.2rem; border-radius: 100px;
          background: rgba(0,0,0,0.5); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.1);
          font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #fff;
        }
        
        .pf-content { padding: 2.5rem; position: relative; z-index: 2; flex-grow: 1; display: flex; flex-direction: column; background: var(--surface); }
        .pf-content h3 { font-size: 1.6rem; margin-bottom: 0.8rem; transition: color 0.3s; }
        .pf-card:hover .pf-content h3 { color: var(--accent-1); }
        .pf-content p { color: var(--text-dim); font-size: 0.95rem; line-height: 1.6; margin-bottom: 2rem; flex-grow: 1; }
        .pf-tags { display: flex; gap: 0.6rem; flex-wrap: wrap; margin-bottom: 2rem; }
        .pf-tag { font-size: 0.75rem; padding: 0.4rem 1rem; border-radius: 100px; background: rgba(255,255,255,0.03); color: #fff; border: 1px solid var(--border); font-weight: 500; letter-spacing: 0.5px; }
        .pf-card:hover .pf-tag { border-color: rgba(0,255,135,0.3); background: rgba(0,255,135,0.05); }
        .pf-link-btn { display: inline-flex; align-items: center; gap: 0.6rem; font-family: var(--font-heading); font-weight: 700; font-size: 0.95rem; color: #fff; border-top: 1px solid var(--border); padding-top: 1.5rem; transition: color 0.3s; }
        .pf-card:hover .pf-link-btn { color: var(--accent-3); }
        .pf-link-btn span { transition: transform 0.3s; }
        .pf-card:hover .pf-link-btn span { transform: translateX(5px); }

        /* Featured Portfolio override */
        .pf-featured { grid-column: 1 / -1; display: grid; grid-template-columns: 1.2fr 1fr; gap: 0; }
        .pf-featured .pf-visual { height: auto; min-height: 450px; }
        .pf-featured .pf-content { padding: 4rem; justify-content: center; }
        .pf-featured h3 { font-size: 2.5rem; margin-bottom: 1rem; }
        @media(max-width: 960px) { .pf-featured { grid-template-columns: 1fr; } .pf-featured .pf-visual { min-height: 300px; } .pf-featured .pf-content { padding: 2.5rem; } }

        /* Pricing Grid */
        .price-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
        .price-card { padding: 3rem 2.5rem; text-align: center; }
        .price-card h3 { font-size: 1.2rem; color: var(--text-dim); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 1rem; }
        .price-card .price { font-family: var(--font-heading); font-size: 3rem; font-weight: 800; color: #fff; margin-bottom: 2rem; }
        .price-card .price span { font-size: 1rem; color: var(--text-dim); font-weight: 500; font-family: var(--font-body); }
        .price-features { list-style: none; margin-bottom: 2.5rem; text-align: left; }
        .price-features li { display: flex; align-items: center; gap: 0.8rem; margin-bottom: 1rem; color: var(--text-dim); font-size: 0.95rem; }
        .price-features li::before { content: '✓'; color: var(--accent-1); font-weight: bold; }
        .price-card .btn { width: 100%; }
        
        .price-card.popular { border-color: var(--accent-2); background: linear-gradient(to bottom, rgba(168,85,247,0.05), transparent); transform: scale(1.05); }
        .price-card.popular:hover { transform: scale(1.05) translateY(-8px); border-color: var(--accent-1); }
        .popular-badge { position: absolute; top: 0; left: 50%; transform: translate(-50%, -50%); background: var(--accent-2); color: #fff; padding: 0.4rem 1.2rem; border-radius: 100px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }

        /* Lead Capture */
        .lead-box { max-width: 600px; margin: 0 auto; background: var(--surface); border: 1px solid var(--border); border-radius: 24px; padding: 3rem; backdrop-filter: blur(16px); }
        .lead-form { display: flex; flex-direction: column; gap: 1.5rem; }
        .input-group { position: relative; }
        .input-group input, .input-group textarea {
          width: 100%; background: rgba(0,0,0,0.2); border: 1px solid var(--border); border-radius: 12px;
          padding: 1.2rem; color: #fff; font-family: var(--font-body); font-size: 1rem; transition: all 0.3s;
        }
        .input-group textarea { min-height: 120px; resize: vertical; }
        .input-group input:focus, .input-group textarea:focus { outline: none; border-color: var(--accent-1); background: rgba(0,255,135,0.02); box-shadow: 0 0 0 4px rgba(0,255,135,0.1); }
        .lead-form button { width: 100%; padding: 1.2rem; font-size: 1.1rem; }

        /* Footer */
        footer { padding: 4rem 2rem; border-top: 1px solid var(--border); text-align: center; position: relative; z-index: 2; }
        .footer-logo { display: flex; align-items: center; justify-content: center; gap: 0.8rem; font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; margin-bottom: 1.5rem; color: #fff; }
        .footer-logo img { height: 32px; filter: grayscale(1) brightness(1.5); }
        footer p { color: var(--text-dim); font-size: 0.9rem; }

        /* Marquee */
        .marquee-wrap { padding: 3rem 0; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); overflow: hidden; background: rgba(0,0,0,0.3); position: relative; z-index: 2; }
        .marquee { display: flex; gap: 4rem; animation: scrollLeft 40s linear infinite; width: max-content; }
        .mq-item { font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,0.2); text-transform: uppercase; white-space: nowrap; transition: all 0.4s; }
        .mq-item:hover { color: #fff; -webkit-text-stroke: 0px; text-shadow: 0 0 30px rgba(255,255,255,0.4); transform: scale(1.05); }
        @keyframes scrollLeft { to { transform: translateX(-50%); } }

        /* Animations */
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); filter: blur(10px); } to { opacity: 1; transform: translateY(0); filter: blur(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(0.85); box-shadow: 0 0 20px var(--accent-1); } }
        .reveal { opacity: 0; transform: translateY(40px); transition: all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1); }
        .reveal.active { opacity: 1; transform: translateY(0); }
        .delay-1 { transition-delay: 0.1s; } .delay-2 { transition-delay: 0.2s; } .delay-3 { transition-delay: 0.3s; }

        /* Portfolio Category Dividers - NUCLEAR FIX */
        .pf-category { grid-column: 1 / -1 !important; display: block !important; opacity: 1 !important; visibility: visible !important; margin: 4rem 0 2rem !important; border-bottom: 1px solid var(--border); padding-bottom: 1rem; }
        .pf-category h4 { font-family: var(--font-heading); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 3px; color: var(--accent-1); margin-bottom: 0.5rem; }
        .pf-category p { color: var(--text-dim); font-size: 0.9rem; margin-bottom: 0; }
        
        /* Portfolio Cards - NUCLEAR FIX */
        .pf-card { opacity: 1 !important; transform: none !important; visibility: visible !important; display: flex !important; flex-direction: column; }
        .pf-card:hover { transform: translateY(-10px) !important; }
        .pf-grid { display: grid !important; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)) !important; gap: 2rem !important; opacity: 1 !important; visibility: visible !important; }

        /* Responsive */
        @media(max-width: 1024px) {
          .hero h1 { font-size: clamp(2.2rem, 5vw, 3.5rem); }
          .hero-stats { gap: 2rem; flex-wrap: wrap; }
          .price-card.popular { transform: none; }
          .price-card.popular:hover { transform: translateY(-8px); }
        }
        @media(max-width: 768px) {
          .nav-links { display: none; flex-direction: column; position: absolute; top: 100%; left: 0; width: 100%; background: rgba(3,3,5,0.95); backdrop-filter: blur(20px); padding: 2rem; border-bottom: 1px solid var(--border); }
          .nav-links.open { display: flex; }
          .hamburger { display: block; }
          section { padding: 5rem 1.5rem; }
          .sec-title { margin-bottom: 3rem; }
        }

        /* Chatbot Base Override */
        .chatbot { position: fixed; bottom: 2rem; right: 2rem; z-index: 1000; }
        .chatbot-toggle { width: 64px; height: 64px; border-radius: 50%; background: var(--accent-1); color: #000; border: none; cursor: pointer; font-size: 1.8rem; box-shadow: 0 10px 30px rgba(0,255,135,0.4); transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); display: flex; align-items: center; justify-content: center; }
        .chatbot-toggle:hover { transform: scale(1.1) rotate(10deg); }
        .chatbot-window { position: absolute; bottom: 85px; right: 0; width: 360px; height: 480px; background: rgba(10,10,15,0.95); backdrop-filter: blur(20px); border: 1px solid var(--border); border-radius: 24px; box-shadow: 0 20px 60px rgba(0,0,0,0.8); display: none; flex-direction: column; overflow: hidden; transform-origin: bottom right; animation: scaleIn 0.3s cubic-bezier(0.165, 0.84, 0.44, 1); }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
        .chatbot.open .chatbot-window { display: flex; }
        .chatbot-header { background: rgba(255,255,255,0.03); border-bottom: 1px solid var(--border); padding: 1.2rem; color: #fff; font-family: var(--font-heading); font-weight: 700; display: flex; justify-content: space-between; align-items: center; }
        .chatbot-header .title { display: flex; align-items: center; gap: 0.5rem; }
        .chatbot-header .title::before { content: ''; display: block; width: 10px; height: 10px; border-radius: 50%; background: var(--accent-1); box-shadow: 0 0 10px var(--accent-1); }
        .chatbot-close { background: rgba(255,255,255,0.1); border: none; color: #fff; width: 28px; height: 28px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.3s; }
        .chatbot-close:hover { background: rgba(255,0,85,0.8); }
        .chatbot-messages { flex: 1; padding: 1.5rem; overflow-y: auto; display: flex; flex-direction: column; gap: 1rem; scroll-behavior: smooth; }
        .chat-msg { padding: 0.8rem 1.2rem; border-radius: 16px; max-width: 85%; font-size: 0.95rem; line-height: 1.5; }
        .chat-msg.bot { background: rgba(255,255,255,0.05); align-self: flex-start; border-bottom-left-radius: 4px; }
        .chat-msg.user { background: var(--accent-1); color: #000; align-self: flex-end; border-bottom-right-radius: 4px; font-weight: 500; }
        .chatbot-input { padding: 1.2rem; border-top: 1px solid var(--border); display: flex; gap: 0.8rem; background: rgba(0,0,0,0.2); }
        .chatbot-input input { flex: 1; padding: 0.8rem 1.2rem; border-radius: 100px; border: 1px solid var(--border); background: rgba(255,255,255,0.03); color: #fff; font-family: var(--font-body); transition: border-color 0.3s; }
        .chatbot-input input:focus { outline: none; border-color: var(--accent-1); }
        .chatbot-input button { background: var(--accent-1); color: #000; border: none; border-radius: 50%; width: 44px; height: 44px; cursor: pointer; font-size: 1.2rem; display: flex; align-items: center; justify-content: center; transition: transform 0.3s; }
        .chatbot-input button:hover { transform: scale(1.1); }
        .chatbot-input input:disabled { opacity: 0.5; cursor: not-allowed; }
        /* Typing indicator */
        .chat-msg.typing { background: rgba(255,255,255,0.05); align-self: flex-start; }
        .dot-pulse { display: inline-flex; gap: 4px; align-items: center; height: 20px; }
        .dot-pulse::before, .dot-pulse::after, .dot-pulse span {
          content: ''; display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--accent-1);
          animation: dotBounce 1.2s infinite ease-in-out;
        }
        .dot-pulse::before { animation-delay: 0s; }
        .dot-pulse::after { content: ''; animation-delay: 0.4s; }
        @keyframes dotBounce { 0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; } 40% { transform: scale(1); opacity: 1; } }
      ` }} />

      <div className="mesh-bg" />
      <div className="noise" />
      <div id="cursor-glow" />

      {/* NAV */}
      <nav>
        <div className="nav-inner">
          <a href="#" className="nav-brand">
            <Image src="/signhify-logo.png" alt="Signhify Logo" width={38} height={38} className="nav-logo" />
            Signhify
          </a>
          <div className={`nav-links ${isNavOpen ? 'open' : ''}`}>
            <a href="#services" onClick={() => setIsNavOpen(false)}>Services</a>
            <a href="#portfolio" onClick={() => setIsNavOpen(false)}>Work</a>
            <a href="#pricing" onClick={() => setIsNavOpen(false)}>Pricing</a>
            <a href="#contact" className="nav-cta" onClick={() => setIsNavOpen(false)}>Book Free Call</a>
          </div>
          <button className="hamburger" onClick={() => setIsNavOpen(!isNavOpen)} aria-label="Toggle menu">
            {isNavOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="badge"><span className="pulse-dot" /> Now Accepting 3 New Clients</div>
          <h1>We Engineer <br /><span className="text-gradient">Revenue Machines</span></h1>
          <p>No fluff. No guesswork. Just ruthless, data-driven strategy and premium SaaS engineering that turns every dollar into 10x — backed by AI and built to compound.</p>
          
          <div className="hero-btns">
            <a href="#contact" className="btn btn-glow">Get Free Strategy Call</a>
            <a href="#portfolio" className="btn btn-glass">Explore Our Work</a>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-val">5</span>
              <span className="stat-lbl">Oracle Certs</span>
            </div>
            <div className="stat-item">
              <span className="stat-val" style={{color: 'var(--accent-3)'}}>10x</span>
              <span className="stat-lbl">Average ROI</span>
            </div>
            <div className="stat-item">
              <span className="stat-val" style={{color: 'var(--accent-2)'}}>100%</span>
              <span className="stat-lbl">Custom Built</span>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee">
          {Array(3).fill(['SaaS Development', 'Growth Hacking', 'Meta Ads', 'Web Engineering', 'Conversion Rate Optimization', 'AI Analytics']).flat().map((item, i) => (
            <span key={i} className="mq-item">{item}</span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services">
        <div className="container">
          <div className="sec-title reveal">
            <span className="label">Capabilities</span>
            <h2>Systems That <span className="text-gradient-alt">Scale</span></h2>
          </div>
          <div className="svc-grid">
            <div className="glass-card reveal delay-1">
              <div className="svc-icon">⚡</div>
              <h3>Premium SaaS Dev</h3>
              <p>Lightning-fast web applications built with modern stacks (Next.js, Supabase). Optimized for speed, scale, and seamless user experiences.</p>
            </div>
            <div className="glass-card reveal delay-2">
              <div className="svc-icon">🎯</div>
              <h3>Performance Ads</h3>
              <p>Full-funnel Meta & Google campaigns engineered for maximum ROAS. Scroll-stopping creatives and relentless A/B testing.</p>
            </div>
            <div className="glass-card reveal delay-3">
              <div className="svc-icon">🤖</div>
              <h3>AI & Analytics</h3>
              <p>Leverage Oracle-certified AI expertise to uncover hidden profit opportunities. Real-time dashboards and predictive optimization.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio">
        <div className="container">
          <div className="sec-title">
            <span className="label">The Vault</span>
            <h2>Our <span className="text-gradient">Masterpieces</span></h2>
          </div>
          
          <div className="pf-grid">
            {/* ─── CATEGORY: NON-PROFIT & SOCIAL IMPACT ─── */}
            <div className="pf-category">
              <h4>🌍 Non-Profit & Social Impact</h4>
              <p>Purpose-driven platforms serving communities through education, health & welfare</p>
            </div>

            {/* SEWARTH PATH SANSTHANAM */}
            <a href="https://sewarthpathsansthanam.vercel.app/" target="_blank" className="pf-card pf-featured">
              <div className="pf-visual" style={{background: 'linear-gradient(135deg, #E07B39, #c45d15)'}}>
                <img src="/spf-logo.png" alt="Sewarth Path Sansthanam" style={{width: '200px', height: '200px', objectFit: 'contain', borderRadius: '24px', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))'}} />
                <div className="pf-overlay"></div>
                <div className="pf-badge" style={{background: 'rgba(224, 123, 57, 0.2)', borderColor: '#E07B39'}}>NGO Platform</div>
              </div>
              <div className="pf-content">
                <h3>Sewarth Path Sansthanam</h3>
                <p>Full-featured NGO platform for a non-profit dedicated to Education, Health, Culture, and Social Welfare for marginalized communities. Features multilingual support, Razorpay donation integration, and a clean donor experience.</p>
                <div className="pf-tags">
                  <span className="pf-tag">Next.js</span>
                  <span className="pf-tag">NGO</span>
                  <span className="pf-tag">Donations</span>
                  <span className="pf-tag">Multilingual</span>
                </div>
                <div className="pf-link-btn">View Platform <span>→</span></div>
              </div>
            </a>

            {/* ─── CATEGORY: SAAS PRODUCTS ─── */}
            <div className="pf-category">
              <h4>🚀 SaaS Products</h4>
              <p>Custom-built software products engineered for scale and performance</p>
            </div>

            {/* GIGMIND (NEW) */}
            <a href="https://gigmind-gamma.vercel.app/" target="_blank" className="pf-card pf-featured">
              <div className="pf-visual visual-gigmind">
                <div className="shape"></div>
                <div className="pf-overlay"></div>
                <div className="pf-badge" style={{background: 'rgba(6, 182, 212, 0.2)', borderColor: '#06b6d4'}}>AI Marketplace</div>
              </div>
              <div className="pf-content">
                <h3 className="text-gradient">GigMind</h3>
                <p>An AI-powered service marketplace for India. Just tell the AI what you need—whether it's real estate, medical help, or home repair—and it matches you with verified providers securely.</p>
                <div className="pf-tags">
                  <span className="pf-tag">Next.js</span>
                  <span className="pf-tag">AI Chat matching</span>
                  <span className="pf-tag">Escrow Payments</span>
                </div>
                <div className="pf-link-btn">View Platform <span>→</span></div>
              </div>
            </a>

            {/* TUITIONTRACK (NEW) */}
            <a href="https://tuitiontrack-app.vercel.app/" target="_blank" className="pf-card">
              <div className="pf-visual visual-tuition">
                <div className="shape"></div>
                <div className="pf-overlay"></div>
                <div className="pf-badge" style={{background: 'rgba(139, 92, 246, 0.2)', borderColor: '#8b5cf6'}}>EdTech SaaS</div>
              </div>
              <div className="pf-content">
                <h3>TuitionTrack</h3>
                <p>Complete operations SaaS for tutors. Manage homework, attendance, fees, and provide instant visibility to parents via a clean dashboard.</p>
                <div className="pf-tags">
                  <span className="pf-tag">Supabase</span>
                  <span className="pf-tag">Parent Portal</span>
                  <span className="pf-tag">Multi-tenant</span>
                </div>
                <div className="pf-link-btn">View App <span>→</span></div>
              </div>
            </a>

            {/* GYMFLOW */}
            <a href="https://gymflow-saas.vercel.app/" target="_blank" className="pf-card">
              <div className="pf-visual visual-gymflow">
                <div className="shape"></div>
                <div className="pf-overlay"></div>
                <div className="pf-badge" style={{background: 'rgba(239, 68, 68, 0.2)', borderColor: '#ef4444'}}>Fitness Tech</div>
              </div>
              <div className="pf-content">
                <h3>Gymflow</h3>
                <p>AI-powered gym management platform. Handles member onboarding, subscriptions, custom workout plans, and real-time facility analytics.</p>
                <div className="pf-tags">
                  <span className="pf-tag">SaaS</span>
                  <span className="pf-tag">Web & Mobile API</span>
                </div>
                <div className="pf-link-btn">View Dashboard <span>→</span></div>
              </div>
            </a>

            {/* WHATSAPP CRM */}
            <a href="https://frontend-omega-eight-zbfx853zu2.vercel.app" target="_blank" className="pf-card">
              <div className="pf-visual visual-crm">
                <div className="shape"></div>
                <div className="pf-overlay"></div>
                <div className="pf-badge" style={{background: 'rgba(16, 185, 129, 0.2)', borderColor: '#10b981'}}>Enterprise MVP</div>
              </div>
              <div className="pf-content">
                <h3>WhatsApp CRM</h3>
                <p>Full-stack deployable CRM MVP. Provides shared inbox visibility, automated follow-ups, and clean pipeline control for high-volume sales teams.</p>
                <div className="pf-tags">
                  <span className="pf-tag">Node.js API</span>
                  <span className="pf-tag">Conversational UI</span>
                </div>
                <div className="pf-link-btn">View MVP <span>→</span></div>
              </div>
            </a>

            {/* ─── CATEGORY: MARKETING & META ADS ─── */}
            <div className="pf-category">
              <h4>📊 Marketing & Meta Ads</h4>
              <p>Performance campaigns, audits and lead generation systems</p>
            </div>

            {/* META ADS REPORT */}
            <a href="https://drive.google.com/file/d/16dHEoRCJvwYv6YEa9Qe8a7HSuxVc_iTT/view?usp=sharing" target="_blank" className="pf-card">
              <div className="pf-visual visual-report">
                <div className="shape"></div>
                <div className="pf-overlay"></div>
                <div className="pf-badge" style={{background: 'rgba(255, 255, 255, 0.2)', borderColor: '#ffffff', color: '#000'}}>Audit Report</div>
              </div>
              <div className="pf-content">
                <h3>Meta Ads Performance Audit</h3>
                <p>A full-spectrum audit dissecting campaign structure, audience segmentation, creative fatigue, and bidding strategy — unlocking exponential ROAS.</p>
                <div className="pf-tags">
                  <span className="pf-tag">Meta Ads</span>
                  <span className="pf-tag">Strategy</span>
                  <span className="pf-tag">ROAS</span>
                </div>
                <div className="pf-link-btn">View Full Report <span>→</span></div>
              </div>
            </a>

            {/* ADDED 13th ITEM: META ADS SCALE */}
            <a href="https://signhify.com" target="_blank" className="pf-card">
              <div className="pf-visual visual-report" style={{background: 'linear-gradient(135deg, #00ff87, #00a3ff)'}}>
                <div className="shape"></div>
                <div className="pf-overlay"></div>
                <div className="pf-badge" style={{background: 'rgba(0, 255, 135, 0.2)', borderColor: '#00ff87'}}>Lead Funnel</div>
              </div>
              <div className="pf-content">
                <h3>Real Estate Lead Machine</h3>
                <p>High-converting lead generation funnel for luxury real estate. Integrated with automated CRM follow-ups and appointment booking.</p>
                <div className="pf-tags">
                  <span className="pf-tag">Lead Gen</span>
                  <span className="pf-tag">Automation</span>
                </div>
                <div className="pf-link-btn">View Case Study <span>→</span></div>
              </div>
            </a>

            {/* ─── CATEGORY: TELEGRAM CHANNEL FUNNELS ─── */}
            <div className="pf-category">
              <h4>📲 Telegram Channel Funnels</h4>
              <p>Conversion-optimized landing pages turning cold traffic into loyal community members</p>
            </div>

            {/* TELEGRAM PAGES */}
            <a href="https://vip-free-tennis-page.vercel.app/" target="_blank" className="pf-card">
              <div className="pf-visual visual-telegram">
                <div className="shape"></div>
                <div className="pf-overlay"></div>
                <div className="pf-badge" style={{background: 'rgba(0, 136, 204, 0.2)', borderColor: '#0088cc'}}>Telegram Funnel</div>
              </div>
              <div className="pf-content">
                <h3>VIP Free Tennis</h3>
                <p>Free tennis tips & predictions landing page engineered to convert sports enthusiasts into loyal Telegram community members.</p>
                <div className="pf-tags">
                  <span className="pf-tag">Landing Page</span>
                  <span className="pf-tag">Conversion</span>
                </div>
                <div className="pf-link-btn">View Live <span>→</span></div>
              </div>
            </a>

            <a href="https://tennis-king-jackpot.vercel.app/" target="_blank" className="pf-card">
              <div className="pf-visual visual-telegram" style={{background: 'linear-gradient(135deg, #ffd700, #ff8c00)'}}>
                <div className="shape"></div>
                <div className="pf-overlay"></div>
                <div className="pf-badge" style={{background: 'rgba(255, 140, 0, 0.2)', borderColor: '#ff8c00'}}>Telegram Funnel</div>
              </div>
              <div className="pf-content">
                <h3>Tennis King Jackpot</h3>
                <p>Exclusive jackpot predictions page for tennis enthusiasts seeking a winning edge.</p>
                <div className="pf-tags">
                  <span className="pf-tag">Landing Page</span>
                  <span className="pf-tag">Community</span>
                </div>
                <div className="pf-link-btn">View Live <span>→</span></div>
              </div>
            </a>

            <a href="https://cricket-king-rahul.vercel.app/" target="_blank" className="pf-card">
              <div className="pf-visual visual-telegram" style={{background: 'linear-gradient(135deg, #ff4757, #c0392b)'}}>
                <div className="shape"></div>
                <div className="pf-overlay"></div>
                <div className="pf-badge" style={{background: 'rgba(192, 57, 43, 0.2)', borderColor: '#c0392b'}}>Telegram Funnel</div>
              </div>
              <div className="pf-content">
                <h3>Cricket King Rahul</h3>
                <p>Premium cricket tips & match predictions landing page with insider-level analysis.</p>
                <div className="pf-tags">
                  <span className="pf-tag">Landing Page</span>
                  <span className="pf-tag">Community</span>
                </div>
                <div className="pf-link-btn">View Live <span>→</span></div>
              </div>
            </a>

            <a href="https://hari-cricket.vercel.app/" target="_blank" className="pf-card">
              <div className="pf-visual visual-telegram" style={{background: 'linear-gradient(135deg, #3742fa, #2f3542)'}}>
                <div className="shape"></div>
                <div className="pf-overlay"></div>
                <div className="pf-badge" style={{background: 'rgba(47, 53, 66, 0.2)', borderColor: '#2f3542'}}>Telegram Funnel</div>
              </div>
              <div className="pf-content">
                <h3>Hari Cricket</h3>
                <p>Daily cricket predictions, team analysis & betting insights for serious players.</p>
                <div className="pf-tags">
                  <span className="pf-tag">Landing Page</span>
                  <span className="pf-tag">Community</span>
                </div>
                <div className="pf-link-btn">View Live <span>→</span></div>
              </div>
            </a>

            <a href="https://rahul-silk.vercel.app/" target="_blank" className="pf-card">
              <div className="pf-visual visual-telegram" style={{background: 'linear-gradient(135deg, #a55eea, #8854d0)'}}>
                <div className="shape"></div>
                <div className="pf-overlay"></div>
                <div className="pf-badge" style={{background: 'rgba(136, 84, 208, 0.2)', borderColor: '#8854d0'}}>Telegram Funnel</div>
              </div>
              <div className="pf-content">
                <h3>Rahul Silk</h3>
                <p>Exclusive tips & premium predictions landing page for serious investors.</p>
                <div className="pf-tags">
                  <span className="pf-tag">Landing Page</span>
                  <span className="pf-tag">Community</span>
                </div>
                <div className="pf-link-btn">View Live <span>→</span></div>
              </div>
            </a>

            {/* ─── CATEGORY: CUSTOM DEVELOPMENT ─── */}
            <div className="pf-category">
              <h4>⚙️ Custom Development</h4>
              <p>Full-stack platforms and APIs engineered for scale</p>
            </div>

            <a href="https://whatsapp-crm-backend-one.vercel.app" target="_blank" className="pf-card">
              <div className="pf-visual visual-crm" style={{background: 'linear-gradient(135deg, #4d9fff, #2d7dd2)'}}>
                <div className="shape"></div>
                <div className="pf-overlay"></div>
                <div className="pf-badge" style={{background: 'rgba(45, 125, 210, 0.2)', borderColor: '#2d7dd2'}}>Backend API</div>
              </div>
              <div className="pf-content">
                <h3>WhatsApp CRM Backend</h3>
                <p>RESTful API built with Node.js/Express. Features: User auth, WhatsApp session management, Contact CRUD, MongoDB integration.</p>
                <div className="pf-tags">
                  <span className="pf-tag">Node.js</span>
                  <span className="pf-tag">Express</span>
                  <span className="pf-tag">MongoDB</span>
                </div>
                <div className="pf-link-btn">View Backend API <span>→</span></div>
              </div>
            </a>

            <a href="https://gplesports.vercel.app/" target="_blank" className="pf-card">
              <div className="pf-visual visual-gymflow" style={{background: 'linear-gradient(135deg, #ff6b35, #f7931e)'}}>
                <div className="shape"></div>
                <div className="pf-overlay"></div>
                <div className="pf-badge" style={{background: 'rgba(247, 147, 30, 0.2)', borderColor: '#f7931e'}}>Live Platform</div>
              </div>
              <div className="pf-content">
                <h3>GPLE Sports</h3>
                <p>Full-featured sports betting tips platform with live odds, predictions & user dashboard.</p>
                <div className="pf-tags">
                  <span className="pf-tag">Web App</span>
                  <span className="pf-tag">Sports</span>
                </div>
                <div className="pf-link-btn">View Live <span>→</span></div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing">
        <div className="container">
          <div className="sec-title reveal">
            <span className="label">Investment</span>
            <h2>Transparent <span className="text-gradient-alt">Pricing</span></h2>
          </div>
          <div className="price-grid">
            <div className="glass-card price-card reveal delay-1">
              <h3>Web Development</h3>
              <div className="price">₹7,999<span>/Start</span></div>
              <ul className="price-features">
                <li>Modern Tech Stack (Next.js)</li>
                <li>Responsive Premium Design</li>
                <li>Speed & SEO Optimized</li>
                <li>High Conversion Layouts</li>
              </ul>
              <a href="#contact" className="btn btn-glass">Start Project</a>
            </div>
            
            <div className="glass-card price-card popular reveal delay-2">
              <div className="popular-badge">Most Popular</div>
              <h3 style={{color: '#fff'}}>Digital Marketing</h3>
              <div className="price" style={{color: 'var(--accent-1)'}}>₹9,999<span>/Month</span></div>
              <ul className="price-features">
                <li style={{color: '#fff'}}>Meta & Google Ads Management</li>
                <li style={{color: '#fff'}}>Advanced Lead Funnels</li>
                <li style={{color: '#fff'}}>ROAS Optimization</li>
                <li style={{color: '#fff'}}>Weekly Analytics Reports</li>
              </ul>
              <a href="#contact" className="btn btn-glow">Scale Now</a>
            </div>

            <div className="glass-card price-card reveal delay-3">
              <h3>SEO Excellence</h3>
              <div className="price">₹8,999<span>/Month</span></div>
              <ul className="price-features">
                <li>Deep Technical SEO Audit</li>
                <li>High-Quality Backlinking</li>
                <li>Content Strategy</li>
                <li>Keyword Domination</li>
              </ul>
              <a href="#contact" className="btn btn-glass">Rank Higher</a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="container">
          <div className="sec-title reveal">
            <span className="label">Initiate</span>
            <h2>Let's Build <span className="text-gradient">The Future</span></h2>
          </div>
          
          <div className="lead-box reveal">
            <form id="leadForm" className="lead-form">
              <div className="input-group">
                <input type="text" name="name" placeholder="Your Full Name" required />
              </div>
              <div className="input-group">
                <input type="email" name="email" placeholder="Business Email" required />
              </div>
              <div className="input-group">
                <input type="tel" name="phone" placeholder="WhatsApp Number" required />
              </div>
              <div className="input-group">
                <textarea name="message" placeholder="Tell us about your vision, project, or current bottlenecks..." required></textarea>
              </div>
              <button type="submit" className="btn btn-glow">Send Transmission ↗</button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">
          <Image src="/signhify-logo-new.png" alt="Signhify Logo" width={32} height={32} className="nav-logo" />
          Signhify
        </div>
        <p>© 2026 Signhify Agency. Engineered to convert. Built to scale.</p>
      </footer>

      {/* AI CHATBOT */}
      <div className="chatbot" id="chatbot">
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="title">Signhify Nexus AI</div>
            <button className="chatbot-close" aria-label="Close chat">✕</button>
          </div>
          <div className="chatbot-messages" id="chatMessages">
            <div className="chat-msg bot">Initiating connection...<br/><br/>Hello! I'm the Signhify Nexus. How can I assist in scaling your vision today?</div>
          </div>
          <div className="chatbot-input">
            <input type="text" id="chatInput" placeholder="Type a command..." aria-label="Chat message" />
            <button aria-label="Send message">↗</button>
          </div>
        </div>
        <button className="chatbot-toggle" aria-label="Open chat">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </button>
      </div>
    </>
  )
}
