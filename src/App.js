import cache from "./cache.js";
import Suggestion from "./suggestion.js";
import SelectedLanguage from "./selectedlanguage.js";

export default class App 
{
    constructor($target)
    {
        this.$target = $target;
        this.selectedLanguage = new SelectedLanguage($target.querySelector(".SelectedLanguage"), cache.getInit("history"));
        this.suggestion = new Suggestion($target.querySelector(".Suggestion"), cache.getInit("initkey"), cache.getInit("suggestionList"), cache.getInit("selected"), this.selectedLanguage);
        this.searchInput = new SearchInput($target.querySelector(".SearchInput__input"), this.suggestion, cache.getInit("initkey"));
        this.searchInput.$target.addEventListener("keydown", e=>{this.suggestion.listenToKeyboard(e.key)});
        this.searchInput.$target.focus();
    }
}

class SearchInput
{
    nowTimer = null;

    constructor($target, suggestion, keyword)
    {
        this.suggestion = suggestion;
        this.$target = $target;
        $target.value = keyword;
        $target.addEventListener("input", ()=>{this.keywordChange()});
    }

    async keywordChange()
    {
        clearTimeout(this.nowTimer);
        this.nowTimer = setTimeout(async ()=>{
            await this.suggestion.keywordChange(this.$target.value);
            cache.setInit("initkey", this.$target.value);    
        }, 1000);
    }
}