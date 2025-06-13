import UrlParser from "../routes/url-parser.js";
import routes from "../routes/routes.js";
import NavigationComponent from "./components/navigation.js";

class App {
  constructor() {
    this.navigation = new NavigationComponent();
    this.currentPage = null;
  }

  async init() {
    try {
      await this.renderNavigation();

      this.setupRouting();

      await this.renderPage();

      this.setupNavigationEvents();
    } catch (error) {
      console.error("Failed to initialize app:", error);
      throw error;
    }
  }

  async renderNavigation() {
    const navigationContainer = document.getElementById("navigation");
    if (navigationContainer) {
      navigationContainer.innerHTML = this.navigation.render();

      this.navigation.afterRender();
    }
  }

  setupRouting() {
    window.addEventListener("hashchange", () => this.renderPage());
    window.addEventListener("load", () => this.renderPage());
  }

  async renderPage() {
    try {
      const url = UrlParser.parseActiveUrlWithCombiner();
      const page = routes[url] || routes["/"];

      if (this.currentPage && this.currentPage.destroy) {
        this.currentPage.destroy();
      }

      this.currentPage = new page();

      const mainContent = document.getElementById("main-content");
      if (mainContent && this.currentPage) {
        mainContent.innerHTML = await this.currentPage.render();

        if (this.currentPage.afterRender) {
          await this.currentPage.afterRender();
        }

        this.updateActiveNavigation(url);

        setTimeout(() => {
          if (typeof feather !== "undefined") {
            feather.replace();
          }
        }, 100);
      }
    } catch (error) {
      console.error("Failed to render page:", error);
      this.renderErrorPage(error);
    }
  }

  updateActiveNavigation(currentUrl) {
    const navLinks = document.querySelectorAll(".navbar-nav a");
    navLinks.forEach((link) => link.classList.remove("active"));

    const activeLink = document.querySelector(`[href="#${currentUrl}"]`);
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }

  setupNavigationEvents() {
    const navLinks = document.querySelectorAll(".navbar-nav a");
    const navbarNav = document.querySelector(".navbar-nav");

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navbarNav) {
          navbarNav.classList.remove("active");
        }
      });
    });
  }

  renderErrorPage(error) {
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.innerHTML = `
        <div class="error-page">
          <div class="error-content">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you're looking for doesn't exist.</p>
            <a href="#/" class="btn-primary">Back to Home</a>
          </div>
        </div>
      `;
    }
  }
}

export default App;
