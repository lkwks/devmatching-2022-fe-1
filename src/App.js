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
        //�˻��� �Է� �� suggestion�� �������ϴ� �ڵ带 �����ϴ� �̺�Ʈ ������. �˻��� �� �������� ������ suggestion�� ���������� �ڵ��� ��.
    }

    keywordChange()
    {
        console.log(this.$target.value)
        this.suggestion.keywordChange(this.$target.value)
    }
}