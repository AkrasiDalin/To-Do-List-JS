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
    ToDo.prototype.generateListItem = function (el) {
        return "<li>\n    <div id='".concat(el.id, "'>\n      <div class='item-body'>\n        <div class='title'>").concat(el.title, "</div>\n        <div class='expire'>").concat(el.date_expire, "</div>\n        <div class='description'>").concat(el.description, "</div>\n      </div>\n      <div class='item-options'>\n        <div class='edit'>ED</div>\n        <div class='remove'>REM</div>\n      </div>\n    </div>\n    </li>");
    };
    ToDo.prototype.render = function (id) {
        var _this = this;
        this.list.forEach(function (el) {
            if (id) {
                document.querySelector("#".concat(id)).innerHTML += _this.generateListItem(el);
            }
        });
    };
    return ToDo;
}());
var toDo = new ToDo();
[{ id: '1', title: 'ciao1', description: 'hello1', date_created: '1020/21', date_expire: '23/32/43' },
    { id: '2', title: 'ciao2', description: 'hello2', date_created: '1020/21', date_expire: '23/32/43' },
    { id: '3', title: 'ciao3', description: 'hello3', date_created: '1020/21', date_expire: '23/32/43' },
    { id: '4', title: 'ciao4', description: 'hello4', date_created: '1020/21', date_expire: '23/32/43' },
].forEach(function (item) { return toDo.addItem(item); });
// toDo.removeItem(2);
toDo.render('to-do-list');
// console.log(.push())
