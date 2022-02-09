"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var ToDo = /** @class */ (function () {
    function ToDo(searchID, toDoListID, popUpModal) {
        var _this = this;
        this.list = [{
                id: 'x',
                title: 'GETTING STARTED',
                description: 'Click on the "+" button at the bottom of the screen to add a new item.',
                date_created: 'Date created',
                date_expire: 'Some day'
            }];
        this.searchID = '';
        this.toDoListID = '';
        this.idCount = 0;
        this.processSearch = function (title) {
            var found = [];
            console.log('search for:', title);
            if (title) {
                _this.list.forEach(function (el) {
                    if (el.title.trim().indexOf(title.trim()) !== -1) {
                        console.log('found:', el.title);
                        found.push(el);
                    }
                });
                // if(found.length > 0) {
                // }
            }
            document.querySelector("#".concat(_this.toDoListID)).innerHTML = '';
            var render = found.length > 0 ? found : _this.list;
            console.log('going to render:', render);
            _this.renderAll(render);
        };
        var searchObj = document.getElementById("".concat(searchID));
        var toDoListhObj = document.getElementById("".concat(toDoListID));
        var modal = document.getElementById("".concat(popUpModal.modalID));
        var overlay = document.getElementById("".concat(popUpModal.overlayID));
        var btnAdd = document.getElementById("".concat(popUpModal.addBtnID));
        var modalTitle = document.getElementById("".concat(popUpModal.modalTitleID));
        var modalDescription = document.getElementById("".concat(popUpModal.modalDescriptionID));
        var modalDate = document.getElementById("".concat(popUpModal.modalDateID));
        var btnAccept = document.getElementById("".concat(popUpModal.modalAcceptID));
        var btnCancel = document.getElementById("".concat(popUpModal.modalCancelID));
        if (searchObj) {
            var toDo_1 = this;
            searchObj.addEventListener('keyup', function (el) { toDo_1.processSearch(searchObj.value); });
        }
        // if (toDoListhObj) {
        //   const toDo = this;
        //   searchObj.addEventListener('keyup', (el) => { toDo.processSearch(searchObj.value); });
        // }
        if (btnAdd) {
            var toDo_2 = this;
            btnAdd.addEventListener('click', function (el) { modal.classList.remove('hidden'); overlay.classList.remove('hidden'); });
        }
        if (btnAccept) {
            btnAccept.addEventListener('click', function (el) {
                modal.classList.add('hidden');
                overlay.classList.add('hidden');
                console.log("TITLE:".concat(modalTitle.value, ", DESCR:").concat(modalDescription.value, ", DATE:").concat(modalDate.value, ", "));
                _this.renderSingle({
                    id: "".concat(_this.idCount), title: "".concat(modalTitle.value), description: "".concat(modalDescription.value), date_created: '1020/21', date_expire: "".concat(modalDate.value)
                });
                _this.idCount += 1;
            });
        }
        if (btnCancel) {
            var toDo_3 = this;
            btnCancel.addEventListener('click', function (el) { modal.classList.add('hidden'); overlay.classList.add('hidden'); });
        }
        this.searchID = searchID;
        this.toDoListID = toDoListID;
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
        return "<li>\n    <div id='".concat(el.id, "' class='grid grid-cols-8 gap-4  p-3 shadow-md rounded-xl bg-white mb-1'>\n      \n      <div class='item-main col-span-7'>\n        <div class='head grid grid-cols-4'>\n          <h1 class='title text-lg text-gray-700 col-span-3'>").concat(el.title, "</h1>\n          <div class='expire text-sm text-gray-400'>").concat(el.date_expire, "</div>\n        </div>\n        <p class='description text-xs text-gray-500 mt-4'>").concat(el.description, "</ps>\n      </div>\n\n      <div class='item-options bg-blue-200'>\n        <div class='edit bg-green-100'>ED</div>\n        <div class='remove bg-red-100'>REM</div>\n      </div>\n\n    </div>\n    </li>");
    };
    ToDo.prototype.renderSingle = function (item, toDoListID) {
        if (toDoListID === void 0) { toDoListID = this.toDoListID; }
        if (item) {
            document.querySelector("#".concat(toDoListID)).innerHTML += this.generateListItem(item);
        }
    };
    ToDo.prototype.renderAll = function (list, toDoListID) {
        var _this = this;
        if (list === void 0) { list = this.list; }
        if (toDoListID === void 0) { toDoListID = this.toDoListID; }
        list.forEach(function (item) {
            _this.renderSingle(item, toDoListID);
        });
    };
    return ToDo;
}());
var toDo = new ToDo('search', 'to-do-list', {
    modalID: 'popup-modal',
    overlayID: 'overlay',
    addBtnID: 'add-btn',
    modalTitleID: 'modal-title',
    modalDescriptionID: 'modal-description',
    modalDateID: 'modal-date',
    modalAcceptID: 'modal-accept',
    modalCancelID: 'modal-cancel'
});
// toDo.removeItem(2);
toDo.renderAll();
// toDo.processSearch('ber');
// console.log(.push())
