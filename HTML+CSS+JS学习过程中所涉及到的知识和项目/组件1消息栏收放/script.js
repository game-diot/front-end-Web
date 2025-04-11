const showHideBtn = document.querySelector(".show-hide-btn");
const container = document.querySelector(".container");

showHideBtn.addEventListener("click", () => {
  document.startViewTransition(() => {
    container.classList.toggle("expanded");
  });
});
