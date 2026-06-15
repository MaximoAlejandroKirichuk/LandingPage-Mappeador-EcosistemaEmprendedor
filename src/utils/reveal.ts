import type { CSSProperties } from 'react'

type RevealStyle = CSSProperties & { '--delay'?: string }

export const getRevealStyle = (index: number, baseDelay = 0): RevealStyle => ({
  '--delay': `${baseDelay + index * 90}ms`,
})
