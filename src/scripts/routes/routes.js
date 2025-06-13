import HomePage from "../pages/home/home-page.js";
import AboutPage from "../pages/about/about-page.js";
import AnalyzePage from "../pages/analyze/analyze-page.js";
import ContactPage from "../pages/contact/contact-page.js";
import AuthPage from "../pages/auth/auth-page.js";

const routes = {
  "/": HomePage,
  "/home": HomePage,
  "/about": AboutPage,
  "/analyze": AnalyzePage,
  "/contact": ContactPage,
  "/auth": AuthPage,
};

export default routes;
