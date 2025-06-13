import AuthView from "./auth-view.js";
import AuthPresenter from "./auth-presenter.js";

class AuthPage {
  async render() {
    return "";
  }

  async afterRender() {
    const view = new AuthView();
    const presenter = new AuthPresenter({ view });

    await presenter.showPage();
  }
}

export default AuthPage;
