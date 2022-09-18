import cache from "./cache.js";

export default class SelectedLanguage
{
    constructor($target, history)
    {
        this.$target = $target;
        this.history = history;
        this.render();
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
        this.render();
    }

    render()
    {
        if(this.$target.childNodes && this.$target.childNodes.length > 0) this.$target.childNodes[0].remove();
        if (this.history == [] || this.history == null) return;

        this.$target.appendChild(document.createElement("ul"));
        this.history.forEach((key) => {
            const node = document.createElement("li");
            node.appendChild(document.createTextNode(key));
            this.$target.childNodes[0].appendChild(node);
        });
    }
}