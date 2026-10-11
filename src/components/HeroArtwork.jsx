import { useRef } from 'react'

export default function HeroArtwork() {
  const artworkRef = useRef(null)

  function handlePointerMove(event) {
    if (event.pointerType !== 'mouse') return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const artwork = artworkRef.current
    if (!artwork) return

    const bounds = artwork.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5

    artwork.style.setProperty('--core-x', `${x * 12}px`)
    artwork.style.setProperty('--core-y', `${y * 12}px`)
    artwork.style.setProperty('--orbit-x', `${x * -5}px`)
    artwork.style.setProperty('--orbit-y', `${y * -5}px`)
    artwork.style.setProperty('--chip-x', `${x * -10}px`)
    artwork.style.setProperty('--chip-y', `${y * -10}px`)
  }

  function handlePointerLeave() {
    const artwork = artworkRef.current
    if (!artwork) return

    artwork.style.setProperty('--core-x', '0px')
    artwork.style.setProperty('--core-y', '0px')
    artwork.style.setProperty('--orbit-x', '0px')
    artwork.style.setProperty('--orbit-y', '0px')
    artwork.style.setProperty('--chip-x', '0px')
    artwork.style.setProperty('--chip-y', '0px')
  }

  return (
    <div
      ref={artworkRef}
      className="hero-art"
      aria-label="Abstract Quasar interface illustration"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="orbit orbit-three" />
      <div className="core-glow" />
      <div className="core">
        <span>Q</span>
      </div>
      <div className="floating-chip chip-top">
        <span className="chip-dot" /> AI ASSISTANT
      </div>
      <div className="floating-chip chip-bottom">
        <span className="chip-symbol">↗</span> Objectives tracked
      </div>
      <div className="floating-chip chip-side">
        SERVER INSIGHTS <span>◈</span>
      </div>
      <div className="art-star star-one">✦</div>
      <div className="art-star star-two">✧</div>
    </div>
  )
}