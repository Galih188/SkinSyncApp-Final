export function showFormattedDate(date, locale = "en-US", options = {}) {
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  });
}

export function sleep(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

/**
 * Memeriksa apakah pengguna sudah login dengan melihat token di localStorage.
 * @returns {boolean}
 */
export function isUserLoggedIn() {
  return !!localStorage.getItem("token");
}
