var ListItem = /** @class */ (function () {
    function ListItem(id, title, description) {
        this.id;
        this.title;
        this.description;
    }
    ListItem.prototype.test = function () { console.log('ciao'); };
    return ListItem;
}());
var listItem = new ListItem(2, '', '');
listItem.test();
