/* Enquiry Page JavaScript - Professional Edition */

// Soft Reveal Logic
(function() {
  const elements = document.querySelectorAll('.fade-in');
  elements.forEach((el, index) => {
    el.style.opacity = '0';
    setTimeout(() => {
      el.classList.add('visible');
    }, index * 200);
  });
})();

// Custom Select Logic
document.querySelectorAll('.custom-select').forEach(function (sel) {
  var trigger = sel.querySelector('.select-trigger');
  var opts = sel.querySelector('.select-options');
  var hidden = sel.querySelector('input[type="hidden"]');
  var label = trigger.querySelector('.select-label');
  var formGroup = sel.closest('.form-group');

  trigger.addEventListener('click', function (e) {
    e.stopPropagation();
    // Close other open selects
    document.querySelectorAll('.custom-select').forEach(function (s) {
      if (s !== sel) {
        s.querySelector('.select-trigger').classList.remove('active');
        s.querySelector('.select-options').classList.remove('open');
      }
    });
    const isOpen = opts.classList.toggle('open');
    trigger.classList.toggle('active');
    if (formGroup) {
      if (isOpen) formGroup.classList.add('active-select-group');
      else formGroup.classList.remove('active-select-group');
    }
  });

  opts.querySelectorAll('.select-option').forEach(function (opt) {
    opt.addEventListener('click', function (e) {
      const isMulti = sel.getAttribute('data-multi') === 'true';
      const val = opt.getAttribute('data-value');
      
      if (isMulti) {
        e.stopPropagation(); // Keep menu open for multi-select
        opt.classList.toggle('selected');
        
        // Update hidden input and label
        const selected = Array.from(opts.querySelectorAll('.select-option.selected'))
          .map(o => o.getAttribute('data-value'));
        
        hidden.value = selected.join(', ');
        
        if (selected.length > 0) {
          label.textContent = selected.length + ' Categories Selected';
          label.classList.remove('placeholder');
        } else {
          label.textContent = label.getAttribute('data-placeholder');
          label.classList.add('placeholder');
        }
      } else {
        hidden.value = val;
        label.textContent = opt.querySelector('.opt-text').textContent;
        label.classList.remove('placeholder');
        
        opts.querySelectorAll('.select-option').forEach(function (o) { o.classList.remove('selected'); });
        opt.classList.add('selected');
        
        trigger.classList.remove('active');
        opts.classList.remove('open');
        if (formGroup) formGroup.classList.remove('active-select-group');
      }
    });
  });
});

// Close selects on outside click
document.addEventListener('click', function () {
  document.querySelectorAll('.custom-select').forEach(function (s) {
    s.querySelector('.select-trigger').classList.remove('active');
    s.querySelector('.select-options').classList.remove('open');
    const fg = s.closest('.form-group');
    if (fg) fg.classList.remove('active-select-group');
  });
});

// EmailJS Configuration
const EMAILJS_PUBLIC_KEY = "8M7rgQVRazWu1gITz";
const EMAILJS_SERVICE_ID = "service_oizl5f3";
const EMAILJS_TEMPLATE_ID = "template_i37ag2f"; // Goes to YOU
const EMAILJS_AUTO_REPLY_ID = "template_d3pmqeq"; // Goes to CUSTOMER

// Form Submission
document.getElementById('enquiryForm').addEventListener('submit', function (e) {
  e.preventDefault();
  
  const btn = document.getElementById('submitBtn');
  const txt = document.getElementById('btnText');
  const originalText = txt.textContent;
  
  btn.disabled = true;
  txt.textContent = 'Processing...';
  btn.style.opacity = '0.7';

  const formData = {
    name: document.getElementById('name').value,
    company: document.getElementById('company').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    country: document.getElementById('country').value,
    product: document.getElementById('product').value,
    quantity: document.getElementById('quantity').value,
    packaging: document.getElementById('packaging').value,
    message: document.getElementById('message').value,
    ref_id: 'IXE-' + Math.random().toString(36).substr(2, 6).toUpperCase()
  };

  // Initialize and send via EmailJS
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

    // Send Lead to Business
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData);

    // Send Auto-Reply to Customer
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_AUTO_REPLY_ID, formData)
      .then(function () {
        document.getElementById('confirmEmail').textContent = formData.email;
        document.getElementById('refId').textContent = formData.ref_id;
        document.getElementById('successOverlay').style.display = 'flex';
        
        btn.disabled = false;
        txt.textContent = originalText;
        btn.style.opacity = '1';
      }, function (error) {
        alert('Submission failed: ' + (error.text || 'Service error. Please try again.'));
        console.error('EmailJS Error:', error);
        btn.disabled = false;
        txt.textContent = originalText;
        btn.style.opacity = '1';
      });
  } else {
    alert('Email service unavailable. Please refresh the page.');
    btn.disabled = false;
    txt.textContent = originalText;
    btn.style.opacity = '1';
  }
});

function closeSuccess() {
  document.getElementById('successOverlay').style.display = 'none';
  document.getElementById('enquiryForm').reset();
  
  // Reset custom selects
  document.querySelectorAll('.custom-select').forEach(function (s) {
    const label = s.querySelector('.select-label');
    label.textContent = label.getAttribute('data-placeholder');
    label.classList.add('placeholder');
    s.querySelector('input[type="hidden"]').value = '';
    s.querySelectorAll('.select-option').forEach(function (o) { o.classList.remove('selected'); });
  });
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
