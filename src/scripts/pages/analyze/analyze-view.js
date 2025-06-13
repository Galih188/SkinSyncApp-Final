class AnalyzeView {
  constructor() {
    this.container = document.body;
  }

  _getElement(selector) {
    if (!this[selector]) {
      this[selector] = document.querySelector(selector);
    }
    return this[selector];
  }

  getTemplate() {
    return `
      <section id="analyze" class="container-analyze">
        <h2><span>Analisis</span> Kulit Wajah Kamu</h2>
        <p>Upload foto wajah Anda untuk mengetahui jenis kulit dan mendapatkan rekomendasi perawatan yang tepat.</p>
        <div class="row">
          <div class="card-img">
            <div id="preview-container" class="preview-img">
              <img id="preview" alt="Preview gambar" />
              <div class="placeholder-content">
                <i data-feather="camera" size="48"></i>
                <p>Upload foto wajah Anda</p>
              </div>
            </div>
            <div class="upload-btn">
              <label for="file-input" class="custom-file-upload">
                <i data-feather="upload"></i> Upload File
              </label>
              <input type="file" id="file-input" accept="image/*" capture="environment">
            </div>
            <div class="analyze-actions">
              <button id="analyze-btn" class="analyze-button" disabled>
                <i data-feather="search"></i> Analisis Kulit
              </button>
              <button id="reset-btn" class="reset-button" style="display: none;">
                <i data-feather="refresh-cw"></i> Reset
              </button>
            </div>
          </div>
          <div class="card-result">
            <div id="analysis-result" class="analysis-content">
              <div class="result-placeholder">
                <i data-feather="info" size="48"></i>
                <h3>Hasil Analisis</h3>
                <p>Upload foto dan klik "Analisis Kulit" untuk melihat hasil analisis jenis kulit wajah Anda.</p>
              </div>
            </div>
          </div>
        </div>

        <div id="loading-indicator" style="display: none;">
          <div class="spinner"></div>
          <p>Menganalisis...</p>
        </div>
      </section>
    `;
  }

  // Metode untuk Inisialisasi Loading
  showLoading() {
    const loadingIndicator = this._getElement("#loading-indicator");
    if (loadingIndicator) {
      loadingIndicator.style.display = "flex";
    }
  }

  hideLoading() {
    const loadingIndicator = this._getElement("#loading-indicator");
    if (loadingIndicator) {
      loadingIndicator.style.display = "none";
    }
  }

  // Metode untuk Inisialisasi Animasi
  initializeAnimations() {
    this._addScrollAnimation();
    this._setupButtonInteractions();
  }

  _addScrollAnimation() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(
      ".container-analyze .card-img, .container-analyze .card-result"
    );
    elements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "all 0.7s cubic-bezier(0.25, 0.8, 0.25, 1)";
      observer.observe(el);
    });
  }

  _setupButtonInteractions() {
    const buttons = document.querySelectorAll(
      ".custom-file-upload, .analyze-button, .reset-button, .share-btn, .save-btn"
    );
    buttons.forEach((btn) => {
      btn.style.transition =
        "transform 0.2s ease-out, box-shadow 0.2s ease-out";
    });
  }

  // Metode untuk DOM
  displayImagePreview(fileUrl) {
    this._getElement("#preview").src = fileUrl;
    this._getElement("#preview").style.display = "block";
    this._getElement(".placeholder-content").style.display = "none";
    this._getElement("#analyze-btn").disabled = false;
    this._getElement("#analyze-btn").classList.add("enabled");
  }

  displayAnalysisLoading() {
    this._getElement("#analyze-btn").disabled = true;
    this._getElement("#analyze-btn").innerHTML =
      '<i data-feather="loader"></i> Menganalisis...';
    this._getElement("#analysis-result").innerHTML = `
      <div class="loading-analysis">
        <div class="loading-spinner"></div>
        <h3>Sedang menganalisis...</h3>
        <p>Mohon tunggu, kami sedang menganalisis jenis kulit Anda.</p>
      </div>
    `;
    if (typeof feather !== "undefined") {
      feather.replace();
    }
  }

  displayAnalysisResult(result) {
    const { skin_type, description, recommendations } = result;

    const recommendationItems = recommendations
      .map(
        (rec) => `
        <li class="product-item>
          <strong>${rec.description}</p>
          <p>${rec.description}</p>
        </li>
      `
      )
      .join("");

    this._getElement("#analysis-result").innerHTML = `
      <div class="result-success" style="opacity:0; transform: translateY(20px); transition: all 0.5s ease-out;">
        <div class="result-header">
          <i data-feather="check-circle" class="success-icon"></i>
          <h3>Jenis Kulit: ${skin_type}</h3>
        </div>
        <div class="result-description"><p>${description}</p></div>
        <div class="recommendations">
          <h4><i data-feather="star"></i> Rekomendasi Perawatan:</h4>
          <ul>${recommendations.map((rec) => `<li>${rec}</li>`).join("")}</ul>
        </div>
        <div class="result-actions">
          <button class="share-btn"><i data-feather="share-2"></i> Bagikan Hasil</button>
        </div>
      </div>
    `;
    this._getElement("#analyze-btn").disabled = false;
    this._getElement("#analyze-btn").innerHTML =
      '<i data-feather="search"></i> Analisis Ulang';
    this._getElement("#reset-btn").style.display = "inline-block";

    // Animasi untuk hasil
    setTimeout(() => {
      const resultSuccess = this._getElement(".result-success");
      if (resultSuccess) {
        resultSuccess.style.opacity = "1";
        resultSuccess.style.transform = "translateY(0)";
      }
    }, 50);

    feather.replace();
    this._setupButtonInteractions();
  }

  resetUI() {
    this._getElement("#file-input").value = "";
    this._getElement("#preview").style.display = "none";
    this._getElement("#preview").src = "";
    this._getElement(".placeholder-content").style.display = "flex";
    this._getElement("#analyze-btn").disabled = true;
    this._getElement("#analyze-btn").classList.remove("enabled");
    this._getElement("#reset-btn").style.display = "none";
    this._getElement("#analysis-result").innerHTML = `
      <div class="result-placeholder">
        <i data-feather="info" size="48"></i>
        <h3>Hasil Analisis</h3>
        <p>Upload foto dan klik "Analisis Kulit" untuk melihat hasil analisis jenis kulit wajah Anda.</p>
      </div>
    `;
    if (typeof feather !== "undefined") {
      feather.replace();
    }
  }

  showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `<i data-feather="${
      type === "error" ? "alert-circle" : "check-circle"
    }"></i><span>${message}</span>`;
    this.container.appendChild(notification);
    if (typeof feather !== "undefined") {
      feather.replace();
    }

    setTimeout(() => {
      notification.style.opacity = "0";
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Metode untuk Bind
  bindFileUpload(handler) {
    this._getElement("#file-input").addEventListener("change", (e) =>
      handler(e.target.files[0])
    );
    const previewContainer = this._getElement("#preview-container");
    previewContainer.addEventListener("dragover", (e) => {
      e.preventDefault();
      previewContainer.classList.add("drag-over");
    });
    previewContainer.addEventListener("dragleave", () =>
      previewContainer.classList.remove("drag-over")
    );
    previewContainer.addEventListener("drop", (e) => {
      e.preventDefault();
      previewContainer.classList.remove("drag-over");
      if (e.dataTransfer.files.length > 0) handler(e.dataTransfer.files[0]);
    });
  }

  bindCardActions(analyzeHandler, resetHandler) {
    const cardImg = this._getElement(".card-img");
    if (cardImg) {
      cardImg.addEventListener("click", (event) => {
        // Mengecek apakah tombol analisis yg diklik dan apakah tidak dalam kondisi disabled
        const analyzeButton = event.target.closest("#analyze-btn");
        if (analyzeButton && !analyzeButton.disabled) {
          analyzeHandler();
        }

        // Mengecek apakah tombol reset yang diklik
        const resetButton = event.target.closest("#reset-btn");
        if (resetButton) {
          resetHandler();
        }
      });
    }
  }

  bindResultActions(shareHandler, saveHandler) {
    this._getElement("#analysis-result").addEventListener("click", (event) => {
      if (event.target.closest(".share-btn")) shareHandler();
      if (event.target.closest(".save-btn")) saveHandler();
    });
  }

  // Metode untuk error
  showError(message) {
    const resultContainer = this._getElement("#analysis-result");
    if (!resultContainer) return;

    resultContainer.innerHTML = `
      <div class="error-message">
        <div class="error-icon">
          <i data-feather="alert-triangle"></i>
        </div>
        <div class="error-content">
          <h4>Oops, Analisis Gagal!</h4>
          <p class="error-details">${message}</p>
          <p class="error-suggestion">
            Pastikan koneksi internet Anda stabil dan coba lagi.
          </p>
          <button class="reset-button-error">
            <i data-feather="refresh-cw"></i> Coba Lagi
          </button>
        </div>
      </div>
    `;

    if (typeof feather !== "undefined") {
      feather.replace();
    }

    const resetButton = resultContainer.querySelector(".reset-button-error");
    if (resetButton) {
      resetButton.addEventListener("click", () => {
        this.resetUI();
      });
    }

    resultContainer.style.display = "block";
  }
}

export default AnalyzeView;
