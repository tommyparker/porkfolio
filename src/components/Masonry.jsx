import { useEffect, useLayoutEffect } from 'preact/hooks';
import Isotope from 'isotope-layout';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const IsotopeGrid = ({ children }) => {
  useLayoutEffect(() => {
    // Isotope
    const grid = document.querySelector('.thumbnail-container');
    const iso = new Isotope(grid, {
      itemSelector: '.thumbnail',
      layoutMode: 'masonry',
      masonry: {
        columnWidth: '.masonry-sizer',
        gutter: '.gutter-sizer',
      },
      percentPosition: true,
      transitionDuration: '0.1s',
    });

    // GSAP animations
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    // Initial animations
    gsap.set(thumbnails, { 
      opacity: 0,
      y: 24,
    });

    // Set initial position for project-meta elements
    thumbnails.forEach(thumbnail => {
      const meta = thumbnail.querySelector('.project-meta');
      if (meta) {
        gsap.set(meta, {
          xPercent: -50,
          yPercent: -50,
          x: "50%",
          y: "50%"
        });
      }
    });

    // Replace the single entrance animation with individual triggers
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
            delay: index % 3 * 0.1, // Stagger effect for items entering viewport together
          });
        },
        once: true
      });
    });

    // Mouse follow logic
    thumbnails.forEach(thumbnail => {
      const meta = thumbnail.querySelector('.project-meta');
      if (!meta) return;

      // Hide meta initially
      gsap.set(meta, {
        opacity: 0,
        scale: 0,
        xPercent: -50,
        yPercent: 50,
      });

      const xSetter = gsap.quickSetter(meta, "x", "px");
      const ySetter = gsap.quickSetter(meta, "y", "px");

      thumbnail.addEventListener('mouseenter', () => {
        gsap.to(meta, {
          opacity: 1,
          scale: 1,
          duration: 0.2
        });
      });

      thumbnail.addEventListener('mousemove', (e) => {
        const rect = thumbnail.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        xSetter(x);
        ySetter(y);
      });

      thumbnail.addEventListener('mouseleave', () => {
        gsap.to(meta, {
          opacity: 0,
          scale: 0,
          duration: 0.2
        });
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      iso.destroy();
    };
  }, []);

  return (
    <div className="thumbnail-container">
      <div className="masonry-sizer"></div>
      <div className="gutter-sizer"></div>
      {children}
    </div>
  );
};

export default IsotopeGrid;