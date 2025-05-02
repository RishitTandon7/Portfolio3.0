document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('certificate-modal');
  const modalImg = document.getElementById('modal-image');
  const modalCaption = document.getElementById('modal-caption');
  const modalClose = document.querySelector('.modal-close');

  // Open modal when clicking on certificate image
  document.querySelectorAll('.certificate-img').forEach(img => {
    img.addEventListener('click', () => {
      modal.style.display = 'block';
      modalImg.src = img.src;
      modalCaption.textContent = img.alt;
    });
  });

  // Close modal when clicking on close button
  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Close modal when clicking outside the image
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Close modal on pressing Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'block') {
      modal.style.display = 'none';
    }
  });

  // Contact form submission handling
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Collect form data
    const formData = {
      name: contactForm.name.value.trim(),
      email: contactForm.email.value.trim(),
      message: contactForm.message.value.trim(),
    };

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields.');
      return;
    }

    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Simulate form submission (e.g., send to server or email service)
    // For now, just show a success message
    alert('Thank you for your message, ' + formData.name + '! I will get back to you soon.');

    // Reset form
    contactForm.reset();
  });

  // Fix certification toggle buttons
  const btnCertificates = document.getElementById('btn-certificates');
  const btnCertifications = document.getElementById('btn-certifications');
  const certificatesSlider = document.getElementById('certificates-slider');
  const certificationsSlider = document.getElementById('certifications-slider');
  const viewAllBtn = document.getElementById('view-all-btn');

  function updateViewAllButton(isCertificates) {
    if (isCertificates) {
      viewAllBtn.textContent = 'View All Certificates';
      viewAllBtn.href = 'all-certificates.html';
    } else {
      viewAllBtn.textContent = 'View All Certifications';
      viewAllBtn.href = 'all-certifications.html';
    }
  }

  btnCertificates.addEventListener('click', () => {
    btnCertificates.classList.add('active');
    btnCertifications.classList.remove('active');
    certificatesSlider.style.display = 'flex';
    certificationsSlider.style.display = 'none';
    updateViewAllButton(true);
    startAutoScroll('certificates-slider');
  });

  btnCertifications.addEventListener('click', () => {
    btnCertifications.classList.add('active');
    btnCertificates.classList.remove('active');
    certificationsSlider.style.display = 'flex';
    certificatesSlider.style.display = 'none';
    updateViewAllButton(false);
    startAutoScroll('certifications-slider');
  });

  // Slider navigation buttons
  function setupSliderNavigation(sliderId) {
    const slider = document.getElementById(sliderId);
    const track = slider.querySelector('.slider-track');
    const prevBtn = slider.querySelector('.prev-btn');
    const nextBtn = slider.querySelector('.next-btn');

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -320, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: 320, behavior: 'smooth' });
    });
  }

  setupSliderNavigation('certificates-slider');
  setupSliderNavigation('certifications-slider');

  // Auto-scroll functionality
  let autoScrollInterval = null;

  function startAutoScroll(sliderId) {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
    }
    const slider = document.getElementById(sliderId);
    const track = slider.querySelector('.slider-track');
    const slideWidth = 320;

    autoScrollInterval = setInterval(() => {
      if (track.scrollLeft + slideWidth >= track.scrollWidth) {
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: slideWidth, behavior: 'smooth' });
      }
    }, 3000);
  }

  // Start auto-scroll on certificates slider by default
  startAutoScroll('certificates-slider');

  // Function to toggle view all certificates and certifications
  let isViewAll = false;

  viewAllBtn.addEventListener('click', () => {
    const isCertificatesActive = btnCertificates.classList.contains('active');
    const activeSlider = isCertificatesActive ? certificatesSlider : certificationsSlider;
    const slideType = isCertificatesActive ? 'Certificates' : 'Certifications';

    if (!isViewAll) {
      // Expand to show all in grid
      activeSlider.style.overflowX = 'visible';
      activeSlider.querySelector('.slider-track-wrapper').style.overflowX = 'visible';
      activeSlider.querySelector('.slider-track').style.flexWrap = 'wrap';
      activeSlider.querySelector('.slider-track').style.justifyContent = 'center';
      activeSlider.querySelector('.slider-track').style.gap = '1rem';
      // Hide slider buttons
      activeSlider.querySelector('.prev-btn').style.display = 'none';
      activeSlider.querySelector('.next-btn').style.display = 'none';
      viewAllBtn.textContent = 'Show Less';
      isViewAll = true;
    } else {
      // Revert to slider view
      activeSlider.style.overflowX = 'hidden';
      activeSlider.querySelector('.slider-track-wrapper').style.overflowX = 'hidden';
      activeSlider.querySelector('.slider-track').style.flexWrap = 'nowrap';
      activeSlider.querySelector('.slider-track').style.justifyContent = 'flex-start';
      activeSlider.querySelector('.slider-track').style.gap = '1rem';
      // Show slider buttons
      activeSlider.querySelector('.prev-btn').style.display = 'block';
      activeSlider.querySelector('.next-btn').style.display = 'block';
      viewAllBtn.textContent = `View All ${slideType}`;
      isViewAll = false;
    }
  });
});
