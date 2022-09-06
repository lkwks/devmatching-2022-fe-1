const cache = {
    get(key) {
      const data = JSON.parse(sessionStorage.getItem(key));
      return data;
    },
    set(key, data) {
      sessionStorage.setItem(key, JSON.stringify(data));
    },
};

export default cache;