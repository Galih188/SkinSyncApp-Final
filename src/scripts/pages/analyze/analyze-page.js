import AnalyzeView from "./analyze-view.js";
import AnalyzePresenter from "./analyze-presenter.js";

class AnalyzePage {
  constructor() {
    this.title = "Analyze - SkinSync";
  }

  async render() {
    return '<div id="analyze-container"></div>';
  }

  async afterRender() {
    document.title = this.title;

    const container = document.querySelector("#analyze-container");
    const view = new AnalyzeView();

    container.innerHTML = view.getTemplate();

    view.initializeAnimations();

    new AnalyzePresenter({ view });

    if (typeof feather !== "undefined") {
      feather.replace();
    }
  }
}

export default AnalyzePage;
