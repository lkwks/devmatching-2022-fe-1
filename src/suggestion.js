import api from "./api.js";

export default class Suggestion
{
    constructor($target, keyword, cacheList, selected)
    {
        this.$target = $target;
        this.keyword = keyword;
        this.suggestionList = cacheList;
        this.selected = selected;
        this.render();
    }

    keywordChange(keyword)
    {

    }

    render()
    {
        
    }
}