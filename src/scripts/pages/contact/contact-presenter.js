class ContactPresenter {
  constructor({ view }) {
    this._view = view;
    this._pageTitle = "Contact - SkinSync";
  }

  async showPage() {
    document.title = this._pageTitle;
    this._view.show();
  }
}

export default ContactPresenter;
