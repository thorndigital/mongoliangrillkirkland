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
      // If the element is already visible, do not re-animate
      if (element.classList.contains('visible')) {
        return;
      }

      // Get the position of the element
      const elementRect = element.getBoundingClientRect();
      const elementTop = elementRect.top;
      const elementHeight = elementRect.height;

      // Define when the element should become visible (e.g., when 80% of it is in view)
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const triggerPoint = viewportHeight - (elementHeight * 0.2); // Element visible when 20% from bottom of viewport

      // Check if the element is in the viewport
      if (elementTop < triggerPoint) {
        element.classList.add('visible');
        // Apply specific animation if data-animation attribute is present
        const animationType = element.getAttribute('data-animation');
        const animationDelay = element.getAttribute('data-delay');

        if (animationType) {
          element.style.animationName = animationType;
          element.style.animationDuration = '1.2s'; // Increased duration for smoother animation
          element.style.animationFillMode = 'forwards'; // Keep the final state of the animation
          element.style.animationTimingFunction = 'ease-out';
          if (animationDelay) {
            element.style.animationDelay = animationDelay;
          }
        }
      }
      // Removed the else block that removes 'visible' class
      // This prevents animations from replaying when scrolling up and down
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

