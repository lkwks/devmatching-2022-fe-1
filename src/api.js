import cache from "./cache.js";

const API_ENDPOINT = "https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev";
  

const request = async url => 
{
    try 
    {   
        const result = await fetch(url);
        if (result.ok)
            return await result.json();     
        else
        {
            if (result.status >= 500)
                throw `서버 에러: ${result.status}`;
            if (result.status >= 400)
                throw `클라이언트 에러: ${result.status}`;
            if (result.status >= 300)
                throw `리다이렉트 에러: ${result.status}`;
            throw result.status;
        }
    } 
    catch (e) 
    {
        if (e.message) throw e.message;
        else throw e;
    }   
};    


const api = {
  fetchKeyword: async keyword => 
  {
      try
      {
          const cacheData = cache.get(keyword);
          if (cacheData)
            return {isError: false, data: cacheData};

          const url = `${API_ENDPOINT}/languages?keyword=${keyword}`;
          const result = await request(url);
          //result에 에러 메시지가 담길 경우 어떤 처리를 해야 하는지 아직 잘 모름..
          cache.set(keyword, result);
          return {isError: false, data: result};
      }
      catch(e)
      {
          return {isError: true, data: e};
      }
  },
};

export default api