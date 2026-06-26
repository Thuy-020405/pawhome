export const safeStorage = {
  getItem(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  },
  setItem(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (e) {}
  },
  removeItem(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (e) {}
  }
};

export const safeScrollTo = (options) => {
  try {
    window.scrollTo(options);
  } catch (e) {
    // Ignore
  }
};
