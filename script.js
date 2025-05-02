// Modal functionality for enlarged certificate images

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

  btnCertificates.addEventListener('click', () => {
    btnCertificates.classList.add('active');
    btnCertifications.classList.remove('active');
    certificatesSlider.style.display = 'flex';
    certificationsSlider.style.display = 'none';
  });

  btnCertifications.addEventListener('click', () => {
    btnCertifications.classList.add('active');
    btnCertificates.classList.remove('active');
    certificationsSlider.style.display = 'flex';
    certificatesSlider.style.display = 'none';
  });
});
