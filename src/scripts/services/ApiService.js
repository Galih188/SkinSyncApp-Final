const API_BASE_URL = "http://be-skinsync-api-v2-production.up.railway.app";
/**
 * Helper untuk mendapatkan header otentikasi.
 * @returns {HeadersInit}
 */
const _getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
  };
};

/**
 * Helper untuk mengubah base64 menjadi Blob.
 * @param {string} base64
 * @param {string} contentType
 * @returns {Blob}
 */
const _base64toBlob = (base64, contentType = "image/jpeg") => {
  const byteCharacters = atob(base64.split(",")[1]);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  return new Blob(byteArrays, { type: contentType });
};

const ApiService = {
  /**
   * Login pengguna.
   * @param {string} email
   * @param {string} password
   */
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Login failed");
    return result;
  },

  /**
   * Registrasi pengguna.
   * @param {string} name
   * @param {string} email
   * @param {string} password
   */
  register: async (name, email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Registration failed");
    return result;
  },

  /**
   * Menganalisis foto kulit.
   * @param {string} imageBase64
   */
  analyzeSkin: async (imageBase64) => {
    const imageBlob = _base64toBlob(imageBase64);
    const formData = new FormData();
    formData.append("file", imageBlob, "skin-image.jpg");

    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: "POST",
      headers: _getAuthHeader(),
      body: formData,
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(
        result.msg ||
          result.error ||
          "Analisis gagal, token tidak valid atau hilang."
      );
    }

    return result;
  },

  /**
   * Mengirim feedback dari formulir kontak.
   * @param {string} name
   * @param {string} email
   * @param {string} message
   */
  sendFeedback: async (name, email, message) => {
    const response = await fetch(`${API_BASE_URL}/feedback`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Failed to send message");
    return result;
  },
};

export default ApiService;
