import cache from "./cache.js";

const API_ENDPOINT = "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev";

const api = {
    fetchKeyword: async keyword => 
    {
        try
        {
            const cacheData = cache.get(keyword);
            if (cacheData)
                return {isError: false, data: cacheData};
            const result = await fetch(`${API_ENDPOINT}/languages?keyword=${keyword}`);
            const resultData = result.ok ? await result.json() : null;
            cache.set(keyword, resultData);
            return {isError: resultData == null, data: resultData};
        }
        catch(e)
        {
            return {isError: true, data: e};
        }
    },
};

export default api