import api from "./api.js";
import cache from "./cache.js";

export default class Suggestion
{
    constructor($target, keyword, suggestionList, selected, selectedLanguage)
    {
        this.$target = $target;
        this.keyword = keyword;
        this.suggestionList = suggestionList;
        this.selected = selected;
        this.selectedLanguage = selectedLanguage;
        $target.addEventListener("click", e=>{
            let node = e.target;
            while(node != null)
            {
                if (node.nodeName == "LI") {this.click(node); break;}
                node = node.parentNode;
            }
        }); 
        this.render();
    }

    async keywordChange(keyword)
    {
        this.keyword = keyword;
        const searchResult = keyword ? await api.fetchKeyword(keyword) : {isError:true};
        this.suggestionList = searchResult.isError == false ? searchResult.data : null;
        this.selected = 0;

        cache.setInit("suggestionList", this.suggestionList);
        cache.setInit("selected", 0);

        this.render();
    }

    listenToKeyboard(key)
    {
        if (key == "Enter")
            this.submit();
        if (key == "ArrowUp" || key == "ArrowDown")
        {
            this.$target.querySelector(`ul > li:nth-child(${this.selected+1})`).classList.remove("Suggestion__item--selected");
            this.selected = key=="ArrowUp" ? (this.selected + this.suggestionList.length - 1) : this.selected + 1;
            this.selected = this.selected % this.suggestionList.length;
            this.$target.querySelector(`ul > li:nth-child(${this.selected+1})`).classList.add("Suggestion__item--selected");
        }
    }

    click(target)
    {
        this.selected = target.getAttribute('keyIdx');
        this.submit();
    }

    submit()
    {
        const newResult = this.suggestionList[this.selected];
        alert(newResult);
        this.selectedLanguage.update(newResult);
    }

    render()
    {
        if (this.$target.childNodes)
            this.$target.querySelector("ul").remove();

        if (this.suggestionList != null && this.suggestionList.length > 0)
        {
            this.$target.appendChild(document.createElement("ul"));
            const regexp = new RegExp(this.keyword, "gi");

            this.suggestionList.forEach((key, idx)=>{
                const node = document.createElement("li");
                node.setAttribute('keyIdx', idx);

                const matchedList = key.match(regexp);
                key.split(regexp).forEach((str, idx)=>{
                    node.appendChild(document.createTextNode(str));
                    if (matchedList && idx < matchedList.length)
                    {
                        const spanNode = document.createElement("span");
                        spanNode.classList.add("Suggestion__item--matched");
                        spanNode.appendChild(document.createTextNode(matchedList[idx]));
                        node.appendChild(spanNode);
                    }
                });

                if (idx == this.selected)
                    node.classList.add("Suggestion__item--selected");

                this.$target.querySelector("ul").appendChild(node);
            });
            this.$target.style.display = 'block';
        }
        else this.$target.style.display = 'none';
    }
}