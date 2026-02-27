export const MOTION_TOKENS = {
  duration: {
    instant: 90,
    fast: 140,
    base: 200,
    emphasis: 260,
    screen: 280,
  },
  distance: {
    xs: 4,
    sm: 8,
    md: 14,
  },
  scale: {
    press: 0.98,
    pop: 1.02,
  },
  blur: {
    enter: 6,
  },
}

export const EASING = {
  standard: 'cubic-bezier(0.2, 0, 0, 1)',
  exit: 'cubic-bezier(0.4, 0, 1, 1)',
  emphasis: 'cubic-bezier(0.16, 1, 0.3, 1)',
}

export const SPRING_PRESETS = {
  soft: {
    stiffness: 280,
    damping: 26,
    mass: 1,
  },
  snappy: {
    stiffness: 360,
    damping: 30,
    mass: 0.9,
  },
}

export const STAGGER = {
  fast: 24,
  base: 40,
}
