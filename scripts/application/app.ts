interface ListItem  {
    id: number,
    title: string,
    description: string,
    date_created: Date,
    date_expire: Date,
}

class ToDo {
    private list: ListItem[] = [];

    getList() {return [...this.list]}

    clearList() {this.list = []}

    addItem(item: ListItem) {
        this.list.push(item);
        return this
    }

    removeItem(item: ListItem) {
        let index = this.list.findIndex(x => x.id === item.id);
        this.list.splice(index, 1);
        return this
    }

    clearDOMList(id: string) {
        let domList = document.querySelector(`#${id}`);
        domList ? domList.innerHTML = '' : '';
        return this
    }

    // render(id: string) {
    //     let listHTML = '';
    //     if()

    // }
}


// let toDo = new ToDo();
// toDo.


// console.log(.push())