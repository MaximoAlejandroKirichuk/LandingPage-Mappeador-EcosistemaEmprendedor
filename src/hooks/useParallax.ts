import { useEffect } from 'react'

const setParallaxVars = (scrollY: number) => {
  const root = document.documentElement
  root.style.setProperty('--parallax-sm', `${-scrollY * 0.04}px`)
  root.style.setProperty('--parallax-md', `${-scrollY * 0.07}px`)
  root.style.setProperty('--parallax-lg', `${-scrollY * 0.1}px`)
}

export const useParallax = () => {
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    if (mediaQuery.matches) {
      setParallaxVars(0)
      return
    }

    let rafId = 0

    const onScroll = () => {
      if (rafId) {
        return
      }

      rafId = window.requestAnimationFrame(() => {
        setParallaxVars(window.scrollY)
        rafId = 0
      })
    }

    setParallaxVars(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])
}
