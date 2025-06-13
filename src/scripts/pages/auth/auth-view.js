import { isUserLoggedIn } from "../../utils/index";
import ApiService from "../../services/ApiService";

class AuthView {
  getTemplate() {
    if (isUserLoggedIn()) {
      return this._getSignOutTemplate();
    }
    return this._getSignInUpTemplate();
  }

  _getSignInUpTemplate() {
    return `
      <section id="auth" class="container-auth">
        <h2><span>Autentikasi</span> Pengguna</h2>
        <p class="section-subtitle">Masuk untuk melanjutkan atau daftar jika Anda pengguna baru.</p>
        
        <div class="row">
          <div class="auth-card">
            <div class="auth-toggle">
              <button id="to-signin" class="btn-toggle active">Login</button>
              <button id="to-signup" class="btn-toggle">Register</button>
            </div>

            <form id="signin-form" class="auth-form active">
              <h3>Login</h3>
              <div class="input-group">
                <input type="email" id="signInEmail" placeholder="Email Anda" required />
              </div>
              <div class="input-group">
                <input type="password" id="signInPassword" placeholder="Password Anda" required />
              </div>
              <button type="submit" class="btn-submit">Sign In <i data-feather="log-in"></i></button>
            </form>

            <form id="signup-form" class="auth-form">
              <h3>Register</h3>
               <div class="input-group">
                <input type="text" id="signUpName" placeholder="Nama Anda" required />
              </div>
              <div class="input-group">
                <input type="email" id="signUpEmail" placeholder="Email Anda" required />
              </div>
              <div class="input-group">
                <input type="password" id="signUpPassword" placeholder="Buat Password" required />
              </div>
              <button type="submit" class="btn-submit">Sign Up <i data-feather="user-plus"></i></button>
            </form>
          </div>
        </div>
      </section>
    `;
  }

  _getSignOutTemplate() {
    const user = JSON.parse(localStorage.getItem("user"));
    const userName = user ? user.name : "Pengguna";

    return `
      <section id="auth" class="container-auth">
        <h2>Anda sudah <span>Masuk</span></h2>
        <p class="section-subtitle">Halo ${userName}, apakah Kamu ingin keluar?</p>

        <div class="row">
          <div class="auth-card visible" style="text-align: center;">
            <h3>Logout</h3>
            <p style="margin-bottom: 2rem; color: var(--text-light);">Klik tombol di bawah untuk keluar.</p>
            <button id="signout-btn" class="btn-submit" style="background: var(--danger)">
              Logout <i data-feather="log-out"></i>
            </button>
          </div>
        </div>
      </section>
    `;
  }

  show() {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = this.getTemplate();

    if (isUserLoggedIn()) {
      this._initSignOutListener();
    } else {
      this._addScrollAnimation();
      this._setupInteractions();
      this._initAuthForm();
    }

    if (typeof feather !== "undefined") {
      feather.replace();
    }
  }

  // --- Listener untuk tombol SignOut ---
  _initSignOutListener() {
    const signOutButton = document.getElementById("signout-btn");
    if (signOutButton) {
      signOutButton.addEventListener("click", this._handleSignOut.bind(this));
    }
  }

  // --- Logika SignOut ---
  _handleSignOut(event) {
    event.preventDefault();

    // Hapus data dari localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Kamu berhasil keluar.");

    // Mengarahkan ke home dan reload halaman
    window.location.hash = "#/";
    window.location.reload();
  }

  _setupInteractions() {
    const toSigninBtn = document.getElementById("to-signin");
    const toSignupBtn = document.getElementById("to-signup");
    const signinForm = document.getElementById("signin-form");
    const signupForm = document.getElementById("signup-form");

    if (toSigninBtn && toSignupBtn && signinForm && signupForm) {
      toSigninBtn.addEventListener("click", () => {
        toSigninBtn.classList.add("active");
        toSignupBtn.classList.remove("active");
        signinForm.classList.add("active");
        signupForm.classList.remove("active");
      });

      toSignupBtn.addEventListener("click", () => {
        toSignupBtn.classList.add("active");
        toSigninBtn.classList.remove("active");
        signupForm.classList.add("active");
        signinForm.classList.remove("active");
      });
    }
  }

  // --- Logika untuk event listener form ---
  _initAuthForm() {
    const signUpForm = document.getElementById("signup-form");
    const signInForm = document.getElementById("signin-form");

    if (signUpForm) {
      signUpForm.addEventListener("submit", this._handleSignUp.bind(this));
    }
    if (signInForm) {
      signInForm.addEventListener("submit", this._handleSignIn.bind(this));
    }
  }

  // --- Logika untuk proses registrasi ---
  async _handleSignUp(event) {
    event.preventDefault();
    const name = document.getElementById("signUpName").value;
    const email = document.getElementById("signUpEmail").value;
    const password = document.getElementById("signUpPassword").value;

    try {
      await ApiService.register(name, email, password);
      alert("Registrasi berhasil! Silakan Sign In.");
      document.getElementById("to-signin").click();
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  }

  // --- Logika untuk proses login ---
  async _handleSignIn(event) {
    event.preventDefault();
    const email = document.getElementById("signInEmail").value;
    const password = document.getElementById("signInPassword").value;

    try {
      const result = await ApiService.login(email, password);

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      alert("Login berhasil!");
      window.location.hash = "#/";
      window.location.reload();
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
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

    const elements = document.querySelectorAll(".container-auth .auth-card");
    elements.forEach((el) => {
      observer.observe(el);
    });
  }
}

export default AuthView;
