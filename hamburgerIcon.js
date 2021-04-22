// NOTE!! This js is largely used from aleksandr hovhannisyan -> https://www.aleksandrhovhannisyan.com/blog/responsive-navbar-without-bootstrap/#responsive-navbar-html
// Additional comments have been added for this project

const navbar = document.getElementById("navbar");
const navbarToggle = navbar.querySelector(".navbar-toggle");

// function opens the hamburger
function openMobileNavbar() {
  navbar.classList.add("opened");
  navbarToggle.setAttribute("aria-label", "Close navigation menu.");
}

// function closes the hamburger
function closeMobileNavbar() {
  navbar.classList.remove("opened");
  navbarToggle.setAttribute("aria-label", "Open navigation menu.");
}

// If hamburger is clicked and it is open, this will close it. Else, if hamburger is clicked and it is closed, this will close it.
navbarToggle.addEventListener("click", () => {
  if (navbar.classList.contains("opened")) {
    closeMobileNavbar();
  } else {
    openMobileNavbar();
  }
});

const navbarMenu = navbar.querySelector(".navbar-menu");
const navbarLinksContainer = navbar.querySelector(".navbar-links");

// This lets the user close the navbar window once it's open. The 'stop propagation' prevents event bubbling -> triggering on innermost target element before outermost target elements.
navbarLinksContainer.addEventListener("click", (clickEvent) => {
  clickEvent.stopPropagation();
});

navbarMenu.addEventListener("click", closeMobileNavbar);
