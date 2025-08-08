/**
 * Dynamic favicon switcher based on tab visibility
 * When tab is active: shows ICON2
 * When tab is inactive: shows ICON1
 */

(function() {
  'use strict';
  
  // Define the favicon paths
  const ICON1 = './static/icon/ICON1.webp'; // Inactive tab icon
  const ICON2 = './static/icon/ICON2.webp'; // Active tab icon
  
  // Get favicon element
  let faviconLink = document.querySelector("link[rel*='icon']");
  if (!faviconLink) {
    faviconLink = document.createElement('link');
    faviconLink.type = 'image/x-icon';
    faviconLink.rel = 'icon';
    document.head.appendChild(faviconLink);
  }
  
  // Function to change favicon
  function changeFavicon(src) {
    faviconLink.href = src;
  }
  
  // Function to handle visibility change
  function handleVisibilityChange() {
    if (document.hidden) {
      // Tab is inactive - show ICON1
      changeFavicon(ICON1);
    } else {
      // Tab is active - show ICON2
      changeFavicon(ICON2);
    }
  }
  
  // Set initial favicon based on current state
  handleVisibilityChange();
  
  // Listen for visibility changes
  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  // Listen for focus/blur events for additional browser compatibility
  window.addEventListener('focus', () => {
    changeFavicon(ICON2);
  });
  
  window.addEventListener('blur', () => {
    changeFavicon(ICON1);
  });
  
  console.log('Dynamic favicon switcher initialized');
})();
