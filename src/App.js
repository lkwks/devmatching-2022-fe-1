import api from "./api.js";
import cache from "./cache.js";
import Suggestion from "./suggestion.js";
import SelectedLanguage from "./selectedlanguage.js";

export default class App 
{
    constructor($target)
    {
        this.$target = $target;
        this.suggestion = new Suggestion($target)
        this.selectedlanguage = new SelectedLanguage($target)
        this.searchinput = new SearchInput($target)
    }
}

class SearchInput
{
    constructor($target)
    {
        $target.querySelector(".SearchInput__input").addEventListener("input", function(){alert(1)})
        //검색어 입력 시 suggestion을 렌더링하는 코드를 실행하는 이벤트 리스너
        //검색어 다 지워지면 suggestion을 가리는 코드를 실행하는 이벤트 리스너
    }
}