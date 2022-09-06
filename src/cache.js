const cache = {
    get(key) {
        return JSON.parse(sessionStorage.getItem("keywords"))[key];
    },
    set(key, data) {
        let cacheData = JSON.parse(sessionStorage.getItem("keywords"));
        cacheData[key] = data;
        sessionStorage.setItem("keywords", JSON.stringify(cacheData));
    },
    getInit() {
        const keyword = JSON.parse(sessionStorage.getItem("initkey"));
        const selected = JSON.parse(sessionStorage.getItem("selected"));
        return {keyword:keyword, selected:selected};
    },
    setInit(keyword, selected) {
        sessionStorage.setItem("initkey", JSON.stringify(keyword));
        sessionStorage.setItem("selected", JSON.stringify(selected));
    },
};

export default cache;