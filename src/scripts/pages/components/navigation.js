import { isUserLoggedIn } from "../../utils";

class NavigationComponent {
  constructor() {
    this.isMenuOpen = false;
  }

  render() {
    const authLink = isUserLoggedIn()
      ? '<a href="#/auth">Logout</a>'
      : '<a href="#/auth">Login</a>';

    return `
      <div class="navbar">
        <a href="" class="navbar-logo">Skin<span>Sync</span>.</a>

        <div class="navbar-nav">
          <a href="#/">Home</a>
          <a href="#/about">About</a>
          <a href="#/contact">Contact</a>
          ${authLink}
        </div>

        <div class="navbar-extra">
          <a href="#" id="hamburger-menu"><i data-feather="menu"></i></a>
        </div>
      </div>
    `;
  }

  afterRender() {
    this.setupHamburgerMenu();
    this.setupClickOutside();
  }

  setupHamburgerMenu() {
    const hamburgerMenu = document.querySelector("#hamburger-menu");
    const navbarNav = document.querySelector(".navbar-nav");

    if (hamburgerMenu && navbarNav) {
      hamburgerMenu.addEventListener("click", (e) => {
        e.preventDefault();
        this.toggleMenu();
      });
    }
  }

  setupClickOutside() {
    const hamburgerMenu = document.querySelector("#hamburger-menu");
    const navbarNav = document.querySelector(".navbar-nav");

    document.addEventListener("click", (e) => {
      if (hamburgerMenu && navbarNav) {
        if (
          !hamburgerMenu.contains(e.target) &&
          !navbarNav.contains(e.target)
        ) {
          this.closeMenu();
        }
      }
    });
  }

  toggleMenu() {
    const navbarNav = document.querySelector(".navbar-nav");
    if (navbarNav) {
      navbarNav.classList.toggle("active");
      this.isMenuOpen = navbarNav.classList.contains("active");
    }
  }

  closeMenu() {
    const navbarNav = document.querySelector(".navbar-nav");
    if (navbarNav) {
      navbarNav.classList.remove("active");
      this.isMenuOpen = false;
    }
  }

  openMenu() {
    const navbarNav = document.querySelector(".navbar-nav");
    if (navbarNav) {
      navbarNav.classList.add("active");
      this.isMenuOpen = true;
    }
  }
}

export default NavigationComponent;
