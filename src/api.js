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
                throw `���� ����: ${result.status}`;
            if (result.status >= 400)
                throw `Ŭ���̾�Ʈ ����: ${result.status}`;
            if (result.status >= 300)
                throw `�����̷�Ʈ ����: ${result.status}`;
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
          //result�� ���� �޽����� ��� ��� � ó���� �ؾ� �ϴ��� ���� �� ��..
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