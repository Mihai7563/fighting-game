export default class Log {
    constructor(){
        this.items = [];
    }


    addItem(type, messages){
        this.items.push({type, messages});
    }


    getLastItem(){
        return this.items[this.items.length - 1];
    }
}