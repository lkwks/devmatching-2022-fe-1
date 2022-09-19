import cache from "./cache.js";

export default class SelectedLanguage
{
    constructor($target, history)
    {
        this.$target = $target;
        this.history = history;
        this.render(null);
    }

    update(newResult)
    {
        let newHistory = [];
        if (this.history)
            this.history.forEach((key, idx)=>
            {
                if (key != newResult && ((idx > 0 && this.history.length == 5)||this.history.length < 5))
                    newHistory.push(key);
            });
        newHistory.push(newResult);
        this.history = newHistory;
        cache.setInit("history", this.history);
        this.render(newResult);
    }

    render(newResult)
    {
        if (this.history == [] || this.history == null) return;

        if (this.$target.childNodes == null || this.$target.querySelectorAll("ul").length == 0)
            this.$target.prepend(document.createElement("ul"));

        const ulNode = this.$target.querySelector("ul");
        let recentlySearched = false;
        for (const node of ulNode.childNodes)
        {
            if (node.textContent == newResult)
            {
                ulNode.appendChild(node);
                recentlySearched = true;
                break;
            }
        }

        if (!recentlySearched)
        {
            if (ulNode.childNodes.length > 0)
                ulNode.childNodes[0].remove();
            if (newResult)
            {
                const node = document.createElement("li");
                node.appendChild(document.createTextNode(newResult));
                ulNode.appendChild(node);
            }
            else
                this.history.forEach((key) => {
                    const node = document.createElement("li");
                    node.appendChild(document.createTextNode(key));
                    ulNode.appendChild(node);    
                });
        }
    }
}