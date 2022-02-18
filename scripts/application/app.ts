import ListItem from './components/ListItem';

class ToDo {
  private list: ListItem[] = [
    {
      id: 'x',
      title: 'GETTING STARTED',
      description:
        'Click on the \'+\' button at the bottom of the screen to add a new item.',
      date_created: 'Date created',
      date_expire: 'Some day',
    },
  ];

  private searchID: string = '';

  private toDoListID: string = '';

  private idCount: number = 0;

  private searchObj: HTMLInputElement;

  private toDoListhObj: HTMLInputElement;

  private modal: HTMLInputElement;

  private overlay: HTMLInputElement;

  private btnAdd: HTMLInputElement;

  private modalTitle: HTMLInputElement;

  private modalDescription: HTMLInputElement;

  private modalDate: HTMLInputElement;

  private btnAccept: HTMLInputElement;

  private btnCancel: HTMLInputElement;

  private modalID: string;

  constructor(searchID: string, toDoListID: string, popUpModal: any) {
    this.searchObj = <HTMLInputElement>document.getElementById(`${searchID}`);
    this.toDoListhObj = <HTMLInputElement>(
      document.getElementById(`${toDoListID}`)
    );

    this.modal = <HTMLInputElement>(
      document.getElementById(`${popUpModal.modalID}`)
    );
    this.overlay = <HTMLInputElement>(
      document.getElementById(`${popUpModal.overlayID}`)
    );

    this.btnAdd = <HTMLInputElement>(
      document.getElementById(`${popUpModal.addBtnID}`)
    );

    this.modalID = popUpModal.modalID;
    this.modalTitle = <HTMLInputElement>(
      document.getElementById(`${popUpModal.modalTitleID}`)
    );
    this.modalDescription = <HTMLInputElement>(
      document.getElementById(`${popUpModal.modalDescriptionID}`)
    );
    this.modalDate = <HTMLInputElement>(
      document.getElementById(`${popUpModal.modalDateID}`)
    );

    this.btnAccept = <HTMLInputElement>(
      document.getElementById(`${popUpModal.modalAcceptID}`)
    );
    this.btnCancel = <HTMLInputElement>(
      document.getElementById(`${popUpModal.modalCancelID}`)
    );

    if (this.searchObj) {
      const toDo = this;
      this.searchObj.addEventListener('keyup', (el) => {
        toDo.processSearch(this.searchObj.value);
      });
    }
    // if (toDoListhObj) {
    //   const toDo = this;
    //   searchObj.addEventListener('keyup', (el) => { toDo.processSearch(searchObj.value); });
    // }
    if (this.btnAdd) {
      const toDo = this;
      this.btnAdd.addEventListener('click', (el) => {
        this.modal.classList.remove('hidden');
        this.overlay.classList.remove('hidden');
      });
    }
    if (this.btnAccept) {
      this.btnAccept.addEventListener('click', (el) => {
        this.modal.classList.add('hidden');
        this.overlay.classList.add('hidden');

        console.log(
          `TITLE:${this.modalTitle.value}, DESCR:${this.modalDescription.value}, DATE:${this.modalDate.value}, `
        );

        const item = {
          id: `${this.idCount}`,
          title: `${this.modalTitle.value.trim()}`,
          description: `${this.modalDescription.value.trim()}` || 'N/A',
          date_created: '10/04/2021',
          date_expire: `${this.modalDate.value}` || 'N/A',
        };

        if (item.title) {
          this.addItem(item);
          this.renderSingle(item);
        }

        this.clearForm();

        this.idCount += 1;
      });
    }
    if (this.btnCancel) {
      const toDo = this;
      this.btnCancel.addEventListener('click', (el) => {
        this.modal.classList.add('hidden');
        this.overlay.classList.add('hidden');
      });
    }
    this.searchID = searchID;
    this.toDoListID = toDoListID;
  }

  getList() {
    return [...this.list];
  }

  clearList() {
    this.list = [];
  }

  addItem(item: ListItem) {
    this.list.push(item);
    return this;
  }

  removeItem(itemID: string) {
    const index = this.list.findIndex((x) => x.id === itemID);
    const removed = this.list.splice(index, 1);
    this.renderAll();
    return removed;
  }

  clearForm(formID = `#${this.modalID} form`) {
    (<HTMLFormElement>document.querySelector(formID)).reset();
  }

  clearDOMList(id: string) {
    const domList = document.querySelector(`#${id}`);
    if (domList) {
      domList.innerHTML = '';
    }
    return this;
  }

  generateListItem(el: ListItem) {
    return `<li>
      <div id='${el.id}' class='grid grid-cols-8 gap-4 overflow-hidden shadow-md rounded-xl bg-white mb-1 w-96 h-24'>
        
        <div class='item-main col-span-7 p-3'>
          <div class='head grid grid-cols-4'>
            <h1 class='title text-lg text-gray-700 col-span-3'>${el.title}</h1>
            <div class='expire text-sm text-gray-400'>${el.date_expire}</div>
          </div>
          <p class='description text-xs text-gray-500 mt-4'>${el.description}</ps>
        </div>

        <div class='item-options'>
          <div class='edit flex justify-center items-center cursor-pointer'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M421.7 220.3L188.5 453.4L154.6 419.5L158.1 416H112C103.2 416 96 408.8 96 400V353.9L92.51 357.4C87.78 362.2 84.31 368 82.42 374.4L59.44 452.6L137.6 429.6C143.1 427.7 149.8 424.2 154.6 419.5L188.5 453.4C178.1 463.8 165.2 471.5 151.1 475.6L30.77 511C22.35 513.5 13.24 511.2 7.03 504.1C.8198 498.8-1.502 489.7 .976 481.2L36.37 360.9C40.53 346.8 48.16 333.9 58.57 323.5L291.7 90.34L421.7 220.3zM492.7 58.75C517.7 83.74 517.7 124.3 492.7 149.3L444.3 197.7L314.3 67.72L362.7 19.32C387.7-5.678 428.3-5.678 453.3 19.32L492.7 58.75z'/></svg></div>
          <div class='remove flex justify-center items-center cursor-pointer'><svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'><path d='M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z'/></svg></div>
        </div>

      </div>
    </li>`;
  }

  renderSingle(item: ListItem, toDoListID: string = this.toDoListID) {
    if (item) {
      document.querySelector(`#${toDoListID}`).innerHTML += this.generateListItem(item);
    }
  }

  renderAll(
    list: ListItem[] = this.list,
    toDoListID: string = this.toDoListID
  ) {
    list.forEach((item: ListItem) => {
      this.renderSingle(item, toDoListID);
    });
  }

  processSearch = (title: string) => {
    const found: ListItem[] = [];
    console.log('search for:', title, 'inside of:', this.list);
    if (title) {
      this.list.forEach((el: ListItem) => {
        console.log('testing-->', el.title.trim());
        if (el.title.trim().indexOf(title.trim()) !== -1) {
          console.log('found:', el.title);
          found.push(el);
        }
      });
      // if(found.length > 0) {

      // }
    }
    document.querySelector(`#${this.toDoListID}`).innerHTML = '';
    const render = found.length > 0 ? found : this.list;
    console.log('going to render:', render);
    this.renderAll(render);
  };
}

const toDo = new ToDo('search', 'to-do-list', {
  modalID: 'popup-modal',
  overlayID: 'overlay',
  addBtnID: 'add-btn',
  modalTitleID: 'modal-title',
  modalDescriptionID: 'modal-description',
  modalDateID: 'modal-date',
  modalAcceptID: 'modal-accept',
  modalCancelID: 'modal-cancel',
});

// toDo.removeItem(2);
toDo.renderAll();
// toDo.processSearch('ber');

// console.log(.push())
