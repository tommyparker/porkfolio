import { gsap, ScrollTrigger, context } from './gsapConfig';

function ProjectScroll() {
  context.add(() => {
    const thumbnails = document.querySelectorAll('.thumbnail');
    if (!thumbnails.length) return;
    
    // Scroll Animations
    gsap.set(thumbnails, { 
      opacity: 0,
      y: 24,
    });

    thumbnails.forEach((thumbnail, index) => {
      ScrollTrigger.create({
        trigger: thumbnail,
        start: 'top bottom-=100',
        onEnter: () => {
          gsap.to(thumbnail, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "expo.inOut",
            delay: index % 3 * 0.1,
          });
        },
      });
    });
  });
}

document.addEventListener('astro:page-load', ProjectScroll);

export { ProjectScroll }; 