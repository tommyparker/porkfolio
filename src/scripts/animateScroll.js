import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

export const animateScroll = () => {
    gsap.from('.animate-on-scroll', {
        opacity: 0,
        y: 24,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.animate-on-scroll',
            start: 'top 80%',
            end: 'bottom 20%',
            markers: true,
            toggleActions: 'play none none none',
            once: true,
        },
    });
};
