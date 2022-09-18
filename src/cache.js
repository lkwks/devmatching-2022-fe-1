const cache = {
    get(key) {
        return JSON.parse(sessionStorage.getItem(key));
    },
    set(key, data) {
        sessionStorage.setItem(key, JSON.stringify(data));
    },
    getInit(key) {
        return JSON.parse(localStorage.getItem(key));
    },
    setInit(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },
};

export default cache;