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
        this.searchinput = new SearchInput($target.querySelector(".SearchInput__input"), this.suggestion, this.selectedlanguage)
    }
}

class SearchInput
{
    constructor($target, suggestion, selectedlanguage)
    {
        this.suggestion = suggestion
        this.selectedlanguage = selectedlanguage
        this.$target = $target
        $target.addEventListener("input", ()=>{this.keywordChange()})
        //검색어 입력 시 suggestion을 렌더링하는 코드를 실행하는 이벤트 리스너. 검색어 다 지워지면 저절로 suggestion이 가려지도록 코딩할 것.
    }

    keywordChange()
    {
        console.log(this.$target.value)
        this.suggestion.keywordChange(this.$target.value)
    }
}