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

        let removedChild = null;
        for (key of this.$target.childNodes[0].childNodes)
        {
            if (key.textContent == newResult)
            {
                removedChild = this.$target.childNodes[0].removeChild(key);
                break;
            }
        }

        if (removedChild)
            this.$target.childNodes[0].appendChild(removedChild);
        else
        {
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