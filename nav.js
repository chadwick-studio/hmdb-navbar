// Get DOM elements for mobile and profile menu toggles
const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const profileMenu = document.querySelector(".user-profile");
const profileMenuToggle = document.querySelector("[data-user-profile-button]");

// Toggle menu visibility
function toggleMenuVisibility(menu, button) {
	const menuVisible = menu.getAttribute("data-visible") === "true";
	menu.setAttribute("data-visible", !menuVisible);
	button.setAttribute("aria-expanded", !menuVisible);
}

// Close profile menu
function closeProfileMenu() {
	profileMenu.setAttribute("data-visible", false);
}

// Handle mobile and profile menu toggles
function setupMenuToggles() {
	mobileMenuToggle.addEventListener("click", () => {
		toggleMenuVisibility(mobileMenu, mobileMenuToggle);
		closeProfileMenu();
	});

	profileMenuToggle.addEventListener("click", () => {
		toggleMenuVisibility(profileMenu, profileMenuToggle);
	});
}

// Handle nav menu dropdown
function setupNavMenuDropdown() {
	document.addEventListener("click", (event) => {
		const isDropdownButton = event.target.matches("[data-dropdown-button]");
		if (!isDropdownButton && event.target.closest("[data-dropdown]") != null) {
			return;
		}

		let currentDropdown;
		if (isDropdownButton) {
			currentDropdown = event.target.closest("[data-dropdown]");
			currentDropdown.classList.toggle("active");
		}

		if (mobileMenu.getAttribute("data-visible") === "false") {
			document
				.querySelectorAll("[data-parent-dropdown].active")
				.forEach((dropdown) => {
					const childDropdown = dropdown.querySelector("[data-child-dropdown]");
					if (
						dropdown === currentDropdown ||
						childDropdown === currentDropdown
					) {
						return;
					}
					dropdown.classList.remove("active");
					if (childDropdown) {
						childDropdown.classList.remove("active");
					}
				});

			if (currentDropdown) {
				closeProfileMenu();
			}
		}
	});
}

// Prevent transition from triggering during page resize and load
let resizeTimer;
function stopAnimations() {
	document.body.classList.add("resize-animation-stopper");
	clearTimeout(resizeTimer);
	resizeTimer = setTimeout(() => {
		document.body.classList.remove("resize-animation-stopper");
	}, 400);
}

function setupResizeListener() {
	window.addEventListener("resize", stopAnimations);
	window.addEventListener("load", stopAnimations);
}

// Set up all event listeners and other functionality
function init() {
	setupMenuToggles();
	setupNavMenuDropdown();
	setupResizeListener();
}

// Call the initialize function
init();
