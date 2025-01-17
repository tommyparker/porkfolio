import { gsap } from 'gsap';

document.addEventListener('astro:page-load', () => {
  const navigation = document.querySelector('.navigation');
  const navHeight = navigation.offsetHeight;

  // Add scroll-based behavior
  let lastScrollPosition = window.scrollY;
  const scrollThreshold = 100;
  const scrollBuffer = 12;

  gsap.set(navigation, { opacity: 1 });

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    const scrollDifference = Math.abs(currentScroll - lastScrollPosition);
    
    if (currentScroll > scrollThreshold) {
      if (currentScroll > lastScrollPosition && scrollDifference > scrollBuffer) {
        // Scrolling down - hide navigation
        gsap.to(navigation, {
          opacity: 1,
          y: -navHeight,
          duration: 0.3,
          ease: 'power2.Out'
        });
      } else if (currentScroll < lastScrollPosition && scrollDifference > scrollBuffer) {
        // Scrolling up - show navigation
        gsap.to(navigation, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.Out'
        });
      }
    } else {
      // At the top - ensure navigation is visible
      gsap.to(navigation, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.Out'
      });
    }
    
    lastScrollPosition = currentScroll;
  });

  // Update CSS variable with navigation height
  document.documentElement.style.setProperty('--nav-height', `${navHeight}px`);
});
