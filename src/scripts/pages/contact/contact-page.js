import ContactView from "./contact-view.js";
import ContactPresenter from "./contact-presenter.js";

class ContactPage {
  async render() {
    return "";
  }

  async afterRender() {
    const view = new ContactView();
    const presenter = new ContactPresenter({ view });

    await presenter.showPage();
  }
}

export default ContactPage;
