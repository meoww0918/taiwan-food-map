import { useReducedMotion } from 'framer-motion';

const STILL = { y: 0, x: 0, scale: 1, rotate: 0, opacity: 1 };

export function useGuard() {
  return useReducedMotion();
}

export function gate(reduce, animatedValue, fallback = STILL) {
  return reduce ? fallback : animatedValue;
}
