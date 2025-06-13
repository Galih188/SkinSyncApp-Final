class HomePresenter {
  constructor({ view, contentContainer }) {
    this._view = view;
    this._contentContainer = contentContainer;
    this._title = "Home - SkinSync";

    this._init();
  }

  _init() {
    this._renderView();
    this._updateTitle();
    this._setupEventListeners();
    this._applyEntranceAnimation();
  }

  _renderView() {
    this._contentContainer.innerHTML = this._view.getTemplate();
  }

  _updateTitle() {
    document.title = this._title;
  }

  _setupEventListeners() {
    const ctaButton = this._contentContainer.querySelector(".cta");
    if (ctaButton) {
      ctaButton.addEventListener("click", (e) => {
        if (ctaButton.getAttribute("href").startsWith("#")) {
          e.preventDefault();
          window.location.hash = ctaButton.hash.slice(1);
        }
      });
    }
  }

  _applyEntranceAnimation() {
    const content = this._contentContainer.querySelector(
      ".container-home-view .content"
    );
    if (content) {
      content.style.opacity = "0";
      content.style.transform = "translateY(20px)";
      content.style.transition = "all 0.6s ease-out";

      setTimeout(() => {
        content.style.opacity = "1";
        content.style.transform = "translateY(0)";
      }, 100);
    }
  }
}

export default HomePresenter;
