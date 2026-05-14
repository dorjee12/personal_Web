// ================================
// PROFESSIONAL PORTFOLIO SCRIPT
// ================================

document.addEventListener("DOMContentLoaded", () => {

  // ================================
  // 1. FADE-IN ANIMATION
  // ================================
  const faders = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.2 });

    faders.forEach(el => observer.observe(el));
  } else {
    faders.forEach(el => el.classList.add('visible'));
  }


  // ================================
  // 2. SMOOTH SCROLL
  // ================================
  const navLinks = document.querySelectorAll('header nav a');

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const targetId = link.getAttribute('href');

      if (targetId.startsWith("#")) {
        e.preventDefault();

        const target = document.querySelector(targetId);

        if (target) {
          window.scrollTo({
            top: target.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      }
    });
  });


  // ================================
  // 3. ACTIVE NAV + BACK TO TOP
  // ================================
  const sections = document.querySelectorAll('section');
  const backToTop = document.getElementById('back-to-top');

  const handleScroll = () => {
    let currentSection = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;

      if (window.scrollY >= sectionTop) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');

      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });

    if (backToTop) {
      backToTop.style.display = window.scrollY > 400 ? 'block' : 'none';
    }
  };

  // Smooth + performant scroll
  let timeout;
  window.addEventListener('scroll', () => {
    clearTimeout(timeout);
    timeout = setTimeout(handleScroll, 50);
  });


  // ================================
  // 4. BACK TO TOP CLICK
  // ================================
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // ================================
  // 5. CONTACT FORM (REAL BACKEND)
  // ================================
  const form = document.getElementById('contact-form');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = form.querySelector('input[type="text"]').value.trim();
      const email = form.querySelector('input[type="email"]').value.trim();
      const message = form.querySelector('textarea').value.trim();

      const inputs = form.querySelectorAll('input, textarea');
      let isValid = true;

      // Validation
      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.style.border = "1px solid red";
          isValid = false;
        } else {
          input.style.border = "1px solid #ccc";
        }
      });

      if (!email.includes("@")) {
        form.querySelector('input[type="email"]').style.border = "1px solid red";
        isValid = false;
      }

      if (!isValid) return;

      const button = form.querySelector('button');
      const originalText = button.innerText;

      button.innerText = "Sending...";
      button.disabled = true;

      try {
        const res = await fetch("http://localhost:5000/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, email, message })
        });

        const data = await res.json();

        if (data.success) {
          button.innerText = "✓ Sent Successfully";
          button.style.background = "#28a745";
          form.reset();
        } else {
          button.innerText = "❌ Failed!";
        }

      } catch (err) {
        console.error(err);
        button.innerText = "❌ Error!";
      }

      setTimeout(() => {
        button.innerText = originalText;
        button.style.background = "";
        button.disabled = false;
      }, 2000);
    });
  }


  // ================================
  // 6. MOBILE MENU
  // ================================
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.querySelector("nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      nav.classList.toggle("active");
    });
  }

  // Auto close menu
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (nav) nav.classList.remove("active");
    });
  });


  // ================================
  // 7. TYPING ANIMATION
  // ================================
  const typingElement = document.getElementById("typing");
  const text = "Dorji";
  let index = 0;

  function typeEffect() {
    if (!typingElement) return;

    typingElement.textContent = text.slice(0, index);
    index = (index + 1) % (text.length + 1);

    setTimeout(typeEffect, 200);
  }

  if (typingElement) typeEffect();


  // ================================
  // 8. DARK MODE (SAVE)
  // ================================
  const darkToggle = document.getElementById("dark-mode-toggle");

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    if (darkToggle) darkToggle.textContent = "☀️";
  }

  if (darkToggle) {
    darkToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");

      if (document.body.classList.contains("dark")) {
        darkToggle.textContent = "☀️";
        localStorage.setItem("theme", "dark");
      } else {
        darkToggle.textContent = "🌙";
        localStorage.setItem("theme", "light");
      }
    });
  }


  // ================================
  // 9. SCROLL PROGRESS BAR
  // ================================
  const progressBar = document.createElement("div");
  progressBar.style.position = "fixed";
  progressBar.style.top = "0";
  progressBar.style.left = "0";
  progressBar.style.height = "4px";
  progressBar.style.background = "#00b4d8";
  progressBar.style.zIndex = "9999";
  progressBar.style.width = "0%";
  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / height) * 100;
    progressBar.style.width = progress + "%";
  });


  // ================================
  // 10. BUTTON EFFECT
  // ================================
  document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.style.transform = "scale(0.95)";
      setTimeout(() => {
        btn.style.transform = "scale(1)";
      }, 150);
    });
  });

});