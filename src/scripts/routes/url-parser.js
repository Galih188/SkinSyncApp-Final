class UrlParser {
  static parseActiveUrlWithCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    const splitedUrl = this.splitUrl(url);
    return this.combineUrlWithoutParams(splitedUrl);
  }

  static parseActiveUrlWithoutCombiner() {
    const url = window.location.hash.slice(1);
    return this.splitUrl(url);
  }

  static splitUrl(url) {
    const urlsSplits = url.split("/");
    return {
      resource: urlsSplits[1] || null,
      id: urlsSplits[2] || null,
      verb: urlsSplits[3] || null,
    };
  }

  static combineUrlWithoutParams(splitedUrl) {
    const { resource, id, verb } = splitedUrl;

    if (resource && id && verb) {
      return `/${resource}/${id}/${verb}`;
    }

    if (resource && id) {
      return `/${resource}/${id}`;
    }

    if (resource) {
      return `/${resource}`;
    }

    return "/";
  }

  static getUrlParams() {
    const url = window.location.hash.slice(1);
    const params = {};

    if (url.includes("?")) {
      const queryString = url.split("?")[1];
      const pairs = queryString.split("&");

      pairs.forEach((pair) => {
        const [key, value] = pair.split("=");
        params[decodeURIComponent(key)] = decodeURIComponent(value || "");
      });
    }

    return params;
  }

  static getCurrentPath() {
    return window.location.hash.slice(1) || "/";
  }

  static navigateTo(path) {
    window.location.hash = path;
  }
}

export default UrlParser;
