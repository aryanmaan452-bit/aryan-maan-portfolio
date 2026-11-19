import { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Aperture, Asterisk, Menu, MessageSquare, X } from 'lucide-react'
import { projects, type Project } from './projects'
import { interests, profile } from './profile'
import './styles.css'

const navigation = [
  ['home', 'Home'], ['work', 'Selected Work'], ['about', 'About'],
  ['interests', 'Interests'], ['experiments', 'Experiments'], ['contact', 'Contact'],
]

const artworkIcons = {
  thinkpoint: Aperture,
  chatbot: MessageSquare,
  experiments: Asterisk,
}

function ProjectCard({ project }: { project: Project }) {
  const Icon = artworkIcons[project.artwork]
  return (
    <article id={project.id} className="project" tabIndex={-1} data-reveal>
      <div className={`project-art art-${project.artwork}`}>
        {project.image ? (
          <img src={project.image.src} alt={project.image.alt} loading="lazy" decoding="async" />
        ) : (
          <>
            <div className="art-grid" aria-hidden="true" />
            <Icon className="project-glyph" strokeWidth={0.8} aria-hidden="true" />
            <span className="art-note">Placeholder artwork</span>
          </>
        )}
      </div>
      <div className="project-copy">
        <p className="label">{project.category}</p>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        {project.url ? <a className="text-link" href={project.url}>Visit {project.title}</a> : <p className="pending">Project link pending</p>}
      </div>
    </article>
  )
}

function App() {
  const root = useRef<HTMLDivElement>(null)
  const menu = useRef<HTMLButtonElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    let disposed = false
    let detach: (() => void) | undefined
    const frame = requestAnimationFrame(() => {
      void import('./motion').then(({ attachMotion }) => {
        if (!disposed && root.current) detach = attachMotion(root.current)
      }).catch(() => { /* Content remains visible when motion is unavailable. */ })
    })
    return () => { disposed = true; cancelAnimationFrame(frame); detach?.() }
  }, [])

  return (
    <div ref={root}>
      <a className="skip" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="shell header-row flex items-center justify-between"
          onKeyDown={(event) => {
            if (event.key === 'Escape' && menuOpen) {
              setMenuOpen(false)
              menu.current?.focus()
            }
          }}>
          <a className="wordmark" href="#home" onClick={() => setMenuOpen(false)}><Asterisk size={22} aria-hidden="true" /> ARYAN MAAN</a>
          <button ref={menu} type="button" className="menu-toggle" aria-expanded={menuOpen} aria-controls="site-nav"
            onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            Menu
          </button>
          <nav aria-label="Main navigation" id="site-nav" className={menuOpen ? 'nav open' : 'nav'}>
            {navigation.map(([id, name]) => <a className={id === 'contact' ? 'contact-nav' : undefined}
              key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{name}</a>)}
          </nav>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        <section className="hero shell" id="home" aria-labelledby="hero-title" tabIndex={-1}>
          <div className="hero-art" aria-hidden="true">
            <div className="orbit-motion">
              <div className="orbit">
                {Array.from({ length: 27 }, (_, index) => (
                  <span key={index} style={{ transform: `rotate(${index * 6.67}deg) skewX(-11deg)` }} />
                ))}
              </div>
            </div>
          </div>
          <div className="hero-copy">
            <p className="label hero-label" data-entrance>Personal portfolio</p>
            <h1 id="hero-title" data-entrance>Aryan <span>Maan</span></h1>
            <p className="hero-description" data-entrance>Exploring the intersection of ideas, technology and the world around us.</p>
            <div data-entrance><a className="primary-link" href="#work">Explore selected work</a></div>
          </div>
        </section>

        <section className="shell section" id="work" aria-labelledby="work-title" tabIndex={-1}>
          <div className="section-heading" data-reveal><h2 id="work-title">Selected work<span>.</span></h2></div>
          <div className="work-grid">{projects.map((project) => <ProjectCard key={project.id} project={project} />)}</div>
        </section>

        <section className="shell section editorial" id="about" aria-labelledby="about-title" tabIndex={-1}>
          <div data-reveal><h2 id="about-title">About<span>.</span></h2></div>
          <div className="editorial-copy" data-reveal>
            <p>{profile.bio}</p>
            {profile.resume && <a className="text-link" href={profile.resume}>View résumé</a>}
          </div>
        </section>

        <section className="shell section editorial" id="interests" aria-labelledby="interests-title" tabIndex={-1}>
          <div data-reveal><h2 id="interests-title">Interests<span>.</span></h2></div>
          <ul className="interest-list">
            {interests.map((interest) => <li key={interest.title} data-reveal><h3>{interest.title}</h3><p>{interest.description}</p></li>)}
          </ul>
        </section>

        <section className="shell section editorial" id="experiments" aria-labelledby="experiments-title" tabIndex={-1}>
          <div data-reveal><h2 id="experiments-title">Experiments<span>.</span></h2></div>
          <div className="editorial-copy" data-reveal>
            <p>A space for small prototypes and creative explorations.</p>
            <a className="text-link" href="#creative-experiments">See Pluto in selected work</a>
          </div>
        </section>
      </main>
      <footer id="contact" tabIndex={-1} className="footer">
        <div className="shell footer-inner">
          <div className="footer-orbit" aria-hidden="true"><Asterisk strokeWidth={0.35} /></div>
          <div className="footer-copy" data-reveal>
            <p className="label">Contact</p>
            <h2>Let’s talk<span>.</span></h2>
            {profile.email ? <a className="text-link" href={`mailto:${profile.email}`}>{profile.email}</a> : <p className="secondary">Contact details will be added here.</p>}
            {profile.socials.length > 0 && <ul className="socials">{profile.socials.map((social) => <li key={social.url}><a className="text-link" href={social.url}>{social.label}</a></li>)}</ul>}
          </div>
          <div className="footer-bottom"><span>ARYAN MAAN</span><a href="#home">Back to top</a></div>
        </div>
      </footer>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
