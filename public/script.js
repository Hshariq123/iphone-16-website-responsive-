 const globalNav = document.getElementById('globalNavBar');
  const mainLinks = document.getElementById('mainLinks');

  mainLinks.addEventListener('mouseenter', () => {
    globalNav.classList.add('hovering-main');
  });

  mainLinks.addEventListener('mouseleave', () => {
    globalNav.classList.remove('hovering-main');
  });

  
// ====== Slideshow ======

const slideshowContainer = document.querySelector("#slideshow-image-container");
const slides = document.querySelectorAll("#slideshow-image-container img");
const dots = document.querySelectorAll("#link-items-container li");

// Use the existing play button from HTML
const playBtn = document.querySelector("#slide-play-button");

let slideIndex = 0;
let autoScrollInterval = null;
let autoScrollRunning = false;
const autoScrollDelay = 1000; // 1 second (adjust if needed)
let isAutoScrolling = false;

// Highlight the active dot
function updateDots(index) {
  dots.forEach(dot => dot.classList.remove("active"));
  if (dots[index]) dots[index].classList.add("active");
}

// Scroll to a slide by index smoothly within slideshow container
function scrollToSlide(index) {
  const slide = slides[index];
  if (!slide) return;

  isAutoScrolling = true;
  slideshowContainer.scrollTo({
    left: slide.offsetLeft,
    behavior: "smooth"
  });

  updateDots(index);
  slideIndex = index;

  // Reset flag after scroll ends
  setTimeout(() => {
    isAutoScrolling = false;
  }, 500);
}

// Show the first slide visually on load
updateDots(slideIndex);

// Auto-scroll logic
function autoScroll() {
  slideIndex = (slideIndex + 1) % slides.length;
  scrollToSlide(slideIndex);
}

// Start auto-scroll
function startAutoScroll() {
  if (!autoScrollRunning) {
    autoScrollRunning = true;
    autoScrollInterval = setInterval(autoScroll, autoScrollDelay);
    playBtn.title = "Pause Slideshow";
  }
}

// Stop auto-scroll
function stopAutoScroll() {
  if (autoScrollRunning) {
    clearInterval(autoScrollInterval);
    autoScrollRunning = false;
    playBtn.title = "Play Slideshow";
  }
}

// Toggle play/pause on button click
playBtn.addEventListener("click", () => {
  if (autoScrollRunning){
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  }
  else if (!autoScrollRunning){
    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  }
  autoScrollRunning ? stopAutoScroll() : startAutoScroll();
});

// Manual scroll handler
slideshowContainer.addEventListener("scroll", () => {
  if (isAutoScrolling) return;

  // Temporarily stop auto-scroll
  const wasRunning = autoScrollRunning;
  if (wasRunning) stopAutoScroll();

  // Find closest slide to container's left edge
  let closestIndex = 0;
  let closestDistance = Infinity;
  slides.forEach((slide, idx) => {
    const rect = slide.getBoundingClientRect();
    const containerRect = slideshowContainer.getBoundingClientRect();
    const distance = Math.abs(rect.left - containerRect.left);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = idx;
    }
  });

  slideIndex = closestIndex;
  updateDots(slideIndex);

  // Restart auto-scroll if it was running before
  if (wasRunning) {
    setTimeout(startAutoScroll, 1000);
  }
});

// Dot click to jump to slide
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    const wasRunning = autoScrollRunning;
    if (wasRunning) stopAutoScroll();

    scrollToSlide(index);

    if (wasRunning) {
      setTimeout(startAutoScroll, 1000);
    }
  });
});

// ====== Color Change Logic ======

const colorButtons = document.querySelectorAll("#colors button");
colorButtons.forEach(button => {
  button.addEventListener("click", () => {
    const imgSrc = button.dataset.img;
    const colorName = button.dataset.color;
    const img = document.querySelector("#currentColor img");
    img.classList.add("fade-out");
    setTimeout(() => {
      img.src = imgSrc;
      document.querySelector("#colorName").textContent = `iPhone 16 in ${colorName}`;
      img.classList.remove("fade-out");
    }, 200);
  });
});

// ====== AI Section Dynamic Text ======

const aiListItems = document.querySelectorAll("#AI-nav-Links-List li");
aiListItems.forEach(item => {
  item.addEventListener("click", () => {
    const text = item.dataset.text;
    document.querySelector("#dynamic-Ai-text-para").textContent = text;
    aiListItems.forEach(el => el.classList.remove("current-AI-feature-Li"));
    item.classList.add("current-AI-feature-Li");
  });
});
