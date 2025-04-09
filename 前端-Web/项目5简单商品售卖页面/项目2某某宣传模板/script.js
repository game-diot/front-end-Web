// Swiper Home

let swiper = new Swiper(".bg-slider-thumbs", {
  loop: true,
  spaceBetween: 0,
  slidesPerView: 0,
});
let swiper2 = new Swiper(".bg-slider", {
  loop: true,
  spaceBetween: 0,
  thumbs: {
    swiper: swiper,
  },
});

// Testimonial Slider

let index = 0;
show_image(index);

function show_image(i) {
  index += i;
  let images = document.getElementsByClassName("image");
  let dots = document.getElementsByClassName("dot");

  for (let i = 0; i < images.length; i++) images[i].style.display = "none";

  for (let i = 0; i < dots.length; i++)
    dots[i].className = dots[i].className.replace(" active", "");

  if (index > images.length - 1) index = 0;

  if (index < 0) index = images.length - 1;

  images[index].style.display = "block";
  dots[index].className += " active";
}

// Changing Nav Background

function changeBg() {
  let menu = document.getElementById("header");
  let scrollValue = window.scrollY;

  if (scrollValue < 150) {
    menu.classList.remove("menuBg");
  } else {
    menu.classList.add("menuBg");
  }
}
window.addEventListener("scroll", changeBg);

// Enabling Mobile Menu

const nav = document.querySelector(".nav-items");
const openMenu = document.querySelector(".openMenu");
const closeMenu = document.querySelector(".closeMenu");
const media = document.querySelector(".media-icons");

openMenu.addEventListener("click", show);
closeMenu.addEventListener("click", close);

function show() {
  nav.style.display = "flex";
  nav.style.top = "0";
  media.style.display = "none";
}

function close() {
  nav.style.top = "-110%";
  media.style.display = "flex";
}
