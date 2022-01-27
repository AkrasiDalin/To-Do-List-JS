interface ListItem {
  id: string,
  title: string,
  description: string,
  date_created: string,
  date_expire: string,
}

class ToDo {
  private list: ListItem[] = [];

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
    <div id='${el.id}'>
      <div class='item-body'>
        <div class='title'>${el.title}</div>
        <div class='expire'>${el.date_expire}</div>
        <div class='description'>${el.description}</div>
      </div>
      <div class='item-options'>
        <div class='edit'>ED</div>
        <div class='remove'>REM</div>
      </div>
    </div>
    </li>`;
  }

  render(id: string) {
    this.list.forEach((el: ListItem) => {
      if (id) {
        document.querySelector(`#${id}`).innerHTML += this.generateListItem(el);
      }
    });
  }
}

const toDo = new ToDo();
[{ id: '1', title: 'ciao1', description: 'hello1', date_created: '1020/21', date_expire: '23/32/43' },
{ id: '2', title: 'ciao2', description: 'hello2', date_created: '1020/21', date_expire: '23/32/43' },
{ id: '3', title: 'ciao3', description: 'hello3', date_created: '1020/21', date_expire: '23/32/43' },
{ id: '4', title: 'ciao4', description: 'hello4', date_created: '1020/21', date_expire: '23/32/43' },
].forEach((item) => toDo.addItem(item));
// toDo.removeItem(2);
toDo.render('to-do-list');

// console.log(.push())
