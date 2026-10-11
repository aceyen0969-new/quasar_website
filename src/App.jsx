import HeroArtwork from './components/HeroArtwork'
import DashboardPreview from './components/DashboardPreview'
import { useEffect, useRef, useState } from 'react'
import {
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { docsPages } from './data/docs'

const SESSION_KEY = 'quasar_session_token'

const features = [
  {
    number: '01',
    icon: '✦',
    title: 'AI-assisted conversations',
    description:
      'Bring AI-powered assistance into your Discord community through configured providers.',
    tag: 'AI',
  },
  {
    number: '02',
    icon: '◈',
    title: 'Server insights',
    description:
      'Analyze available server information and explore recommendations for improving your community.',
    tag: 'ANALYTICS',
  },
  {
    number: '03',
    icon: '◎',
    title: 'Persistent objectives',
    description:
      'Keep goals and objective history available across conversations with configured persistence.',
    tag: 'MEMORY',
  },
]

const authMessages = {
  cancelled: 'Discord sign-in was cancelled.',
  invalid_state: 'The sign-in request expired or could not be verified. Please try again.',
  missing_code: 'Discord did not return a sign-in code. Please try again.',
  oauth_failed: 'Discord sign-in failed. Please try again.',
  identity_failed: 'We could not verify your Discord account.',
  oauth_unavailable: 'Discord sign-in is temporarily unavailable.',
  not_authorized: 'This Discord account is not authorized to access the dashboard.',
}

function Reveal({ children, as: Tag = 'div', className = '', delay = 0 }) {
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current

    if (!element || !('IntersectionObserver' in window)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('is-visible')
          observer.unobserve(element)
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -35px 0px',
      },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={elementRef}
      className={`reveal-item ${className}`.trim()}
      style={{ '--reveal-delay': `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}

function Logo() {
  return (
    <Link className="brand" to="/" aria-label="Quasar home">
      <span className="brand-mark">Q</span>
      <span>
        quasar<span className="brand-period">.</span>
      </span>
    </Link>
  )
}

function Header({ isAuthenticated = false }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Logo />
        <button
          className="mobile-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
        <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`}>
          <NavLink to="/" end onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <a href="/#features" onClick={() => setMenuOpen(false)}>
            Features
          </a>
          <NavLink
            to="/docs/getting-started"
            onClick={() => setMenuOpen(false)}
          >
            Documentation
          </NavLink>
          <NavLink to="/dashboard" onClick={() => setMenuOpen(false)}>
            Dashboard
          </NavLink>
          <NavLink
            className="nav-cta"
            to={isAuthenticated ? '/dashboard' : '/login'}
            onClick={() => setMenuOpen(false)}
          >
            {isAuthenticated ? 'Open console' : 'Sign in with Discord'}{' '}
            <span>↗</span>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

function HomePage() {
  return (
    <>
      <main>
        <section className="hero section-shell">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-dot" />
              AN AI-ASSISTED DISCORD COMPANION
            </div>
            <h1>
              Your server,
              <br />
              <span>smarter</span> by design.
            </h1>
            <p className="hero-description">
              Meet Quasar, a growing Discord bot project built to bring AI
              assistance, server insights, and persistent objectives into one
              place.
            </p>
            <div className="hero-actions">
              <Link
                className="button button-primary"
                to="/docs/getting-started"
              >
                Explore documentation <span>↗</span>
              </Link>
              <a className="button button-secondary" href="#features">
                Discover features <span>↓</span>
              </a>
            </div>
            <div className="hero-footnote">
              <span className="footnote-line" />
              BUILT FOR COMMUNITIES THAT WANT TO GROW
            </div>
          </div>
          <HeroArtwork />
          <div className="hero-bottom-label">
            <span>01 / INTRODUCTION</span>
            <span>AI · INSIGHTS · OBJECTIVES</span>
          </div>
        </section>

        <section className="trust-strip">
          <Reveal className="section-shell trust-inner">
            <span>ONE PROJECT.</span>
            <span className="trust-divider" />
            <span>MULTIPLE CAPABILITIES.</span>
            <span className="trust-divider" />
            <span>BUILT ITERATIVELY.</span>
          </Reveal>
        </section>

        <section className="features-section section-shell" id="features">
          <Reveal className="section-heading">
            <div>
              <div className="eyebrow">THE QUASAR TOOLKIT</div>
              <h2>
                More clarity.
                <br />
                <span>Less chaos.</span>
              </h2>
            </div>
            <p>
              Useful tools for understanding your server, working with AI, and
              keeping track of what matters.
            </p>
          </Reveal>

          <div className="feature-grid">
            {features.map((feature, index) => (
              <Reveal
                as="article"
                className="feature-card"
                key={feature.number}
                delay={index * 110}
              >
                <div className="feature-card-top">
                  <span className="feature-icon">{feature.icon}</span>
                  <span className="feature-number">{feature.number}</span>
                </div>
                <span className="feature-tag">{feature.tag}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <Link to="/docs/getting-started" className="text-link">
                  Learn more <span>↗</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal as="section" className="docs-cta section-shell">
          <div className="cta-orb" />
          <div className="eyebrow">YOUR NEXT STEP</div>
          <h2>
            Curiosity is a
            <br />
            <span>good starting point.</span>
          </h2>
          <p>
            Explore the documentation to learn about the project, its setup,
            and its developing capabilities.
          </p>
          <Link className="button button-primary" to="/docs/getting-started">
            Read the documentation <span>↗</span>
          </Link>
        </Reveal>
      </main>
      <Footer />
    </>
  )
}

function LoginPage({ isAuthenticated, authLoading, error }) {
  const location = useLocation()
  const displayError = error || location.state?.authError
  if (authLoading) {
    return (
      <>
        <Header isAuthenticated={isAuthenticated} />
        <main className="not-found">
          <div className="eyebrow">QUASAR AUTHENTICATION</div>
          <h1>Verifying sign-in…</h1>
          <p>Quasar is checking your Discord session.</p>
        </main>
        <Footer />
      </>
    )
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <>
      <Header />
      <main className="not-found">
        <div className="eyebrow">
          <span className="status-dot" />
          PRIVATE SERVER CONSOLE
        </div>
        <h1>Welcome back.</h1>
        <p>
          Sign in with Discord to verify your account and access Quasar's
          private dashboard.
        </p>
        {displayError && (
          <p role="alert" style={{ color: '#ff9caa' }}>
            {displayError}
          </p>
        )}
        <button
          className="button button-primary"
          type="button"
          onClick={() => window.location.assign('/api/auth/login')}
        >
          Continue with Discord <span>↗</span>
        </button>
        <p style={{ marginTop: '1.25rem' }}>
          Only the Discord account configured as the owner is authorized.
        </p>
      </main>
      <Footer />
    </>
  )
}

function DashboardPage({ onLogout, isAuthenticated, authLoading }) {
  if (authLoading) {
    return (
      <>
        <Header isAuthenticated={isAuthenticated} />
        <main className="not-found">
          <div className="eyebrow">QUASAR AUTHENTICATION</div>
          <h1>Checking access…</h1>
          <p>Please wait while your session is verified.</p>
        </main>
        <Footer />
      </>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <>
      <Header isAuthenticated />
      <main className="section-shell" style={{ paddingTop: '2rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <div>
            <div className="eyebrow">PRIVATE WORKSPACE</div>
            <h1 style={{ margin: '0.5rem 0' }}>Quasar dashboard</h1>
            <p>Your authenticated server console.</p>
          </div>
          <button
            type="button"
            className="button button-secondary"
            onClick={onLogout}
          >
            Sign out
          </button>
        </div>
        <DashboardPreview />
      </main>
      <Footer />
    </>
  )
}

function DocsSidebar() {
  return (
    <aside className="docs-sidebar">
      <div className="sidebar-label">DOCUMENTATION</div>
      <div className="sidebar-group-label">GETTING STARTED</div>
      <nav className="docs-nav">
        {docsPages.slice(0, 3).map((page) => (
          <NavLink to={page.path} key={page.path}>
            <span className="sidebar-link-icon">›</span>
            {page.title}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-group-label">FEATURES</div>
      <nav className="docs-nav">
        {docsPages.slice(3, 5).map((page) => (
          <NavLink to={page.path} key={page.path}>
            <span className="sidebar-link-icon">›</span>
            {page.title}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-group-label">SUPPORT</div>
      <nav className="docs-nav">
        {docsPages.slice(5).map((page) => (
          <NavLink to={page.path} key={page.path}>
            <span className="sidebar-link-icon">›</span>
            {page.title}
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-note">
        <span className="status-dot" />
        <div>
          <strong>Project documentation</strong>
          <p>Details may change as Quasar develops.</p>
        </div>
      </div>
    </aside>
  )
}

function DocsPage({ isAuthenticated }) {
  const location = useLocation()
  const page =
    docsPages.find((item) => item.path === location.pathname) || docsPages[0]
  const pageIndex = docsPages.findIndex((item) => item.path === page.path)
  const previousPage = docsPages[pageIndex - 1]
  const nextPage = docsPages[pageIndex + 1]

  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <main className="docs-layout">
        <DocsSidebar />
        <article className="docs-article">
          <div className="docs-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Documentation</span>
            <span>/</span>
            <span>{page.title}</span>
          </div>
          <div className="eyebrow">QUASAR DOCUMENTATION</div>
          <h1>{page.title}</h1>
          <p className="docs-lead">{page.description}</p>
          <div className="docs-meta">
            <span className="status-dot" /> A GUIDE TO QUASAR
          </div>
          <div className="docs-divider" />
          {page.sections.map((section, index) => (
            <section
              className="docs-section"
              key={section.heading}
              id={`section-${index}`}
            >
              <h2>{section.heading}</h2>
              <p>{section.content}</p>
            </section>
          ))}
          <div className="docs-pagination">
            {previousPage ? (
              <Link to={previousPage.path} className="pagination-card">
                <span>&#8592; PREVIOUS</span>
                <strong>{previousPage.title}</strong>
              </Link>
            ) : (
              <span />
            )}
            {nextPage ? (
              <Link
                to={nextPage.path}
                className="pagination-card pagination-next"
              >
                <span>NEXT &#8594;</span>
                <strong>{nextPage.title}</strong>
              </Link>
            ) : (
              <Link to="/" className="pagination-card pagination-next">
                <span>BACK TO</span>
                <strong>Homepage ↗</strong>
              </Link>
            )}
          </div>
        </article>
        <aside className="docs-toc">
          <span>ON THIS PAGE</span>
          {page.sections.map((section, index) => (
            <a href={`#section-${index}`} key={section.heading}>
              {section.heading}
            </a>
          ))}
        </aside>
      </main>
      <Footer />
    </>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-shell footer-inner">
        <Logo />
        <span>Built step by step. Designed to evolve.</span>
        <span>QUASAR © {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}

function NotFound({ isAuthenticated }) {
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <main className="not-found">
        <div className="eyebrow">404 / UNKNOWN REGION</div>
        <h1>Lost in space?</h1>
        <p>This page hasn't been mapped yet.</p>
        <Link className="button button-primary" to="/">
          Return home ↗
        </Link>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const ticketHandled = useRef(false)

  const [sessionToken, setSessionToken] = useState(
    () => window.sessionStorage.getItem(SESSION_KEY) || '',
  )
  const [authLoading, setAuthLoading] = useState(
    () => Boolean(new URLSearchParams(window.location.search).get('quasar_ticket')),
  )
  const [authError, setAuthError] = useState('')

  const isAuthenticated = Boolean(sessionToken)

  useEffect(() => {
    const root = document.documentElement
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )

    const updateMotion = () => {
      if (!reduceMotion.matches && 'IntersectionObserver' in window) {
        root.classList.add('motion-enabled')
      } else {
        root.classList.remove('motion-enabled')
      }
    }

    updateMotion()
    reduceMotion.addEventListener?.('change', updateMotion)

    return () => {
      reduceMotion.removeEventListener?.('change', updateMotion)
      root.classList.remove('motion-enabled')
    }
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const ticket = params.get('quasar_ticket')
    const authErrorCode = params.get('quasar_auth_error')

    if (authErrorCode) {
      navigate('/login', {
        replace: true,
        state: {
          authError:
            authMessages[authErrorCode] || 'Sign-in failed. Please try again.',
        },
      })
      return
    }

    if (!ticket || ticketHandled.current) return

    ticketHandled.current = true
    setAuthError('')

    window.history.replaceState({}, '', '/')

    async function exchangeTicket() {
      try {
        const response = await fetch('/api/auth/exchange', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
          body: JSON.stringify({ ticket }),
        })

        const result = await response.json().catch(() => ({}))

        if (!response.ok || !result.accessToken) {
          throw new Error(
            result.error || 'Unable to complete Discord sign-in.',
          )
        }

        window.sessionStorage.setItem(SESSION_KEY, result.accessToken)
        setSessionToken(result.accessToken)
        setAuthLoading(false)
        navigate('/dashboard', { replace: true })
      } catch (error) {
        window.sessionStorage.removeItem(SESSION_KEY)
        setSessionToken('')
        setAuthError(error.message || 'Unable to complete Discord sign-in.')
        setAuthLoading(false)
        navigate('/login', { replace: true })
      }
    }

    exchangeTicket()
  }, [location.search, navigate])

  async function handleLogout() {
    const token = window.sessionStorage.getItem(SESSION_KEY)

    try {
      if (token) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          cache: 'no-store',
        })
      }
    } catch {
      setAuthError('The server could not confirm logout.')
    } finally {
      window.sessionStorage.removeItem(SESSION_KEY)
      setSessionToken('')
      setAuthLoading(false)
      navigate('/login', { replace: true })
    }
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header isAuthenticated={isAuthenticated} />
            <HomePage />
          </>
        }
      />
      <Route
        path="/login"
        element={
          <LoginPage
            isAuthenticated={isAuthenticated}
            authLoading={authLoading}
            error={authError}
          />
        }
      />
      <Route
        path="/dashboard"
        element={
          <DashboardPage
            isAuthenticated={isAuthenticated}
            authLoading={authLoading}
            onLogout={handleLogout}
          />
        }
      />
      {docsPages.map((page) => (
        <Route
          path={page.path}
          element={<DocsPage isAuthenticated={isAuthenticated} />}
          key={page.path}
        />
      ))}
      <Route
        path="*"
        element={<NotFound isAuthenticated={isAuthenticated} />}
      />
    </Routes>
  )
}
