class AboutPresenter {
  constructor({ view }) {
    this._view = view;
    this._pageTitle = "About - SkinSync";
  }

  async showPage() {
    document.title = this._pageTitle;

    this._view.show();
  }
}

export default AboutPresenter;
