import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins once
gsap.registerPlugin(ScrollTrigger);

// Create a shared context
const context = gsap.context(() => {});

export { gsap, ScrollTrigger, context };
