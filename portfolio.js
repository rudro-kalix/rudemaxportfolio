// Contact form success message

document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('contactForm');
  var success = document.getElementById('contactSuccess');
  if(form) {
    form.addEventListener('submit', function(e) {
      // e.preventDefault(); // Commented out to allow Formspree submission
      // form.reset(); // Removed to prevent clearing form before submission
      // success.style.display = 'block';
      // setTimeout(function(){ success.style.display = 'none'; }, 4000);
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

// Contact info copy function
function copySignature() {
  const contactInfo = `Rudro
Software Engineering Student & Data Science Major

Education:
Daffodil International University
B.Sc. in Software Engineering
Major: Data Science

Contact:
Email: rudro@example.com
Phone: +880 1234-567890
Location: Dhaka, Bangladesh

Online Presence:
GitHub: github.com/rudro-kalix
LinkedIn: linkedin.com/in/rudro-kalix
Portfolio: portfolio.rudro.dev

Specializing in Ethical Hacking, Cybersecurity & Data Science`;

  navigator.clipboard.writeText(contactInfo).then(function() {
    alert('✅ Contact information copied to clipboard!');
  }).catch(function(err) {
    console.error('Failed to copy: ', err);
    alert('❌ Failed to copy. Please try again.');
  });
}

// Mobile responsive signature buttons
function adjustSignatureButtons() {
  const signatureButtons = document.querySelectorAll('.signature-btn');
  const signatureLinks = document.querySelectorAll('.signature-links a');
  const isMobile = window.innerWidth <= 480;
  
  // Adjust signature action buttons
  signatureButtons.forEach(button => {
    if (isMobile) {
      // Make buttons smaller and more compact on mobile
      button.style.width = 'auto';
      button.style.minWidth = '120px';
      button.style.padding = '0.6rem 1rem';
      button.style.fontSize = '0.85rem';
      button.style.margin = '0.3rem';
      button.style.borderRadius = '6px';
      
      // Make the container more compact
      const actionsContainer = button.closest('.signature-actions');
      if (actionsContainer) {
        actionsContainer.style.gap = '0.5rem';
        actionsContainer.style.flexDirection = 'row';
        actionsContainer.style.justifyContent = 'center';
        actionsContainer.style.flexWrap = 'wrap';
      }
    } else {
      // Reset to default styles for larger screens
      button.style.width = '';
      button.style.minWidth = '';
      button.style.padding = '';
      button.style.fontSize = '';
      button.style.margin = '';
      button.style.borderRadius = '';
      
      const actionsContainer = button.closest('.signature-actions');
      if (actionsContainer) {
        actionsContainer.style.gap = '';
        actionsContainer.style.flexDirection = '';
        actionsContainer.style.justifyContent = '';
        actionsContainer.style.flexWrap = '';
      }
    }
  });
  
  // Adjust signature social links (GitHub, LinkedIn, Email, Portfolio)
  signatureLinks.forEach(link => {
    if (isMobile) {
      // Make social links bigger for better mobile interaction
      link.style.width = '42px';
      link.style.height = '42px';
      link.style.fontSize = '1.8rem';
      link.style.margin = '0 0.5rem';
      
      // Adjust the container
      const linksContainer = link.closest('.signature-links');
      if (linksContainer) {
        linksContainer.style.gap = '0.2rem';
        linksContainer.style.flexDirection = 'row';
        linksContainer.style.justifyContent = 'center';
        linksContainer.style.flexWrap = 'nowrap';
      }
    } else {
      // Reset to default styles for larger screens
      link.style.width = '';
      link.style.height = '';
      link.style.fontSize = '';
      link.style.margin = '';
      
      const linksContainer = link.closest('.signature-links');
      if (linksContainer) {
        linksContainer.style.gap = '';
        linksContainer.style.flexDirection = '';
        linksContainer.style.justifyContent = '';
        linksContainer.style.flexWrap = '';
      }
    }
  });
}

// Run on page load and window resize
document.addEventListener('DOMContentLoaded', function() {
  adjustSignatureButtons();
});

window.addEventListener('resize', function() {
  adjustSignatureButtons();
});