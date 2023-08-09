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
  
  document.addEventListener('DOMContentLoaded', function () {
    const summaryImage = document.querySelector('.summary-image');
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    let isOverlayVisible = false;
  
    summaryImage.addEventListener('click', function () {
      if (!isOverlayVisible) {
        overlay.innerHTML = `<img src="${this.src}" alt="Graphic Summary">`;
        document.body.appendChild(overlay);
        overlay.style.display = 'flex';
        isOverlayVisible = true;
      } else {
        overlay.style.display = 'none';
        isOverlayVisible = false;
      }
    });
  
    overlay.addEventListener('click', function () {
      overlay.style.display = 'none';
      isOverlayVisible = false;
    });
  });
  