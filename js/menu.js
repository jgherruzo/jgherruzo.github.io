// Smooth scrolling for internal links
document.addEventListener('click', function (e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
      e.preventDefault();
      const targetId = e.target.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
  
  // Smooth transition between pages
  document.addEventListener('DOMContentLoaded', function () {
    document.body.style.opacity = 1;
  });
  
  window.addEventListener('beforeunload', function () {
    document.body.style.opacity = 0;
  });
  