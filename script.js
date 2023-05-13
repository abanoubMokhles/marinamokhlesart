// toggle navigation
//==============================
const nav = document.querySelector("#navigation");
const btn = document.querySelector("#navigation-btn");
btn.addEventListener("click", (evt) => {
  nav.classList.toggle("active");
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
  rootMargin: "100px",
};

const observer = new IntersectionObserver(callback, options);
const allImages = document.querySelectorAll("img[data-src]");
allImages.forEach((img) => {
  observer.observe(img);
});

// Implement slider component
//==============================
