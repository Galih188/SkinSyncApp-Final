import { isUserLoggedIn } from "../../utils";

class HomeView {
  getTemplate() {
    const getStartedLink = isUserLoggedIn() ? "#/analyze" : "#/auth";

    return `
      <section class="container-home-view" id="home">
        <main class="content">
          <h1>
            Mari Kenali Jenis Kulitmu dengan <i>Skin<span>Sync</span></i>.
          </h1>
          <p>
            Temukan jenis kulit wajah Anda dengan teknologi analisis terdepan. 
            SkinSync membantu Anda memahami karakteristik kulit untuk perawatan yang lebih tepat dan efektif.
          </p>
          <a href="${getStartedLink}" class="cta">Get Started</a>
        </main>
      </section>
    `;
  }
}

export default HomeView;
