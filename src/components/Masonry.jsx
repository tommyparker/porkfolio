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
    
    gsap.set(thumbnails, { 
      opacity: 0,
      y: 24,
    });

    gsap.to(thumbnails, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "expo.inOut",
      stagger: {
        amount: 0.6,
        from: "top"
      },
      scrollTrigger: {
        trigger: '.thumbnail-container',
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true,
      }
    });

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