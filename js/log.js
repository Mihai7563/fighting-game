export default class Log {
    constructor(){
        this.items = [];
    }


    addItem(type, messages){
        if(typeof messages == 'string'){
            messages = [messages];
        }
        
        this.items.push({type, messages});
        this.dispatchLogEntryEvent();
    }


    dispatchLogEntryEvent(){
        const event = new CustomEvent("logEntry", {
            detail: {
              logItem: this.getLastItem(),
            },
          });

        window.dispatchEvent(event);
    }

    getLastItem(){
        return this.items[this.items.length - 1];
    }
}