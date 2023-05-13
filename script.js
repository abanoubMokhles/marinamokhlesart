// toggle navigation
//==============================
const nav = document.querySelector("#navigation");
const btn = document.querySelector("#navigation-btn");
btn.addEventListener("click", (evt) => {
  nav.classList.toggle("active");
});
document.querySelector(".header__list").addEventListener("click", (evt) => {
  if (!evt.target.classList.contains("header__link")) return;
  document.querySelector(".header__navigation").classList.remove("active");
});

// Implement smooth scrolling
//==============================
nav.addEventListener("click", (evt) => {
  evt.preventDefault();
  const link = evt.target.closest(".header__link");
  if (!evt) return;
  const targetSection = document.querySelector(link.getAttribute("href"));
  targetSection.scrollIntoView({ behavior: "smooth" });
});

const messageMeBtn = document.querySelector(".btn--messageMe");
messageMeBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  const targetSection = document.querySelector(evt.target.getAttribute("href"));
  targetSection.scrollIntoView({ behavior: "smooth" });
});

// Implement Lazy Loading
//==============================

const callback = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-image");
  });
  observer.unobserve(entry.target);
};

const options = {
  root: null,
  threshold: 0,
  rootMargin: "-100px",
};

const observer = new IntersectionObserver(callback, options);
const allImages = document.querySelectorAll("img[data-src]");
allImages.forEach((img) => {
  observer.observe(img);
});

// Implement slider component
//==============================
const slider = function () {
  let allSlides = document.querySelectorAll(".slider__slide");
  let leftBtn = document.querySelector(".slider__btn--left");
  let rightBtn = document.querySelector(".slider__btn--right");
  let dotsContainer = document.querySelector(".slider__dots");

  // Current Slide & slides length
  let currentSlide = 0;
  let slidesNumber = allSlides.length;

  // Position Slides
  const positionSlides = function (currentSlide) {
    allSlides.forEach(function (slide, index) {
      slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
    });
  };

  // Creating Dots
  const createDots = function () {
    allSlides.forEach((_, i) => {
      dotsContainer.insertAdjacentHTML(
        "beforeend",
        `<button class='slider__dot' data-slide='${i}'></button>`
      );
    });
  };

  // Style Dots
  const activateDot = function (currentS) {
    // Remove the active class
    document.querySelectorAll(".slider__dot").forEach((dot) => {
      dot.classList.remove("slider__dot--active");
    });

    // add Active class to current slide's dot
    document
      .querySelector(`.slider__dot[data-slide="${currentS}"]`)
      .classList.add("slider__dot--active");
  };

  // Initial Settings
  const init = function () {
    positionSlides(0);
    createDots();
    activateDot(0);
  };
  init();

  // Next Slide
  const nextSlide = function () {
    if (currentSlide === slidesNumber - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    positionSlides(currentSlide);
    activateDot(currentSlide);
  };

  // Prev Slide
  const prevSlide = function () {
    if (currentSlide <= 0) {
      currentSlide = slidesNumber - 1;
    } else {
      currentSlide--;
    }
    positionSlides(currentSlide);
    activateDot(currentSlide);
  };

  rightBtn.addEventListener("click", nextSlide);
  leftBtn.addEventListener("click", prevSlide);

  // listening to Keyboard
  document.addEventListener("keydown", function (e) {
    const key = e.key;
    if (key === "ArrowRight") {
      nextSlide();
    } else if (key === "ArrowLeft") {
      prevSlide();
    }
  });

  // listening to dots clicks
  dotsContainer.addEventListener("click", function (evt) {
    if (evt.target.classList.contains("slider__dot")) {
      // move to the slide
      positionSlides(evt.target.dataset.slide);
      activateDot(evt.target.dataset.slide);
    }
  });
};

slider();

// Implement Reveal on scroll
//==============================

const revealCallback = (entries, observer) => {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section-hidden");
  observer.unobserve(entry.target);
};

const revealOptions = {
  root: null,
  threshold: 0.5,
};
const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
document.querySelectorAll(".section-hidden").forEach((section) => {
  revealObserver.observe(section);
});

// Submitting the form
//======================
document.querySelector(".form").addEventListener("submit", (evt) => {
  evt.preventDefault();
});
