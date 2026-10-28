import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Check, Copy, Download, ExternalLink, Github, Lightbulb, Linkedin, Mail, MapPin, Menu, MessageCircle, Phone, RefreshCw, Users, X } from 'lucide-react';
import { FaDatabase, FaJava, FaSitemap } from 'react-icons/fa';
import { SiCss, SiExpress, SiGit, SiGithub, SiHtml5, SiJavascript, SiMongodb, SiMysql, SiNodedotjs, SiReact, SiRender, SiVercel } from 'react-icons/si';
import { TbApi } from 'react-icons/tb';
import { links, phrases, projects, skills, timeline } from './data.js';

const EASE = [0.2, 0.7, 0.2, 1];
const rise = { hidden: { opacity: 0, y: 34 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const stagger = (gap = 0.1, delay = 0) => ({ hidden: {}, show: { transition: { staggerChildren: gap, delayChildren: delay } } });
const fine = () => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
// Smooth, reliable jump to a section (works the same on phones, where plain #links can misbehave)
const jump = (e, id) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (!el) return;
  const calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'start' });
  window.history.replaceState(null, '', `#${id}`);
};
const inView = { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-70px' } };

/* ---------- small building blocks ---------- */
function Magnetic({ children }) {
  const ref = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 }), sy = useSpring(y, { stiffness: 220, damping: 16 });
  const move = (e) => { if (!fine()) return; const r = ref.current.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.25); y.set((e.clientY - r.top - r.height / 2) * 0.35); };
  return <motion.span ref={ref} className="mag" style={{ x: sx, y: sy }} onMouseMove={move} onMouseLeave={() => { x.set(0); y.set(0); }}>{children}</motion.span>;
}

function Tilt({ children, className }) {
  const ref = useRef(null);
  const x = useMotionValue(0.5), y = useMotionValue(0.5);
  const rx = useSpring(useTransform(y, [0, 1], [5, -5]), { stiffness: 140, damping: 18 });
  const ry = useSpring(useTransform(x, [0, 1], [-7, 7]), { stiffness: 140, damping: 18 });
  const move = (e) => {
    if (!fine()) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width); y.set((e.clientY - r.top) / r.height);
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`); ref.current.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return <motion.figure ref={ref} className={className} style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }} onMouseMove={move} onMouseLeave={() => { x.set(0.5); y.set(0.5); }}>{children}</motion.figure>;
}

function Typewriter() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0), [n, setN] = useState(0), [del, setDel] = useState(false);
  useEffect(() => {
    if (reduce) return undefined;
    const p = phrases[i];
    let t;
    if (!del && n < p.length) t = setTimeout(() => setN(n + 1), 65);
    else if (!del) t = setTimeout(() => setDel(true), 1500);
    else if (n > 0) t = setTimeout(() => setN(n - 1), 30);
    else { setDel(false); setI((i + 1) % phrases.length); }
    return () => clearTimeout(t);
  }, [n, del, i, reduce]);
  return <span className="type">{reduce ? phrases[0] : phrases[i].slice(0, n)}<i className="caret" /></span>;
}

/* ---------- layout pieces ---------- */
function Progress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  return <motion.div className="progress" style={{ scaleX }} />;
}

function Backdrop() {
  return <div className="backdrop" aria-hidden="true"><i className="grid" /></div>;
}

const sections = [['projects', 'Projects'], ['skills', 'Skills'], ['background', 'Background'], ['contact', 'Contact']];

function Nav() {
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const on = () => setStuck(window.scrollY > 24);
    on(); window.addEventListener('scroll', on, { passive: true });
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => { window.removeEventListener('scroll', on); io.disconnect(); };
  }, []);
  return (
    <header className={`nav ${stuck ? 'stuck' : ''}`}>
      <div className="wrap bar">
        <a className="logo" href="#top" aria-label="Back to top" onClick={(e) => jump(e, 'top')}><span className="mono">V</span><b>Vigneswaran V</b></a>
        <nav className="links" aria-label="Main">
          {sections.map(([id, label]) => (
            <a key={id} href={`#${id}`} className={active === id ? 'on' : ''} onClick={(e) => jump(e, id)}>
              {active === id && <motion.span layoutId="pill" className="pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              <span>{label}</span>
            </a>
          ))}
          <a className="res" href={links.resume} download><Download size={15} /> Resume</a>
        </nav>
        <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>{open ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div className="drawer" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }}>
            {sections.map(([id, label]) => <a key={id} href={`#${id}`} onClick={(e) => { setOpen(false); jump(e, id); }}>{label}</a>)}
            <a href={links.resume} download>Download resume</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* Click-to-email that works even without a mail app: Gmail, Outlook, the default app, or copy the address. */
function MailMenu({ className, label, children }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const esc = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', close); document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', esc); };
  }, [open]);
  const to = encodeURIComponent(links.email), subject = encodeURIComponent('Hello Vigneswaran');
  const copy = async () => { try { await navigator.clipboard.writeText(links.email); } catch { /* clipboard blocked */ } setCopied(true); setTimeout(() => setCopied(false), 1800); };
  return (
    <span className="mailwrap" ref={ref}>
      <button type="button" className={className} aria-label={label} aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(!open)}>{children}</button>
      <AnimatePresence>
        {open && (
          <motion.div className="mailpop" role="menu" initial={{ opacity: 0, y: 8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.97 }} transition={{ duration: 0.18, ease: EASE }}>
            <p className="mp-title">Send an email to</p>
            <p className="mp-addr">{links.email}</p>
            <a role="menuitem" href={`https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}`} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}><Mail size={16} /> Write in Gmail <ExternalLink size={14} /></a>
            <a role="menuitem" href={`https://outlook.live.com/mail/0/deeplink/compose?to=${to}&subject=${subject}`} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}><Mail size={16} /> Write in Outlook <ExternalLink size={14} /></a>
            <a role="menuitem" href={`mailto:${links.email}?subject=${subject}`} onClick={() => setOpen(false)}><Mail size={16} /> Open my mail app</a>
            <button role="menuitem" type="button" onClick={copy}>{copied ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy email address</>}</button>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <motion.div className="hero-text" variants={stagger(0.11, 0.1)} initial="hidden" animate="show">
          <motion.p variants={rise} className="status"><i /> Open to entry-level software developer roles</motion.p>
          <motion.h1 variants={rise}><span className="hi">Hi, I'm</span><span className="nm">Vigneswaran V</span></motion.h1>
          <motion.p variants={rise} className="typed">I build <Typewriter /></motion.p>
          <motion.p variants={rise} className="intro">Final-year Computer Science and Engineering student from Salem, working with MongoDB, Express, React, Node.js and Java. I like apps that solve a clear problem for real people, and I deploy everything I build.</motion.p>
          <motion.div variants={rise} className="cta">
            <Magnetic><a className="btn primary" href={links.resume} download><Download size={18} /> Download resume</a></Magnetic>
            <Magnetic><a className="btn ghost" href="#projects" onClick={(e) => jump(e, 'projects')}>View projects <ArrowUpRight size={18} /></a></Magnetic>
          </motion.div>
          <motion.div variants={rise} className="social">
            <a href={links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github size={20} /></a>
            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={20} /></a>
            <MailMenu className="mailbtn" label="Email me"><Mail size={20} /></MailMenu>
            <span className="where"><MapPin size={16} /> Salem, Tamil Nadu</span>
          </motion.div>
        </motion.div>

        <motion.div className="portrait" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: EASE }}>
          <img src="/assets/vigneswaran.webp" width="900" height="1006" alt="Portrait of Vigneswaran V in a black suit and tie" fetchpriority="high" />
        </motion.div>
      </div>
      <a className="cue" href="#projects" aria-label="Scroll to projects" onClick={(e) => jump(e, 'projects')}><i /></a>
    </section>
  );
}

function SectionHead({ title, lead }) {
  return (
    <motion.div className="shead" variants={stagger(0.08)} {...inView}>
      <motion.h2 variants={rise}>{title}</motion.h2>
      {lead && <motion.p variants={rise} className="lead">{lead}</motion.p>}
    </motion.div>
  );
}

function Project({ p }) {
  return (
    <motion.article className="proj" style={{ '--c': p.color }} variants={stagger(0.12)} {...inView}>
      <motion.div className="phead" variants={rise}>
        <div><h3>{p.title}</h3><p className="sub">{p.sub}</p></div>
        <p className="plinks">
          {p.live && <a className="pbtn solid" href={p.live} target="_blank" rel="noopener noreferrer">Open live app <ArrowUpRight size={16} /></a>}
          {p.code && <a className="pbtn" href={p.code} target="_blank" rel="noopener noreferrer"><Github size={16} /> Source code</a>}
        </p>
      </motion.div>
      <motion.div className="pbody" variants={rise}>
        <p>{p.desc}</p>
        <ul>{p.points.map((t) => <li key={t}>{t}</li>)}</ul>
      </motion.div>
      <motion.div variants={rise}>
        <Tilt className="frame">
          <div className="fbar"><i /><i /><i /><span>{p.frame}</span></div>
          <img src={p.img} alt={p.alt} loading="lazy" />
        </Tilt>
      </motion.div>
      <motion.p variants={rise} className="stack">{p.stack}</motion.p>
    </motion.article>
  );
}

const ICON = {
  'Java': [FaJava, '#F89820'], 'JavaScript': [SiJavascript, '#F7DF1E'], 'HTML': [SiHtml5, '#E34F26'], 'CSS': [SiCss, '#1572B6'],
  'React.js': [SiReact, '#61DAFB'], 'Node.js': [SiNodedotjs, '#6CC24A'], 'Express.js': [SiExpress, '#E7ECF5'], 'MongoDB': [SiMongodb, '#47A248'],
  'Git': [SiGit, '#F05032'], 'GitHub': [SiGithub, '#E7ECF5'], 'SQL': [SiMysql, '#4C9FD6'], 'Data Structures and Algorithms': [FaSitemap, '#2DD4BF'],
  'REST APIs': [TbApi, '#FF8A4C'], 'MongoDB Atlas': [SiMongodb, '#47A248'], 'Vercel': [SiVercel, '#E7ECF5'], 'Render': [SiRender, '#46E3B7'],
  'Problem solving': [Lightbulb, '#F5B84B'], 'Teamwork': [Users, '#5B8CFF'], 'Communication': [MessageCircle, '#2DD4BF'], 'Adaptability': [RefreshCw, '#FB7A3C'],
};

function Skills() {
  return (
    <motion.div className="bento" variants={stagger(0.12)} {...inView}>
      {skills.map((g, gi) => (
        <motion.div key={g.title} className={`bcard b${gi}`} variants={rise}>
          <h3>{g.title}</h3>
          <div className="tiles">
            {g.items.map((name) => {
              const [Icon, color] = ICON[name] || [FaDatabase, '#2DD4BF'];
              return (
                <motion.div key={name} className="tile" style={{ '--b': color }} whileHover={{ y: -6 }} transition={{ type: 'spring', stiffness: 320, damping: 20 }}>
                  <span className="ico"><Icon size={26} /></span><span className="tn">{name}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function Timeline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 72%', 'end 62%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 110, damping: 24 });
  return (
    <div className="tl" ref={ref}>
      <div className="rail"><motion.i style={{ scaleY: fill }} /></div>
      {timeline.map((t) => (
        <motion.div key={t.title + t.type} className="tli" variants={rise} {...inView} whileHover={{ x: 8 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}>
          <span className="dot" />
          <small>{t.type}{t.when ? ` · ${t.when}` : ''}</small>
          <h3>{t.title}</h3>
          <p>{t.note}</p>
        </motion.div>
      ))}
    </div>
  );
}

function Contact() {
  return (
    <motion.div className="cbox" variants={stagger(0.1)} {...inView}>
      <motion.h2 variants={rise}>Let's talk</motion.h2>
      <motion.p variants={rise} className="lead">I'm looking for an entry-level software development role. Email or call me, whichever is easier.</motion.p>
      <motion.div variants={rise}><MailMenu className="mail" label="Email options">{links.email}</MailMenu></motion.div>
      <motion.div variants={rise} className="crow">
        <Magnetic><MailMenu className="btn primary" label="Email me"><Mail size={18} /> Email me</MailMenu></Magnetic>
        <a className="btn ghost" href={`tel:${links.phone}`}><Phone size={18} /> {links.phoneText}</a>
        <a className="btn ghost" href={links.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={18} /> LinkedIn</a>
        <a className="btn ghost" href={links.github} target="_blank" rel="noopener noreferrer"><Github size={18} /> GitHub</a>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  return (
    <>
      <Progress /><Backdrop /><Nav />
      <main>
        <Hero />
        <section id="projects"><div className="wrap">
          <SectionHead title="Projects" lead="Three full-stack MERN apps, each deployed and open to try. Demo logins are on every login page." />
          {projects.map((p) => <Project key={p.title} p={p} />)}
        </div></section>
        <section id="skills"><div className="wrap"><SectionHead title="Skills" /><Skills /></div></section>
        <section id="background"><div className="wrap"><SectionHead title="Background" lead="Education, internships and things I've done outside the classroom." /><Timeline /></div></section>
        <section id="contact"><div className="wrap"><Contact /></div></section>
      </main>
      <footer>Vigneswaran V, 2026</footer>
    </>
  );
}
