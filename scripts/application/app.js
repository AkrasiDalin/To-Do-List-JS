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
        this.list = [
            {
                id: 'x',
                title: 'GETTING STARTED',
                description: 'Click on the \'+\' button at the bottom of the screen to add a new item.',
                date_created: 'Date created',
                date_expire: 'Some day'
            },
        ];
        this.searchID = '';
        this.toDoListID = '';
        this.idCount = 0;
        this.processSearch = function (title) {
            var found = [];
            console.log('search for:', title, 'inside of:', _this.list);
            if (title) {
                _this.list.forEach(function (el) {
                    console.log('testing-->', el.title.trim());
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
        this.searchObj = document.getElementById("".concat(searchID));
        this.toDoListhObj = (document.getElementById("".concat(toDoListID)));
        this.modal = (document.getElementById("".concat(popUpModal.modalID)));
        this.overlay = (document.getElementById("".concat(popUpModal.overlayID)));
        this.btnAdd = (document.getElementById("".concat(popUpModal.addBtnID)));
        this.modalID = popUpModal.modalID;
        this.modalTitle = (document.getElementById("".concat(popUpModal.modalTitleID)));
        this.modalDescription = (document.getElementById("".concat(popUpModal.modalDescriptionID)));
        this.modalDate = (document.getElementById("".concat(popUpModal.modalDateID)));
        this.btnAccept = (document.getElementById("".concat(popUpModal.modalAcceptID)));
        this.btnCancel = (document.getElementById("".concat(popUpModal.modalCancelID)));
        if (this.searchObj) {
            var toDo_1 = this;
            this.searchObj.addEventListener('keyup', function (el) {
                toDo_1.processSearch(_this.searchObj.value);
            });
        }
        // if (toDoListhObj) {
        //   const toDo = this;
        //   searchObj.addEventListener('keyup', (el) => { toDo.processSearch(searchObj.value); });
        // }
        if (this.btnAdd) {
            var toDo_2 = this;
            this.btnAdd.addEventListener('click', function (el) {
                _this.modal.classList.remove('hidden');
                _this.overlay.classList.remove('hidden');
            });
        }
        if (this.btnAccept) {
            this.btnAccept.addEventListener('click', function (el) {
                _this.modal.classList.add('hidden');
                _this.overlay.classList.add('hidden');
                console.log("TITLE:".concat(_this.modalTitle.value, ", DESCR:").concat(_this.modalDescription.value, ", DATE:").concat(_this.modalDate.value, ", "));
                var item = {
                    id: "".concat(_this.idCount),
                    title: "".concat(_this.modalTitle.value.trim()),
                    description: "".concat(_this.modalDescription.value.trim()) || 'N/A',
                    date_created: '10/04/2021',
                    date_expire: "".concat(_this.modalDate.value) || 'N/A'
                };
                if (item.title) {
                    _this.addItem(item);
                    _this.renderSingle(item);
                }
                _this.clearForm();
                _this.idCount += 1;
            });
        }
        if (this.btnCancel) {
            var toDo_3 = this;
            this.btnCancel.addEventListener('click', function (el) {
                _this.modal.classList.add('hidden');
                _this.overlay.classList.add('hidden');
            });
        }
        this.searchID = searchID;
        this.toDoListID = toDoListID;
    }
    ToDo.prototype.getList = function () {
        return __spreadArray([], this.list, true);
    };
    ToDo.prototype.clearList = function () {
        this.list = [];
    };
    ToDo.prototype.addItem = function (item) {
        this.list.push(item);
        return this;
    };
    ToDo.prototype.removeItem = function (itemID) {
        var index = this.list.findIndex(function (x) { return x.id === itemID; });
        var removed = this.list.splice(index, 1);
        this.renderAll();
        return removed;
    };
    ToDo.prototype.clearForm = function (formID) {
        if (formID === void 0) { formID = "#".concat(this.modalID, " form"); }
        document.querySelector(formID).reset();
    };
    ToDo.prototype.clearDOMList = function (id) {
        var domList = document.querySelector("#".concat(id));
        if (domList) {
            domList.innerHTML = '';
        }
        return this;
    };
    ToDo.prototype.generateListItem = function (el) {
        return "<li>\n      <div id='".concat(el.id, "' class='grid grid-cols-8 gap-4 overflow-hidden shadow-md rounded-xl bg-white mb-1 w-96 h-24'>\n        \n        <div class='item-main col-span-7 p-3'>\n          <div class='head grid grid-cols-4'>\n            <h1 class='title text-lg text-gray-700 col-span-3'>").concat(el.title, "</h1>\n            <div class='expire text-sm text-gray-400'>").concat(el.date_expire, "</div>\n          </div>\n          <p class='description text-xs text-gray-500 mt-4'>").concat(el.description, "</ps>\n        </div>\n\n        <div class='item-options'>\n          <div class='edit flex justify-center items-center cursor-pointer'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M421.7 220.3L188.5 453.4L154.6 419.5L158.1 416H112C103.2 416 96 408.8 96 400V353.9L92.51 357.4C87.78 362.2 84.31 368 82.42 374.4L59.44 452.6L137.6 429.6C143.1 427.7 149.8 424.2 154.6 419.5L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3zM492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75z'/></svg></div>\n          <div class='remove flex justify-center items-center cursor-pointer'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'><path d='M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z'/></svg></div>\n        </div>\n\n      </div>\n    </li>");
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
