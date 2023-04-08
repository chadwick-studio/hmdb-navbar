// Mobile Menu Toggle
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");

mobileMenuToggle.addEventListener("click", () => {
  const visibility = mobileMenu.getAttribute("data-visible");
  if (visibility === "false") {
    mobileMenu.setAttribute("data-visible", true);
    mobileMenuToggle.setAttribute("aria-expanded", true);
  } else if (visibility === "true") {
    mobileMenu.setAttribute("data-visible", false);
    mobileMenuToggle.setAttribute("aria-expanded", false);
  }
});

// Profile Menu Toggle
const profileMenu = document.querySelector(".profile");
const profileMenuToggle = document.querySelector(
  ".profile > [data-dropdown-button]"
);

profileMenuToggle.addEventListener("click", () => {
  const visibility = profileMenu.getAttribute("data-visible");
  console.log(visibility);
  if (visibility === "false") {
    profileMenu.setAttribute("data-visible", true);
    profileMenuToggle.setAttribute("aria-expanded", true);
  } else if (visibility === "true") {
    profileMenu.setAttribute("data-visible", false);
    profileMenuToggle.setAttribute("aria-expanded", false);
  }
});

// Nav Menu Dropdown
document.addEventListener("click", (e) => {
  const dropdownButton = e.target.matches("[data-dropdown-button]");
  if (!dropdownButton && e.target.closest("[data-dropdown]") != null) return;

  let currentDropdown;
  if (dropdownButton) {
    currentDropdown = e.target.closest("[data-dropdown]");
    currentDropdown.classList.toggle("active");
  }

  if (mobileMenu.getAttribute("data-visible") === "false") {
    document
      .querySelectorAll("[data-parent-dropdown].active")
      .forEach((dropdown) => {
        const childDropdown = dropdown.querySelector("[data-child-dropdown]");
        if (dropdown === currentDropdown || childDropdown === currentDropdown)
          return;
        dropdown.classList.remove("active");
        if (childDropdown) {
          childDropdown.classList.remove("active");
        }
      });
  }
});

// Prevent transition from triggering during page resize and load
let resizeTimer;
const stopAnimations = () => {
  document.body.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
  }, 400);
};
window.addEventListener("resize", stopAnimations);
window.addEventListener("load", stopAnimations);
