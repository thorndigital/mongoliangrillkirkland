// main.js

document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    mobileNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
      });
    });
  }

  // --- Scroll Animation Logic ---
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animated-element');
    elements.forEach(element => {
      // Get the position of the element
      const elementRect = element.getBoundingClientRect();
      const elementTop = elementRect.top;
      const elementHeight = elementRect.height;

      // Define when the element should become visible (e.g., when 80% of it is in view)
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const triggerPoint = viewportHeight - (elementHeight * 0.2); // Element visible when 20% from bottom of viewport

      // Check if the element is in the viewport
      if (elementTop < triggerPoint) {
        if (!element.classList.contains('visible')) {
          element.classList.add('visible');
          // Apply specific animation if data-animation attribute is present
          const animationType = element.getAttribute('data-animation');
          const animationDelay = element.getAttribute('data-delay');

          if (animationType) {
            element.style.animationName = animationType;
            element.style.animationDuration = '0.8s'; // Default duration
            element.style.animationFillMode = 'forwards';
            element.style.animationTimingFunction = 'ease-out';
            if (animationDelay) {
              element.style.animationDelay = animationDelay;
            }
          }
        }
      } else {
        // Optional: Remove 'visible' class if element scrolls out of view upwards
        // This allows the animation to replay if scrolled back down
        // if (element.classList.contains('visible')) {
        //   element.classList.remove('visible');
        //   element.style.animationName = 'none'; // Reset animation
        // }
      }
    });
  };

  // Initial check on page load
  animateOnScroll();

  // Listen for scroll events
  window.addEventListener('scroll', animateOnScroll);
  // Also check on resize, in case elements move into view
  window.addEventListener('resize', animateOnScroll);

  // --- Highlight active nav link based on current page URL ---
  function highlightActiveNavLink() {
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active'); // Remove from all first
      let linkHref = link.getAttribute('href');

      // Normalize paths for comparison
      const normalizedCurrentPath = currentPath.endsWith('/') && currentPath.length > 1 ? currentPath.slice(0, -1) : currentPath;
      const normalizedLinkHref = linkHref.endsWith('/') && linkHref.length > 1 ? linkHref.slice(0, -1) : linkHref;

      if (normalizedLinkHref === normalizedCurrentPath) {
        link.classList.add('active');
      } else if (normalizedCurrentPath === '/' && normalizedLinkHref === 'index.html') {
        // Special case for home page if accessed via '/'
        link.classList.add('active');
      }
    });
  }
  highlightActiveNavLink(); // Call on DOMContentLoaded
});

