import AboutView from "./about-view.js";
import AboutPresenter from "./about-presenter.js";

class AboutPage {
  async render() {
    return "";
  }

  async afterRender() {
    const view = new AboutView();
    const presenter = new AboutPresenter({ view });

    await presenter.showPage();
  }
}

export default AboutPage;
