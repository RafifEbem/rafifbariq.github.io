// Toggle mobile navigation
const navToggle = document.getElementById("navToggle");
const navList = document.querySelector(".nav ul");

if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    navList.classList.toggle("open");
  });

  // Close menu when click link
  navList.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navList.classList.remove("open");
    }
  });
}

// Set current year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// --- Gallery Slider + Lightbox ---

const slides = document.querySelectorAll(".gallery-slide");
const track = document.querySelector(".gallery-track");
const prevBtn = document.querySelector(".gallery-nav-prev");
const nextBtn = document.querySelector(".gallery-nav-next");
const dots = document.querySelectorAll(".gallery-dot");

let currentSlide = 0;

function updateSlider(index) {
  if (!slides.length) return;

  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;
  currentSlide = index;

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentSlide);
  });

  if (track) {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener("click", () => {
    updateSlider(currentSlide - 1);
  });

  nextBtn.addEventListener("click", () => {
    updateSlider(currentSlide + 1);
  });
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const slideIndex = parseInt(dot.dataset.slide, 10);
    updateSlider(slideIndex);
  });
});

// Inisialisasi awal
updateSlider(0);

// --- Lightbox ---
const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.querySelector(".lightbox-close");

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (lightboxImg && lightbox) {
      lightboxImg.src = item.src;
      lightbox.style.display = "flex";
    }
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener("click", () => {
    lightbox.style.display = "none";
  });
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
    }
  });
}

// --- Handle contact form with Formspree (optional AJAX) ---

const contactForm = document.querySelector(".contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // cegah reload default

    const data = new FormData(contactForm);

    formStatus.textContent = "Mengirim...";
    formStatus.style.color = "#e5e7eb";

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: data,
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.ok) {
        formStatus.textContent = "Terima kasih! Pesan Anda sudah terkirim.";
        formStatus.style.color = "#4ade80";
        contactForm.reset();
      } else {
        formStatus.textContent = "Terjadi kesalahan. Coba lagi nanti.";
        formStatus.style.color = "#f97373";
      }
    } catch (error) {
      formStatus.textContent = "Tidak bisa terhubung ke server. Cek koneksi internet.";
      formStatus.style.color = "#f97373";
    }
  });
}
