interface ListItem {
  id: number,
  title: string,
  // description: string,
  // date_created: Date,
  // date_expire: Date,
}

class ToDo {
  private list: ListItem[] = [];

  getList() { return [...this.list]; }

  clearList() { this.list = []; }

  addItem(item: ListItem) {
    this.list.push(item);
    return this;
  }

  removeItem(itemID: number) {
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

  // render(id: string) {
  //     let listHTML = '';
  //     if()

  // }
}

const toDo = new ToDo();
[{ id: 1, title: 'ciao1' }, { id: 2, title: 'ciao2' }, { id: 3, title: 'ciao3' }].map((item) => toDo.addItem(item));
toDo.removeItem(2);
console.log(toDo.getList());

// console.log(.push())
