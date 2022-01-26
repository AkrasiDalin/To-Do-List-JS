var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var ToDo = /** @class */ (function () {
    function ToDo() {
        this.list = [];
        // render(id: string) {
        //     let listHTML = '';
        //     if()
        // }
    }
    ToDo.prototype.getList = function () { return __spreadArray([], this.list, true); };
    ToDo.prototype.clearList = function () { this.list = []; };
    ToDo.prototype.addItem = function (item) {
        this.list.push(item);
        return this;
    };
    ToDo.prototype.removeItem = function (itemID) {
        var index = this.list.findIndex(function (x) { return x.id === itemID; });
        var removed = this.list.splice(index, 1);
        return removed;
    };
    ToDo.prototype.clearDOMList = function (id) {
        var domList = document.querySelector("#".concat(id));
        if (domList) {
            domList.innerHTML = '';
        }
        return this;
    };
    return ToDo;
}());
var toDo = new ToDo();
[{ id: 1, title: 'ciao1' }, { id: 2, title: 'ciao2' }, { id: 3, title: 'ciao3' }].map(function (item) { return toDo.addItem(item); });
toDo.removeItem(2);
console.log(toDo.getList());
// console.log(.push())
