document.addEventListener('DOMContentLoaded', () => {
  // Create full screen animation overlay element
  const animationOverlay = document.createElement('div');
  animationOverlay.id = 'animation-overlay';
  animationOverlay.style.position = 'fixed';
  animationOverlay.style.top = '0';
  animationOverlay.style.left = '0';
  animationOverlay.style.width = '100vw';
  animationOverlay.style.height = '100vh';
  animationOverlay.style.backgroundColor = '#ff6600';
  animationOverlay.style.zIndex = '9999';
  animationOverlay.style.display = 'none';
  animationOverlay.style.justifyContent = 'center';
  animationOverlay.style.alignItems = 'center';
  animationOverlay.style.color = '#090d00';
  animationOverlay.style.fontSize = '3rem';
  animationOverlay.style.fontWeight = 'bold';
  animationOverlay.style.animation = 'fadeInOut 2s ease forwards';
  animationOverlay.textContent = 'Loading Project...';
  document.body.appendChild(animationOverlay);

  // Define keyframes for fadeInOut animation
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = `
    @keyframes fadeInOut {
      0% { opacity: 0; }
      25% { opacity: 1; }
      75% { opacity: 1; }
      100% { opacity: 0; }
    }
  `;
  document.head.appendChild(styleSheet);

  // Attach click event listeners to project links
  const projectLinks = document.querySelectorAll('.project-link');
  projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const url = link.href;
      animationOverlay.style.display = 'flex';
      // After animation duration, redirect to GitHub URL
      setTimeout(() => {
        window.location.href = url;
      }, 2000); // 2 seconds animation duration
    });
  });

  // Certificates and Certifications toggle functionality
  const tabCertificatesBtn = document.getElementById('tab-certificates');
  const tabCertificationsBtn = document.getElementById('tab-certifications');
  const tabPanelCertificates = document.getElementById('tab-panel-certificates');
  const tabPanelCertifications = document.getElementById('tab-panel-certifications');

  function activateTab(selectedBtn, selectedPanel, otherBtn, otherPanel) {
    selectedBtn.classList.add('active');
    selectedBtn.setAttribute('aria-selected', 'true');
    selectedBtn.setAttribute('tabindex', '0');
    otherBtn.classList.remove('active');
    otherBtn.setAttribute('aria-selected', 'false');
    otherBtn.setAttribute('tabindex', '-1');

    selectedPanel.removeAttribute('hidden');
    otherPanel.setAttribute('hidden', '');
  }

  tabCertificatesBtn.addEventListener('click', () => {
    activateTab(tabCertificatesBtn, tabPanelCertificates, tabCertificationsBtn, tabPanelCertifications);
  });

  tabCertificationsBtn.addEventListener('click', () => {
    activateTab(tabCertificationsBtn, tabPanelCertifications, tabCertificatesBtn, tabPanelCertificates);
  });

  // Hide/show header on scroll down/up
  let lastScrollTop = 0;
  const header = document.querySelector('header');

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      // Scrolling down - hide header
      header.style.transform = 'translateY(-100%)';
      header.style.transition = 'transform 0.3s ease';
    } else {
      // Scrolling up - show header
      header.style.transform = 'translateY(0)';
      header.style.transition = 'transform 0.3s ease';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
  });

  // Highlight current nav link and center it in nav bar
  const navLinks = document.querySelectorAll('nav ul.nav-links li a');
  const sections = Array.from(navLinks).map(link => {
    const id = link.getAttribute('href').substring(1);
    return document.getElementById(id);
  });
  const navContainer = document.querySelector('nav ul.nav-links');

  function getCurrentSection() {
    const scrollPos = window.scrollY + window.innerHeight / 2;
    let currentIndex = 0;
    for (let i = 0; i < sections.length; i++) {
      if (sections[i] && sections[i].offsetTop <= scrollPos) {
        currentIndex = i;
      }
    }
    return currentIndex;
  }

  function centerNavLink(link) {
    const navRect = navContainer.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const offset = linkRect.left - navRect.left - (navRect.width / 2) + (linkRect.width / 2);
    navContainer.scrollBy({ left: offset, behavior: 'smooth' });
  }

  window.addEventListener('scroll', () => {
    const currentIndex = getCurrentSection();
    navLinks.forEach((link, index) => {
      if (index === currentIndex) {
        link.classList.add('active');
        centerNavLink(link);
      } else {
        link.classList.remove('active');
      }
    });
  });

  // Initial highlight and centering on page load
  const initialIndex = getCurrentSection();
  if (navLinks[initialIndex]) {
    navLinks[initialIndex].classList.add('active');
    centerNavLink(navLinks[initialIndex]);
  }
});
