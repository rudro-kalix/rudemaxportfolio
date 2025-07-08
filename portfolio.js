// Contact form success message

document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('contactForm');
  var success = document.getElementById('contactSuccess');
  if(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      form.reset();
      success.style.display = 'block';
      setTimeout(function(){ success.style.display = 'none'; }, 4000);
    });
  }
});

// Loader bolt fly-to-logo animation with minimum 2s flash
var loaderStart = Date.now();
window.addEventListener('load', function() {
  var loader = document.getElementById('loader');
  var bolt = document.getElementById('bolt-loader');
  var logo = document.querySelector('.logo');
  var minFlash = 2000;
  var elapsed = Date.now() - loaderStart;
  var wait = Math.max(0, minFlash - elapsed);
  function animateBolt() {
    if (loader && bolt && logo) {
      // Get bolt's current center position
      var boltRect = bolt.getBoundingClientRect();
      var logoRect = logo.getBoundingClientRect();
      // Calculate translation
      var deltaX = (logoRect.left + logoRect.height/2) - (boltRect.left + boltRect.width/2);
      var deltaY = (logoRect.top + logoRect.height/2) - (boltRect.top + boltRect.height/2);
      // Prepare for animation
      bolt.classList.add('move-to-logo');
      bolt.style.position = 'fixed';
      bolt.style.left = boltRect.left + 'px';
      bolt.style.top = boltRect.top + 'px';
      bolt.style.margin = '0';
      bolt.style.transform = 'none';
      // Force reflow
      void bolt.offsetWidth;
      // Animate
      requestAnimationFrame(function() {
        bolt.style.transform = 'translate(' + deltaX + 'px, ' + deltaY + 'px) scale(0.27)';
        bolt.style.opacity = '1';
      });
      // After animation, fade out the bolt, then move it into logo and fade/slide/scale in
      setTimeout(function() {
        // Fade out loader background
        loader.style.background = 'transparent';
        loader.style.pointerEvents = 'none';
        // Fade out the bolt in its animated position
        bolt.style.transition = 'opacity 0.18s cubic-bezier(.4,0,.2,1)';
        bolt.style.opacity = '0';
        setTimeout(function() {
          // Remove bolt from loader, add to logo
          bolt.style.transition = 'none';
          bolt.style.transform = 'none';
          bolt.style.position = '';
          bolt.style.left = '';
          bolt.style.top = '';
          bolt.style.fontSize = '1.5rem';
          bolt.className = 'fas fa-bolt logo-bolt logo-bolt-appear';
          logo.insertBefore(bolt, logo.firstChild);
          // Animate in: trigger transition
          setTimeout(function() {
            bolt.classList.add('logo-bolt-appear-active');
          }, 10);
          // Remove appear classes after transition
          setTimeout(function() {
            bolt.classList.remove('logo-bolt-appear', 'logo-bolt-appear-active');
          }, 400);
          // Fade out loader overlay
          loader.classList.add('fade');
          setTimeout(function() {
            if(loader.parentNode) loader.parentNode.removeChild(loader);
          }, 700);
        }, 180);
      }, 800);
    } else if (loader) {
      // fallback: just fade out
      loader.classList.add('fade');
      setTimeout(function() {
        if(loader.parentNode) loader.parentNode.removeChild(loader);
      }, 800);
    }
  }
  setTimeout(animateBolt, wait);
}); 