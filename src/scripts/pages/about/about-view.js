class AboutView {
  getTemplate() {
    return `
      <section id="about" class="container-about">
        <h2><span>Tentang</span> Kami</h2>

        <div class="row">
          <div class="about-img">
            <img src="https://images.unsplash.com/photo-1530099486328-e021101a494a?q=80&w=2147&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Tentang Kami" />
          </div>
          <div class="content">
            <h3>Kenapa memilih <span>SkinSync</span>?</h3>
            <p>
              SkinSync adalah platform inovatif yang menggunakan teknologi canggih untuk menganalisis jenis kulit wajah Anda. 
              Kami berkomitmen untuk memberikan solusi perawatan kulit yang personal dan efektif.
            </p>
            <p>
              Dengan algoritma machine learning yang telah dilatih menggunakan ribuan data kulit, SkinSync dapat 
              mengidentifikasi karakteristik unik kulit Anda dan memberikan rekomendasi perawatan yang tepat sasaran.
            </p>
            <div class="features">
              <div class="feature-item">
                <h4><i data-feather="zap"></i> Analisis Cepat</h4>
                <p>Hasil analisis dalam hitungan detik</p>
              </div>
              <div class="feature-item">
                <h4><i data-feather="shield"></i> Akurat & Terpercaya</h4>
                <p>Teknologi AI yang telah teruji</p>
              </div>
              <div class="feature-item">
                <h4><i data-feather="heart"></i> Rekomendasi Personal</h4>
                <p>Saran perawatan sesuai jenis kulit</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  _addScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    });

    const elements = document.querySelectorAll(".container-about .row > div");
    elements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "all 0.6s ease-out";
      observer.observe(el);
    });
  }

  _setupFeatureInteractions() {
    const featureItems = document.querySelectorAll(".feature-item");
    featureItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        item.style.transform = "translateY(-5px)";
        item.style.transition = "transform 0.3s ease";
      });

      item.addEventListener("mouseleave", () => {
        item.style.transform = "translateY(0)";
      });
    });
  }

  show() {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = this.getTemplate();

    this._addScrollAnimation();
    this._setupFeatureInteractions();

    if (typeof feather !== "undefined") {
      feather.replace();
    }
  }
}

export default AboutView;
