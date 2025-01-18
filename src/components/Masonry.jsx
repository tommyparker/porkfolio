import { useLayoutEffect } from 'preact/hooks';
import Isotope from 'isotope-layout';
import { gsap, ScrollTrigger, context } from '../scripts/gsapConfig';

const IsotopeGrid = ({ children }) => {
  useLayoutEffect(() => {
    const grid = document.querySelector('.thumbnail-container');
    if (!grid) return;

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

    function initializeScrollAnimations() {
      context.add(() => {
        const thumbnails = document.querySelectorAll('.thumbnail');
        if (!thumbnails.length) return;
        
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

    function initializeHoverAnimations() {
      const thumbnails = document.querySelectorAll('.thumbnail');
      thumbnails.forEach(thumbnail => {
        const meta = thumbnail.querySelector('.project-meta');
        if (!meta) return;

        // Reset the meta element state
        gsap.killTweensOf(meta);
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
    }

    function initializeAnimations() {
      // Kill any existing ScrollTriggers before reinitializing
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      initializeScrollAnimations();
      // Delay hover animations slightly to ensure DOM is ready
      setTimeout(initializeHoverAnimations, 100);
    }

    // Initialize on first load
    initializeAnimations();

    // Initialize after Isotope layout
    iso.on('layoutComplete', () => {
      iso.layout(); // Refresh the layout
    });

    // Handle page transitions
    const pageLoadHandler = () => {
      iso.layout();
      initializeAnimations();
    };

    document.addEventListener('astro:page-load', pageLoadHandler);

    return () => {
      document.removeEventListener('astro:page-load', pageLoadHandler);
      iso.destroy();
      context.revert();
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