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
    }

    function initializeHoverAnimations() {
      const thumbnails = document.querySelectorAll('.thumbnail');
      
      thumbnails.forEach(thumbnail => {
        const meta = thumbnail.querySelector('.project-meta');
        if (!meta) return;

        // Store event listeners for proper cleanup
        const onMouseEnter = () => {
          gsap.to(meta, {
            opacity: 1,
            scale: 1,
            duration: 0.2,
            overwrite: true
          });
        };

        const onMouseMove = (e) => {
          const rect = thumbnail.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          gsap.set(meta, {
            x: x,
            y: y,
            xPercent: -50,
            yPercent: 48,
          });
        };

        const onMouseLeave = () => {
          gsap.to(meta, {
            opacity: 0,
            scale: 0,
            duration: 0.2,
            overwrite: true
          });
        };

        // Remove existing listeners if any
        thumbnail.removeEventListener('mouseenter', onMouseEnter);
        thumbnail.removeEventListener('mousemove', onMouseMove);
        thumbnail.removeEventListener('mouseleave', onMouseLeave);

        // Set initial state
        gsap.set(meta, {
          opacity: 0,
          scale: 0,
          xPercent: -50,
          yPercent: -50,
        });

        // Add new listeners
        thumbnail.addEventListener('mouseenter', onMouseEnter);
        thumbnail.addEventListener('mousemove', onMouseMove);
        thumbnail.addEventListener('mouseleave', onMouseLeave);
      });
    }

    function initializeAnimations() {
      context.add(() => {
        initializeScrollAnimations();
        initializeHoverAnimations();
      });
    }

    // Initialize after Isotope layout is complete
    iso.once('layoutComplete', () => {
      initializeAnimations();
    });

    const pageLoadHandler = () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      iso.layout();
      initializeAnimations();
    };

    document.addEventListener('astro:page-load', pageLoadHandler);

    return () => {
      document.removeEventListener('astro:page-load', pageLoadHandler);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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