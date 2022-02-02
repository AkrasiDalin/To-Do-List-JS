interface ListItem {
  id: string,
  title: string,
  description: string,
  date_created: string,
  date_expire: string,
}

class ToDo {
  private list: ListItem[] = [];

  private searchID:string = '';

  private toDoListID:string = '';

  private idCount:number = 0;

  constructor(searchID:string, toDoListID:string) {
    const searchObj = (<HTMLInputElement>document.getElementById(`${searchID}`));
    const toDoListhObj = (<HTMLInputElement>document.getElementById(`${toDoListID}`));
    const modal = (<HTMLInputElement>document.getElementById("popup-modal"));
    const overlay = (<HTMLInputElement>document.getElementById("overlay"));

    const btnAdd = (<HTMLInputElement>document.getElementById("add-btn"));

    const modalTitle = (<HTMLInputElement>document.getElementById("modal-title"));
    const modalDescription = (<HTMLInputElement>document.getElementById("modal-description"));
    const modalDate = (<HTMLInputElement>document.getElementById("modal-date"));

    const btnAccept = (<HTMLInputElement>document.getElementById("modal-accept"));
    const btnCancel = (<HTMLInputElement>document.getElementById("modal-cancel"));
    
    if (searchObj) {
      const toDo = this;
      searchObj.addEventListener('keyup', (el) => { toDo.processSearch(searchObj.value); });
    }
    // if (toDoListhObj) {
    //   const toDo = this;
    //   searchObj.addEventListener('keyup', (el) => { toDo.processSearch(searchObj.value); });
    // }
    if (btnAdd) {
      const toDo = this;
      btnAdd.addEventListener('click', (el) => { modal.classList.remove("hidden"); overlay.classList.remove("hidden"); });
    }
    if (btnAccept) {
      const toDo = this;
      btnAccept.addEventListener('click', (el) => { 
        modal.classList.add("hidden");
        overlay.classList.add("hidden");
        console.log(`TITLE:${modalTitle.value}, DESCR:${modalDescription.value}, DATE:${modalDate.value}, `);
        this.renderSingle({
          id: `${this.idCount}`, title: `${modalTitle.value}`, description: `${modalDescription.value}`, date_created: '1020/21', date_expire: `${modalDate.value}`,
        });
        this.idCount += 1;
      });
    }
    if (btnCancel) {
      const toDo = this;
      btnCancel.addEventListener('click', (el) => { modal.classList.add("hidden"); overlay.classList.add("hidden");});
    }
    this.searchID = searchID;
    this.toDoListID = toDoListID;
  }

  getList() { return [...this.list]; }

  clearList() { this.list = []; }

  addItem(item: ListItem) {
    this.list.push(item);
    return this;
  }

  removeItem(itemID: string) {
    const index = this.list.findIndex((x) => x.id === itemID);
    const removed = this.list.splice(index, 1);
    return removed;
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
    <div id='${el.id}' class='grid grid-cols-8 gap-4  p-3 shadow-md rounded-xl bg-white mb-1'>
      
      <div class='item-main col-span-7'>
        <div class='head grid grid-cols-4'>
          <h1 class='title text-lg text-gray-700 col-span-3'>${el.title}</h1>
          <div class='expire text-sm text-gray-400'>${el.date_expire}</div>
        </div>
        <p class='description text-xs text-gray-500 mt-4'>${el.description}</ps>
      </div>

      <div class='item-options bg-blue-200'>
        <div class='edit bg-green-100'>ED</div>
        <div class='remove bg-red-100'>REM</div>
      </div>

    </div>
    </li>`;
  }

  renderSingle(item:ListItem, toDoListID: string = this.toDoListID) {
    if (item) {
      document.querySelector(`#${toDoListID}`).innerHTML += this.generateListItem(item);
    };
  }

  renderAll(list:ListItem[] = this.list, toDoListID: string = this.toDoListID) {
    list.forEach((item: ListItem) => {
      this.renderSingle(item, toDoListID);
    });
  }

  processSearch = (title:string) => {
    const found:ListItem[] = [];
    console.log('search for:', title);
    if (title) {
      this.list.forEach((el: ListItem) => {
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

const toDo = new ToDo('search', 'to-do-list');

// toDo.removeItem(2);
toDo.renderAll();
// toDo.processSearch('ber');

// console.log(.push())
