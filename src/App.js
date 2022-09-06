import cache from "./cache.js";
import Suggestion from "./suggestion.js";
import SelectedLanguage from "./selectedlanguage.js";

export default class App 
{
    constructor($target)
    {
        this.$target = $target;
        initialState = cache.getInit();
        this.keyword = initialState.keyword;
        this.selected = initialState.selected;
        this.suggestion = new Suggestion($target.querySelector(".Suggestion > ul"), this.keyword, cache.get(this.keyword), this.selected);
        this.selectedlanguage = new SelectedLanguage($target.querySelector(".SelectedLanguage > ul"));
        this.searchinput = new SearchInput($target.querySelector(".SearchInput__input"), this.suggestion, keyword);
        $target.focus();
    }
}

class SearchInput
{
    constructor($target, suggestion, keyword)
    {
        this.suggestion = suggestion;
        this.$target = $target;
        $target.value = keyword;
        $target.addEventListener("input", ()=>{this.keywordChange()});
        //검색어 입력 시 suggestion을 렌더링하는 코드를 실행하는 이벤트 리스너. 검색어 다 지워지면 저절로 suggestion이 가려지도록 코딩할 것.
        this.keywordChange();
    }

    keywordChange()
    {
        this.suggestion.keywordChange(this.$target.value);
        cache.setInit(this.$target.value, this.suggestion.selected);
    }
}