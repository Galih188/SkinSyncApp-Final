class AuthPresenter {
  constructor({ view }) {
    this._view = view;
    this._pageTitle = "Sign In / Sign Up - SkinSync";
  }

  async showPage() {
    document.title = this._pageTitle;
    this._view.show();
  }
}

export default AuthPresenter;
