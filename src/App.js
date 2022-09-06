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
        //�˻��� �Է� �� suggestion�� �������ϴ� �ڵ带 �����ϴ� �̺�Ʈ ������
        //�˻��� �� �������� suggestion�� ������ �ڵ带 �����ϴ� �̺�Ʈ ������
    }
}