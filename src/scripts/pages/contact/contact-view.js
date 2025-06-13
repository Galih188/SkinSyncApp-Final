import ApiService from "../../services/ApiService";

class ContactView {
  getTemplate() {
    return `
      <section id="contact" class="container-contact">
        <h2><span>Kontak</span> Kami</h2>
        <p class="section-subtitle">Punya pertanyaan atau masukan? Jangan ragu untuk menghubungi kami melalui form di bawah ini.</p>
        
        <div class="row">
          <div class="contact-card contact-details">
            <h3>Hubungi Kami</h3>
            <div class="contact-info">
              <div class="info-item">
                <i data-feather="mail"></i>
                <span>skinsyn@gmail.com</span>
              </div>
              <div class="info-item">
                <i data-feather="phone"></i>
                <span>+62 851 8335 3829</span>
              </div>
            </div>
            <form class="contact-form">
              <div class="input-group">
                <input type="text" placeholder="Nama Anda" required />
              </div>
              <div class="input-group">
                <input type="email" placeholder="Email Anda" required />
              </div>
              <div class="input-group">
                <textarea rows="5" placeholder="Pesan Anda..." required></textarea>
              </div>
              <button type="submit" class="btn-submit">Kirim Pesan <i data-feather="arrow-right"></i></button>
            </form>
          </div>
        </div>
      </section>
    `;
  }

  _addScrollAnimation() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll(
      ".container-contact .contact-card"
    );
    elements.forEach((el) => {
      observer.observe(el);
    });
  }

  _setupInteractions() {
    const infoItems = document.querySelectorAll(".info-item");
    infoItems.forEach((item) => {
      item.addEventListener(
        "mouseenter",
        () => (item.style.transform = "translateX(5px)")
      );
      item.addEventListener(
        "mouseleave",
        () => (item.style.transform = "translateX(0)")
      );
    });
  }

  _initFormListener() {
    const form = document.querySelector(".contact-form");
    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const submitButton = form.querySelector("button[type='submit']");
        submitButton.disabled = true;
        submitButton.innerHTML = "Mengirim...";

        const name = form.querySelector("input[type='text']").value;
        const email = form.querySelector("input[type='email']").value;
        const message = form.querySelector("textarea").value;

        try {
          const result = await ApiService.sendFeedback(name, email, message);
          alert(result.message);
          form.reset(); // Mengkosongkan form setelah berhasil
        } catch (error) {
          alert(`Error: ${error.message}`);
        } finally {
          submitButton.disabled = false;
          submitButton.innerHTML =
            'Kirim Pesan <i data-feather="arrow-right"></i>';
          feather.replace();
        }
      });
    }
  }

  show() {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = this.getTemplate();

    this._addScrollAnimation();
    this._setupInteractions();
    this._initFormListener();

    if (typeof feather !== "undefined") {
      feather.replace();
    }
  }
}

export default ContactView;
