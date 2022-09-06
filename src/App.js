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
        //�˻��� �Է� �� suggestion�� �������ϴ� �ڵ带 �����ϴ� �̺�Ʈ ������. �˻��� �� �������� ������ suggestion�� ���������� �ڵ��� ��.
        this.keywordChange();
    }

    keywordChange()
    {
        this.suggestion.keywordChange(this.$target.value);
        cache.setInit(this.$target.value, this.suggestion.selected);
    }
}