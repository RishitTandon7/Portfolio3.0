// Tab switching logic for certificates and certifications tabs
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('certificate-modal');
  const modalImg = document.getElementById('modal-image');
  const modalCaption = document.getElementById('modal-caption');
  const modalClose = document.querySelector('.modal-close');

  // Function to show modal with fade-in animation
  function showModal(img) {
    modalImg.src = img.src;
    // Fix text of the image: capitalize each word in alt text
    modalCaption.textContent = img.alt.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    modal.classList.add('show');
  }

  // Function to hide modal with fade-out animation
  function hideModal() {
    modal.classList.remove('show');
  }

  // Open modal when clicking on certificate image
  document.querySelectorAll('.certificate-img').forEach(img => {
    img.addEventListener('click', () => {
      showModal(img);
    });
  });

  // Close modal when clicking on close button
  modalClose.addEventListener('click', () => {
    hideModal();
  });

  // Close modal when clicking outside the image
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      hideModal();
    }
  });

  // Close modal on pressing Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('show')) {
      hideModal();
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

  // Tab switching logic for certificates and certifications tabs
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Deactivate all tabs and hide all panels
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
        btn.setAttribute('tabindex', '-1');
      });
      tabPanels.forEach(panel => {
        panel.hidden = true;
      });

      // Activate clicked tab and show corresponding panel
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
      button.setAttribute('tabindex', '0');
      const panelId = button.getAttribute('aria-controls');
      const panel = document.getElementById(panelId);
      if (panel) {
        panel.hidden = false;
      }
    });
  });
});
