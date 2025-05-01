document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('animated-bg');
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const particleCount = 100;
  const maxDistance = 120;
  const particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 1.2;
      this.vy = (Math.random() - 0.5) * 1.2;
      this.radius = 2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(44, 209, 255, 0.7)';
      ctx.fill();
    }
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(44, 209, 255, ${1 - dist / maxDistance})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    connectParticles();
    requestAnimationFrame(animate);
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  animate();

  // Certificate tab toggle functionality
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

  // Slider navigation functionality
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

  // Auto-scroll functionality for sliders
  let autoScrollInterval = null;

  function autoScrollSlider(sliderId) {
    const slider = document.getElementById(sliderId);
    const track = slider.querySelector('.slider-track');
    const slideWidth = 320; // width to scroll per interval

    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
    }

    autoScrollInterval = setInterval(() => {
      if (track.scrollLeft + slideWidth >= track.scrollWidth) {
        // Reset to start if reached end
        track.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        track.scrollBy({ left: slideWidth, behavior: 'smooth' });
      }
    }, 3000);
  }

  // Start auto-scroll on certificates slider by default
  autoScrollSlider('certificates-slider');

  // Modify toggle buttons to switch auto-scroll
  btnCertificates.addEventListener('click', () => {
    btnCertificates.classList.add('active');
    btnCertifications.classList.remove('active');
    certificatesSlider.style.display = 'flex';
    certificationsSlider.style.display = 'none';
    autoScrollSlider('certificates-slider');
  });

  btnCertifications.addEventListener('click', () => {
    btnCertifications.classList.add('active');
    btnCertificates.classList.remove('active');
    certificationsSlider.style.display = 'flex';
    certificatesSlider.style.display = 'none';
    autoScrollSlider('certifications-slider');
  });
});
