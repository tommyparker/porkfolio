import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins once
gsap.registerPlugin(ScrollTrigger);

// Create a shared context and ensure it's cleared on page transitions
let context = gsap.context(() => {});

// Reset context on page transitions
document.addEventListener('astro:before-swap', () => {
  context.revert();
  context = gsap.context(() => {});
});

export { gsap, ScrollTrigger, context };
