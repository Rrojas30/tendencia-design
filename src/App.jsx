import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#faf9f5",
  bgDark: "#1a1410",
  orange: "#F6863C",
  orangeDark: "#C8460F",
  orangeLight: "#FFF3EA",
  text: "#1a1410",
  textMuted: "#7a6e65",
  textLight: "#b8a99a",
  white: "#ffffff",
  border: "#e8e0d8",
};

const NAV_LINKS = ["Inicio", "Servicios", "Portafolio", "Proceso", "Contacto"];

const SERVICES = [
  {
    icon: "🎨",
    title: "Diseño de Marca",
    desc: "Creamos identidades visuales que capturan la esencia de las tendencias actuales y las transforman en marcas memorables.",
    tag: "Branding",
  },
  {
    icon: "📱",
    title: "UI/UX Digital",
    desc: "Interfaces intuitivas y visualmente impactantes para apps y sitios web que conectan con el usuario moderno.",
    tag: "Digital",
  },
  {
    icon: "🖨️",
    title: "Diseño Editorial",
    desc: "Revistas, libros y publicaciones que fusionan tendencias con narrativa visual de alto impacto.",
    tag: "Editorial",
  },
  {
    icon: "📦",
    title: "Packaging",
    desc: "Envases y empaques que destacan en el punto de venta, combinando funcionalidad con estética contemporánea.",
    tag: "Packaging",
  },
  {
    icon: "📣",
    title: "Diseño Social",
    desc: "Contenido visual optimizado para redes sociales que genera engagement y refleja las tendencias del momento.",
    tag: "Social",
  },
  {
    icon: "✏️",
    title: "Ilustración",
    desc: "Ilustraciones personalizadas que dan vida a conceptos únicos con un estilo editorial contemporáneo.",
    tag: "Arte",
  },
];

const CATEGORIES = ["Todos", "Branding", "Digital", "Editorial", "Packaging", "Social"];

const PORTFOLIO = [
  { id: 1, title: "Marca Café Lunar", cat: "Branding", color: "#F6863C", emoji: "☕", year: "2024" },
  { id: 2, title: "App Wellness Flow", cat: "Digital", color: "#C8460F", emoji: "🧘", year: "2024" },
  { id: 3, title: "Revista Tendencias", cat: "Editorial", color: "#d4a574", emoji: "📖", year: "2024" },
  { id: 4, title: "Packaging Vino Noir", cat: "Packaging", color: "#8B4513", emoji: "🍷", year: "2023" },
  { id: 5, title: "Campaña @Moda", cat: "Social", color: "#e8724a", emoji: "✨", year: "2023" },
  { id: 6, title: "Identidad Studio K", cat: "Branding", color: "#c05a1a", emoji: "🏛️", year: "2023" },
  { id: 7, title: "Portal Eco Tienda", cat: "Digital", color: "#6b8e6e", emoji: "🌿", year: "2023" },
  { id: 8, title: "Libro Arte Urbano", cat: "Editorial", color: "#4a3728", emoji: "🎭", year: "2023" },
  { id: 9, title: "Caja Regalo Luxe", cat: "Packaging", color: "#b8860b", emoji: "🎁", year: "2022" },
];

const PROCESS = [
  { num: "01", title: "Descubrimiento", desc: "Analizamos tendencias actuales, tu sector y audiencia objetivo para entender el contexto completo del proyecto." },
  { num: "02", title: "Concepto", desc: "Desarrollamos conceptos creativos que conectan las tendencias identificadas con los valores únicos de tu marca." },
  { num: "03", title: "Diseño", desc: "Materializamos el concepto en piezas visuales cuidadosamente diseñadas con atención al detalle." },
  { num: "04", title: "Entrega", desc: "Presentamos los resultados finales con todos los archivos necesarios y guías de uso para tu equipo." },
];

const STATS = [
  { value: "150+", label: "Proyectos completados" },
  { value: "80+", label: "Clientes satisfechos" },
  { value: "5", label: "Años de experiencia" },
  { value: "12", label: "Premios de diseño" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimatedSection({ children, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState("Inicio");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCat, setActiveCat] = useState("Todos");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [formData, setFormData] = useState({ nombre: "", email: "", mensaje: "" });
  const [formSent, setFormSent] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = activeCat === "Todos" ? PORTFOLIO : PORTFOLIO.filter(p => p.cat === activeCat);

  const scrollTo = (section) => {
    setActiveNav(section);
    setMenuOpen(false);
    const id = section.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // TODO: Conectar con servicio de email (EmailJS, Formspree, etc.)
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
    setFormData({ nombre: "", email: "", mensaje: "" });
  };

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", color: COLORS.text, overflowX: "hidden" }}>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(250,249,245,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${COLORS.border}` : "none",
        transition: "all 0.4s ease",
        padding: "0 5%",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => scrollTo("Inicio")}>
            <div style={{
              width: 36, height: 36, background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.orangeDark})`,
              borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, boxShadow: `0 4px 12px ${COLORS.orange}40`
            }}>🎨</div>
            <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px", color: COLORS.text }}>
              trende<span style={{ color: COLORS.orange }}>sign</span>
            </span>
          </div>

          {/* Desktop nav */}
          <div style={{ display: "flex", gap: 6, "@media(max-width:768px)": { display: "none" } }} className="desktop-nav">
            {NAV_LINKS.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                onMouseEnter={() => setHoveredNav(link)}
                onMouseLeave={() => setHoveredNav(null)}
                style={{
                  background: activeNav === link ? COLORS.orangeLight : hoveredNav === link ? COLORS.orangeLight : "transparent",
                  color: activeNav === link ? COLORS.orangeDark : COLORS.textMuted,
                  border: "none", cursor: "pointer",
                  padding: "8px 18px", borderRadius: 100,
                  fontSize: 14, fontWeight: activeNav === link ? 700 : 500,
                  transition: "all 0.2s ease",
                }}
              >{link}</button>
            ))}
          </div>

          <button
            onClick={() => scrollTo("Contacto")}
            style={{
              background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.orangeDark})`,
              color: COLORS.white, border: "none", cursor: "pointer",
              padding: "10px 22px", borderRadius: 100,
              fontSize: 14, fontWeight: 700,
              boxShadow: `0 4px 16px ${COLORS.orange}50`,
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => { e.target.style.transform = "scale(1.05)"; e.target.style.boxShadow = `0 6px 20px ${COLORS.orange}70`; }}
            onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = `0 4px 16px ${COLORS.orange}50`; }}
            className="cta-btn"
          >Hablemos</button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "none" }}
            className="hamburger"
          >
            <div style={{ width: 24, height: 2, background: COLORS.text, margin: "5px 0", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
            <div style={{ width: 24, height: 2, background: COLORS.text, margin: "5px 0", opacity: menuOpen ? 0 : 1, transition: "all 0.3s" }} />
            <div style={{ width: 24, height: 2, background: COLORS.text, margin: "5px 0", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            background: COLORS.white, borderRadius: 16, margin: "0 16px 16px",
            padding: 20, boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            display: "flex", flexDirection: "column", gap: 4,
          }}>
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => scrollTo(link)} style={{
                background: activeNav === link ? COLORS.orangeLight : "transparent",
                color: activeNav === link ? COLORS.orangeDark : COLORS.text,
                border: "none", cursor: "pointer",
                padding: "14px 18px", borderRadius: 12,
                fontSize: 16, fontWeight: 600, textAlign: "left",
                transition: "all 0.2s",
              }}>{link}</button>
            ))}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .cta-btn { display: none !important; }
          .hamburger { display: block !important; }
        }
        @media (min-width: 769px) {
          .hamburger { display: none !important; }
        }
        * { scroll-behavior: smooth; }
        ::selection { background: ${COLORS.orangeLight}; color: ${COLORS.orangeDark}; }
      `}</style>

      {/* HERO */}
      <section id="inicio" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 5% 80px", position: "relative", overflow: "hidden" }}>
        {/* Background decorations */}
        <div style={{
          position: "absolute", top: "10%", right: "-5%", width: 600, height: 600,
          borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.orange}15 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "5%", left: "-10%", width: 400, height: 400,
          borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.orangeDark}10 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          {/* Left */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: COLORS.orangeLight, borderRadius: 100,
              padding: "8px 16px", marginBottom: 32,
              fontSize: 13, fontWeight: 600, color: COLORS.orangeDark,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: COLORS.orange, display: "inline-block", animation: "pulse 2s infinite" }} />
              Donde las tendencias se convierten en diseño
            </div>

            <h1 style={{
              fontSize: "clamp(42px, 6vw, 76px)",
              fontWeight: 900, lineHeight: 1.05,
              letterSpacing: "-2px", marginBottom: 28,
            }}>
              Trends<br />
              <span style={{
                background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.orangeDark})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>become</span><br />
              Designs.
            </h1>

            <p style={{ fontSize: 18, color: COLORS.textMuted, lineHeight: 1.7, marginBottom: 40, maxWidth: 460 }}>
              Transformamos las últimas tendencias en diseños memorables. Identidades visuales, interfaces digitales y experiencias que conectan con el presente.
            </p>

            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button
                onClick={() => scrollTo("Portafolio")}
                style={{
                  background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.orangeDark})`,
                  color: COLORS.white, border: "none", cursor: "pointer",
                  padding: "16px 36px", borderRadius: 100,
                  fontSize: 16, fontWeight: 700,
                  boxShadow: `0 8px 32px ${COLORS.orange}50`,
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = `0 12px 40px ${COLORS.orange}60`; }}
                onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = `0 8px 32px ${COLORS.orange}50`; }}
              >Ver portafolio →</button>

              <button
                onClick={() => scrollTo("Servicios")}
                style={{
                  background: "transparent",
                  color: COLORS.text, border: `2px solid ${COLORS.border}`,
                  cursor: "pointer", padding: "16px 36px", borderRadius: 100,
                  fontSize: 16, fontWeight: 600,
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={e => { e.target.style.borderColor = COLORS.orange; e.target.style.color = COLORS.orange; }}
                onMouseLeave={e => { e.target.style.borderColor = COLORS.border; e.target.style.color = COLORS.text; }}
              >Nuestros servicios</button>
            </div>

            {/* Stats */}
            <div style={{ display: "flex", gap: 40, marginTop: 56, flexWrap: "wrap" }}>
              {STATS.map(stat => (
                <div key={stat.label}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: COLORS.orange }}>{stat.value}</div>
                  <div style={{ fontSize: 13, color: COLORS.textMuted, marginTop: 2 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — hero visual */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
            <div style={{
              width: "100%", maxWidth: 480, aspectRatio: "4/5",
              background: `linear-gradient(145deg, ${COLORS.orangeLight} 0%, #ffe8d6 100%)`,
              borderRadius: 32, display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative", overflow: "hidden",
              boxShadow: `0 32px 80px ${COLORS.orange}25`,
            }}>
              {/* Decorative elements */}
              <div style={{ position: "absolute", top: 30, right: 30, width: 60, height: 60, borderRadius: 16, background: COLORS.orange, opacity: 0.2 }} />
              <div style={{ position: "absolute", bottom: 40, left: 30, width: 40, height: 40, borderRadius: "50%", background: COLORS.orangeDark, opacity: 0.15 }} />

              {/* Main icon */}
              <div style={{ textAlign: "center", zIndex: 1 }}>
                <div style={{ fontSize: 100, filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.15))", marginBottom: 20 }}>🎨</div>
                <div style={{ fontWeight: 900, fontSize: 24, color: COLORS.orangeDark, letterSpacing: "-0.5px" }}>trendesign</div>
                <div style={{ fontSize: 14, color: COLORS.textMuted, marginTop: 6 }}>Studio Creativo</div>
              </div>

              {/* Floating cards */}
              <div style={{
                position: "absolute", top: 40, left: -30,
                background: COLORS.white, borderRadius: 16, padding: "12px 16px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                fontSize: 13, fontWeight: 700,
                animation: "float 3s ease-in-out infinite",
              }}>
                ✨ Diseño Trend
              </div>
              <div style={{
                position: "absolute", bottom: 60, right: -25,
                background: COLORS.white, borderRadius: 16, padding: "12px 16px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                fontSize: 13, fontWeight: 700,
                animation: "float 3.5s ease-in-out infinite 0.5s",
              }}>
                🚀 150+ proyectos
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="servicios" style={{ padding: "100px 5%", background: COLORS.white }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ display: "inline-block", background: COLORS.orangeLight, color: COLORS.orangeDark, padding: "6px 16px", borderRadius: 100, fontSize: 13, fontWeight: 700, marginBottom: 20 }}>
                Servicios
              </div>
              <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, letterSpacing: "-1px", marginBottom: 16 }}>
                Lo que hacemos mejor
              </h2>
              <p style={{ fontSize: 18, color: COLORS.textMuted, maxWidth: 520, margin: "0 auto" }}>
                Cada servicio está pensado para conectar tu visión con las tendencias que mueven el mundo del diseño.
              </p>
            </div>
          </AnimatedSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
            {SERVICES.map((s, i) => (
              <AnimatedSection key={s.title} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div
                  onMouseEnter={() => setHoveredCard(`s${i}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: hoveredCard === `s${i}` ? `linear-gradient(145deg, ${COLORS.orangeLight}, #fff8f4)` : COLORS.bg,
                    borderRadius: 24, padding: 32,
                    border: `1px solid ${hoveredCard === `s${i}` ? COLORS.orange + "40" : COLORS.border}`,
                    transition: "all 0.3s ease",
                    transform: hoveredCard === `s${i}` ? "translateY(-6px)" : "none",
                    boxShadow: hoveredCard === `s${i}` ? `0 16px 48px ${COLORS.orange}20` : "none",
                    cursor: "default",
                  }}
                >
                  <div style={{ fontSize: 40, marginBottom: 20 }}>{s.icon}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <h3 style={{ fontSize: 20, fontWeight: 800 }}>{s.title}</h3>
                    <span style={{ background: COLORS.orangeLight, color: COLORS.orangeDark, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 100 }}>{s.tag}</span>
                  </div>
                  <p style={{ color: COLORS.textMuted, lineHeight: 1.7, fontSize: 15 }}>{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portafolio" style={{ padding: "100px 5%", background: COLORS.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <div style={{ display: "inline-block", background: COLORS.orangeLight, color: COLORS.orangeDark, padding: "6px 16px", borderRadius: 100, fontSize: 13, fontWeight: 700, marginBottom: 20 }}>
                Portafolio
              </div>
              <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, letterSpacing: "-1px", marginBottom: 16 }}>
                Nuestro trabajo
              </h2>
              <p style={{ fontSize: 18, color: COLORS.textMuted, maxWidth: 520, margin: "0 auto" }}>
                Proyectos que demuestran cómo las tendencias se convierten en diseños que perduran.
              </p>
            </div>
          </AnimatedSection>

          {/* Filter tabs */}
          <AnimatedSection>
            <div style={{ display: "flex", gap: 10, marginBottom: 48, flexWrap: "wrap", justifyContent: "center" }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  style={{
                    background: activeCat === cat ? `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.orangeDark})` : COLORS.white,
                    color: activeCat === cat ? COLORS.white : COLORS.textMuted,
                    border: `1px solid ${activeCat === cat ? "transparent" : COLORS.border}`,
                    cursor: "pointer", padding: "10px 22px", borderRadius: 100,
                    fontSize: 14, fontWeight: 600,
                    transition: "all 0.25s ease",
                    boxShadow: activeCat === cat ? `0 4px 16px ${COLORS.orange}40` : "none",
                  }}
                >{cat}</button>
              ))}
            </div>
          </AnimatedSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {filtered.map((p, i) => (
              <AnimatedSection key={p.id} style={{ transitionDelay: `${i * 0.08}s` }}>
                <div
                  onMouseEnter={() => setHoveredCard(`p${p.id}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    borderRadius: 24, overflow: "hidden",
                    boxShadow: hoveredCard === `p${p.id}` ? "0 20px 60px rgba(0,0,0,0.15)" : "0 4px 20px rgba(0,0,0,0.06)",
                    transition: "all 0.35s ease",
                    transform: hoveredCard === `p${p.id}` ? "translateY(-8px) scale(1.01)" : "none",
                    cursor: "pointer",
                    // TODO: Al hacer click, abrir modal con detalle del proyecto
                  }}
                >
                  <div style={{
                    height: 220,
                    background: `linear-gradient(145deg, ${p.color}30, ${p.color}60)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 72, position: "relative", overflow: "hidden",
                  }}>
                    <div style={{
                      position: "absolute", inset: 0,
                      background: hoveredCard === `p${p.id}` ? `${p.color}30` : "transparent",
                      transition: "background 0.3s",
                    }} />
                    {p.emoji}
                    <div style={{
                      position: "absolute", top: 16, right: 16,
                      background: "rgba(255,255,255,0.9)", borderRadius: 100,
                      padding: "4px 12px", fontSize: 12, fontWeight: 700, color: COLORS.textMuted,
                    }}>{p.year}</div>
                  </div>
                  <div style={{ background: COLORS.white, padding: "20px 24px" }}>
                    <span style={{ background: COLORS.orangeLight, color: COLORS.orangeDark, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 100, marginBottom: 10, display: "inline-block" }}>{p.cat}</span>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: COLORS.text }}>{p.title}</h3>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="proceso" style={{ padding: "100px 5%", background: COLORS.bgDark, position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          width: 800, height: 800, borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.orange}08 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 80 }}>
              <div style={{ display: "inline-block", background: `${COLORS.orange}20`, color: COLORS.orange, padding: "6px 16px", borderRadius: 100, fontSize: 13, fontWeight: 700, marginBottom: 20 }}>
                Proceso
              </div>
              <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, letterSpacing: "-1px", marginBottom: 16, color: COLORS.white }}>
                Cómo trabajamos
              </h2>
              <p style={{ fontSize: 18, color: "#9a8a7a", maxWidth: 520, margin: "0 auto" }}>
                Un proceso estructurado que garantiza resultados que superan las expectativas.
              </p>
            </div>
          </AnimatedSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 32 }}>
            {PROCESS.map((step, i) => (
              <AnimatedSection key={step.num} style={{ transitionDelay: `${i * 0.15}s` }}>
                <div
                  onMouseEnter={() => setHoveredCard(`proc${i}`)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: hoveredCard === `proc${i}` ? `${COLORS.orange}15` : "rgba(255,255,255,0.05)",
                    border: `1px solid ${hoveredCard === `proc${i}` ? COLORS.orange + "40" : "rgba(255,255,255,0.08)"}`,
                    borderRadius: 24, padding: 36,
                    transition: "all 0.3s ease",
                    transform: hoveredCard === `proc${i}` ? "translateY(-6px)" : "none",
                  }}
                >
                  <div style={{
                    fontSize: 48, fontWeight: 900, color: COLORS.orange,
                    opacity: 0.6, lineHeight: 1, marginBottom: 24,
                    fontVariantNumeric: "tabular-nums",
                  }}>{step.num}</div>
                  <h3 style={{ fontSize: 22, fontWeight: 800, color: COLORS.white, marginBottom: 12 }}>{step.title}</h3>
                  <p style={{ color: "#9a8a7a", lineHeight: 1.7, fontSize: 15 }}>{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section style={{
        padding: "80px 5%",
        background: `linear-gradient(135deg, ${COLORS.orange} 0%, ${COLORS.orangeDark} 100%)`,
        textAlign: "center",
      }}>
        <AnimatedSection>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 900, color: COLORS.white, letterSpacing: "-1px", marginBottom: 20 }}>
            ¿Listo para que tu idea<br />se convierta en diseño?
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", marginBottom: 40 }}>
            Cuéntanos tu proyecto y lo convertimos en una experiencia visual única.
          </p>
          <button
            onClick={() => scrollTo("Contacto")}
            style={{
              background: COLORS.white, color: COLORS.orangeDark,
              border: "none", cursor: "pointer",
              padding: "18px 48px", borderRadius: 100,
              fontSize: 17, fontWeight: 800,
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => { e.target.style.transform = "translateY(-3px) scale(1.02)"; e.target.style.boxShadow = "0 14px 40px rgba(0,0,0,0.25)"; }}
            onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = "0 8px 32px rgba(0,0,0,0.2)"; }}
          >Empezar proyecto →</button>
        </AnimatedSection>
      </section>

      {/* CONTACT */}
      <section id="contacto" style={{ padding: "100px 5%", background: COLORS.white }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ display: "inline-block", background: COLORS.orangeLight, color: COLORS.orangeDark, padding: "6px 16px", borderRadius: 100, fontSize: 13, fontWeight: 700, marginBottom: 20 }}>
                Contacto
              </div>
              <h2 style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, letterSpacing: "-1px", marginBottom: 16 }}>
                Hablemos de tu proyecto
              </h2>
              <p style={{ fontSize: 18, color: COLORS.textMuted, maxWidth: 480, margin: "0 auto" }}>
                Estamos listos para escucharte y transformar tu visión en realidad.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
              {/* Info */}
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 32 }}>Información de contacto</h3>
                {[
                  { icon: "📧", label: "Email", val: "hola@trendesign.com" },
                  { icon: "📱", label: "WhatsApp", val: "+1 (555) 000-0000" },
                  { icon: "📍", label: "Ubicación", val: "Ciudad de México, MX" },
                  { icon: "⏰", label: "Horario", val: "Lun – Vie, 9:00 – 18:00" },
                ].map(item => (
                  // TODO: Agregar datos de contacto reales
                  <div key={item.label} style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 24 }}>
                    <div style={{ width: 46, height: 46, borderRadius: 12, background: COLORS.orangeLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.5px" }}>{item.label}</div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: COLORS.text, marginTop: 2 }}>{item.val}</div>
                    </div>
                  </div>
                ))}

                {/* Social */}
                <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                  {["Instagram", "Behance", "LinkedIn"].map(net => (
                    // TODO: Agregar links a redes sociales reales
                    <button key={net} style={{
                      background: COLORS.bg, border: `1px solid ${COLORS.border}`,
                      borderRadius: 12, padding: "10px 16px",
                      fontSize: 13, fontWeight: 600, color: COLORS.textMuted,
                      cursor: "pointer", transition: "all 0.2s",
                    }}
                      onMouseEnter={e => { e.target.style.borderColor = COLORS.orange; e.target.style.color = COLORS.orange; }}
                      onMouseLeave={e => { e.target.style.borderColor = COLORS.border; e.target.style.color = COLORS.textMuted; }}
                    >{net}</button>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div style={{ background: COLORS.bg, borderRadius: 24, padding: 40, border: `1px solid ${COLORS.border}` }}>
                {formSent ? (
                  <div style={{ textAlign: "center", padding: "40px 20px" }}>
                    <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
                    <h3 style={{ fontSize: 22, fontWeight: 800, color: COLORS.text, marginBottom: 12 }}>¡Mensaje enviado!</h3>
                    <p style={{ color: COLORS.textMuted }}>Te responderemos pronto. ¡Gracias por contactarnos!</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {[
                      { key: "nombre", label: "Tu nombre", placeholder: "¿Cómo te llamas?", type: "text" },
                      { key: "email", label: "Email", placeholder: "tu@email.com", type: "email" },
                    ].map(field => (
                      <div key={field.key}>
                        <label style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, display: "block", marginBottom: 8 }}>{field.label}</label>
                        <input
                          type={field.type}
                          required
                          value={formData[field.key]}
                          onChange={e => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                          placeholder={field.placeholder}
                          style={{
                            width: "100%", padding: "14px 18px",
                            borderRadius: 14, border: `1.5px solid ${COLORS.border}`,
                            fontSize: 15, background: COLORS.white,
                            outline: "none", transition: "border-color 0.2s",
                            color: COLORS.text, boxSizing: "border-box",
                          }}
                          onFocus={e => { e.target.style.borderColor = COLORS.orange; }}
                          onBlur={e => { e.target.style.borderColor = COLORS.border; }}
                        />
                      </div>
                    ))}
                    <div>
                      <label style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, display: "block", marginBottom: 8 }}>Tu mensaje</label>
                      <textarea
                        required
                        rows={4}
                        value={formData.mensaje}
                        onChange={e => setFormData(prev => ({ ...prev, mensaje: e.target.value }))}
                        placeholder="Cuéntanos sobre tu proyecto..."
                        style={{
                          width: "100%", padding: "14px 18px",
                          borderRadius: 14, border: `1.5px solid ${COLORS.border}`,
                          fontSize: 15, background: COLORS.white,
                          outline: "none", resize: "vertical",
                          fontFamily: "inherit", color: COLORS.text,
                          transition: "border-color 0.2s", boxSizing: "border-box",
                        }}
                        onFocus={e => { e.target.style.borderColor = COLORS.orange; }}
                        onBlur={e => { e.target.style.borderColor = COLORS.border; }}
                      />
                    </div>
                    <button
                      type="submit"
                      style={{
                        background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.orangeDark})`,
                        color: COLORS.white, border: "none", cursor: "pointer",
                        padding: "16px 32px", borderRadius: 14,
                        fontSize: 16, fontWeight: 700,
                        boxShadow: `0 6px 24px ${COLORS.orange}45`,
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = `0 10px 32px ${COLORS.orange}55`; }}
                      onMouseLeave={e => { e.target.style.transform = "none"; e.target.style.boxShadow = `0 6px 24px ${COLORS.orange}45`; }}
                    >Enviar mensaje →</button>
                  </form>
                )}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: COLORS.bgDark, padding: "60px 5% 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 40, marginBottom: 48 }}>
            {/* Brand */}
            <div style={{ maxWidth: 280 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, background: `linear-gradient(135deg, ${COLORS.orange}, ${COLORS.orangeDark})`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🎨</div>
                <span style={{ fontWeight: 800, fontSize: 20, color: COLORS.white }}>trende<span style={{ color: COLORS.orange }}>sign</span></span>
              </div>
              <p style={{ color: "#7a6e65", lineHeight: 1.7, fontSize: 14 }}>
                Transformamos tendencias en diseños que conectan marcas con el mundo contemporáneo.
              </p>
            </div>

            {/* Links */}
            {[
              { title: "Servicios", items: ["Diseño de Marca", "UI/UX Digital", "Diseño Editorial", "Packaging"] },
              { title: "Estudio", items: ["Sobre nosotros", "Portafolio", "Proceso", "Blog"] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ color: COLORS.white, fontWeight: 700, marginBottom: 16, fontSize: 14 }}>{col.title}</h4>
                {col.items.map(item => (
                  // TODO: Agregar páginas internas para cada enlace
                  <div key={item} style={{ color: "#7a6e65", fontSize: 14, marginBottom: 10, cursor: "pointer", transition: "color 0.2s" }}
                    onMouseEnter={e => { e.target.style.color = COLORS.orange; }}
                    onMouseLeave={e => { e.target.style.color = "#7a6e65"; }}
                  >{item}</div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <p style={{ color: "#5a4e45", fontSize: 13 }}>© 2024 trendesign. Todos los derechos reservados.</p>
            <p style={{ color: "#5a4e45", fontSize: 13 }}>Hecho con ❤️ y mucho café</p>
          </div>
        </div>
      </footer>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
        @media (max-width: 768px) {
          section { padding-left: 5% !important; padding-right: 5% !important; }
        }
      `}</style>
    </div>
  );
}