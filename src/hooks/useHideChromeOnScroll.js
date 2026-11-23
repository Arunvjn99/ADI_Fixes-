import { useEffect } from 'react'

// At narrow widths (phones, or desktop at 200%/400% zoom, which collapses
// the CSS viewport to <=640px) the sticky header + fixed bottom nav eat most
// of the screen height. Hide both while scrolling down, reveal on scroll up,
// near the top of the page, or whenever keyboard focus enters either bar.
// Sets `body.chrome-hidden`; the CSS only acts on it inside the <=640px query.
export default function useHideChromeOnScroll() {
  useEffect(() => {
    const body = document.body
    let lastY = window.scrollY
    let ticking = false
    const THRESHOLD = 8

    const update = () => {
      ticking = false
      const y = window.scrollY
      const delta = y - lastY
      if (Math.abs(delta) < THRESHOLD) return
      const chromeHasFocus = document.activeElement?.closest?.('.topbar, .mobile-nav, .mobile-menu-bg')
      if (delta > 0 && y > 64 && !chromeHasFocus) body.classList.add('chrome-hidden')
      else body.classList.remove('chrome-hidden')
      lastY = y
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    const onFocusIn = (e) => {
      if (e.target.closest?.('.topbar, .mobile-nav, .mobile-menu-bg')) body.classList.remove('chrome-hidden')
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('focusin', onFocusIn)
    return () => {
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('focusin', onFocusIn)
      body.classList.remove('chrome-hidden')
    }
  }, [])
}
