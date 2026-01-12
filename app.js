/* ===== MOBILE NAVIGATION TOGGLE ===== */

(function initNav() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', function (e) {
    e.preventDefault();
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !isExpanded);
    menu.classList.toggle('active');
  });

  // Close menu when link clicked
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('active');
    });
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('active');
    }
  });
})();

/* ===== FORM VALIDATION & SUBMISSION ===== */

(function initForms() {
  const forms = [
    { id: 'form-yard-signs', name: 'yard_sign_request' },
    { id: 'form-contact', name: 'campaign_contact' }
  ];

  forms.forEach(config => {
    const form = document.getElementById(config.id);
    if (!form) return;

    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => validateField(input));
      input.addEventListener('change', () => validateField(input));
    });

    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validate all fields
      let isValid = true;
      inputs.forEach(input => {
        if (!validateField(input)) {
          isValid = false;
        }
      });

      if (!isValid) {
        showFormFeedback(form, 'error', 'Please fix the errors above.');
        return;
      }

      // Prevent double submission
      if (form.dataset.submitting === 'true') return;
      form.dataset.submitting = 'true';

      // Disable submit button
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';

      // Track event
      trackFormSubmit(config.name, form);

      // Let Formspree handle submission naturally
      form.submit();
    });
  });

  function validateField(field) {
    const row = field.closest('.row');
    const errorMsg = row.querySelector('.error-msg');

    let isValid = true;
    let message = '';

    // Check required
    if (field.hasAttribute('required') && !field.value.trim()) {
      isValid = false;
      message = 'This field is required.';
    }

    // Email validation
    if (field.type === 'email' && field.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value)) {
        isValid = false;
        message = 'Please enter a valid email address.';
      }
    }

    // Phone validation (basic)
    if (field.type === 'tel' && field.value) {
      const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
      if (!phoneRegex.test(field.value.replace(/\s/g, ''))) {
        isValid = false;
        message = 'Please enter a valid phone number.';
      }
    }

    // Update UI
    if (isValid) {
      row.classList.remove('is-invalid');
      if (errorMsg) errorMsg.textContent = '';
    } else {
      row.classList.add('is-invalid');
      if (errorMsg) errorMsg.textContent = message;
    }

    return isValid;
  }

  function showFormFeedback(form, type, message) {
    const feedback = form.querySelector('.form-feedback');
    if (!feedback) return;

    feedback.textContent = message;
    feedback.className = `form-feedback ${type}`;

    // Clear after 5 seconds if success
    if (type === 'success') {
      setTimeout(() => {
        feedback.className = 'form-feedback';
        feedback.textContent = '';
      }, 5000);
    }
  }
})();

/* ===== SIMPLIFIED ANALYTICS TRACKING ===== */

(function initTracking() {
  function hasGtag() {
    return typeof window.gtag === 'function';
  }

  function trackEvent(eventName, params) {
    if (!hasGtag()) return;
    window.gtag('event', eventName, Object.assign({ transport_type: 'beacon' }, params || {}));
  }

  // Track link clicks (simplified)
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href || href === '#' || href.startsWith('javascript:')) return;

    // Extract useful data
    const text = (link.textContent || link.getAttribute('aria-label') || '').trim().slice(0, 120);
    const isExternal = !href.startsWith('/') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:');

    trackEvent('link_click', {
      link_text: text,
      link_url: href,
      link_type: isExternal ? 'external' : 'internal'
    });
  });

  // Track form submissions
  document.addEventListener('submit', (e) => {
    const form = e.target;
    const trackName = form.getAttribute('data-track');
    if (!trackName) return;

    trackEvent('form_submit', {
      form_name: trackName,
      form_action: form.getAttribute('action') || ''
    });
  }, true);

  // Track section visibility (scroll depth)
  const sections = document.querySelectorAll('section[id]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.tracked) {
          entry.target.dataset.tracked = 'true';
          const sectionId = entry.target.id;
          trackEvent('section_view', {
            section: sectionId
          });
        }
      });
    }, { threshold: 0.25 });

    sections.forEach(section => observer.observe(section));
  }
})();

/* ===== LAZY IMAGE LOADING ENHANCEMENT ===== */

(function initImages() {
  // Native lazy loading is supported, but add intersection observer for older browsers
  if ('IntersectionObserver' in window && 'loading' in HTMLImageElement.prototype) {
    return; // Native support is sufficient
  }

  const images = document.querySelectorAll('img[loading="lazy"]');
  if (images.length === 0) return;

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
})();

/* ===== UTILITY: DETECT REDUCED MOTION ===== */

(function initA11y() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    document.documentElement.style.scrollBehavior = 'auto';
  }
})();