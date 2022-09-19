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

        if (this.$target.childNodes == null || this.$target.childNodes[0].nodeName != "UL")
            this.$target.prepend(document.createElement("ul"));

        let recentlySearched = null;
        for (const key of this.$target.childNodes[0].childNodes)
        {
            if (key.textContent == newResult)
            {
                recentlySearched = key;
                break;
            }
        }

        if (recentlySearched)
            this.$target.childNodes[0].appendChild(recentlySearched);
        else
        {
            if (this.$target.childNodes[0].childNodes.length > 0)
                this.$target.childNodes[0].childNodes[0].remove();
            if (newResult)
            {
                const node = document.createElement("li");
                node.appendChild(document.createTextNode(newResult));
                this.$target.childNodes[0].appendChild(node);
            }
            else
                this.history.forEach((key) => {
                    const node = document.createElement("li");
                    node.appendChild(document.createTextNode(key));
                    this.$target.childNodes[0].appendChild(node);    
                });
        }
    }
}