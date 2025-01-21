import { gsap, context } from './gsapConfig';

function ProjectHover() {
  context.add(() => {
    const thumbnails = document.querySelectorAll('.thumbnail');
    if (!thumbnails.length) return;

    thumbnails.forEach(thumbnail => {
      const meta = thumbnail.querySelector('.project-meta');
      const image = thumbnail.querySelector('img');
      if (!meta || !image) return;

      // Set initial states
      gsap.set(meta, {
        opacity: 0,
        scale: 0,
        xPercent: -50,
        yPercent: -50,
      });

      // Add hover event listeners
      thumbnail.addEventListener('mouseenter', () => {
        gsap.to(meta, {
          opacity: 1,
          scale: 1,
          duration: 0.2,
          overwrite: true
        });
        
        gsap.to(image, {
          scale: 0.97,
          duration: 0.4,
          ease: "expo.out",
          overwrite: true
        });
      });

      thumbnail.addEventListener('mousemove', (e) => {
        const rect = thumbnail.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        gsap.set(meta, {
          x: x,
          y: y,
          xPercent: -50,
          yPercent: 48,
        });
      });

      thumbnail.addEventListener('mouseleave', () => {
        gsap.to(meta, {
          opacity: 0,
          scale: 0,
          duration: 0.2,
          overwrite: true
        });
        
        gsap.to(image, {
          scale: 1,
          duration: 0.4,
          ease: "expo.out",
          overwrite: true
        });
      });
    });
  });
}

document.addEventListener('astro:page-load', ProjectHover);

export { ProjectHover }; 