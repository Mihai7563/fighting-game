export class LogView {
    constructor(parentElement) {
        this.parentElement = parentElement;

        window.addEventListener("logEntry", (e) => this.createNewLogItem(e.detail));
    }


    createNewLogItem(logData){
        console.log(logData);

        if(logData.logItem.type == 'New Round' && this.parentElement.childNodes.length){
            const separator = document.createElement('div');
            separator.classList.add('my-3', 'border-top', 'border-3', 'border-dark');
            this.parentElement.append(separator);
        } 
        
        const logItemContainer = document.createElement('div');
        logItemContainer.classList.add('log-item');
        this.parentElement.append(logItemContainer);
        

        const logItemHeader = document.createElement('div');
        logItemHeader.classList.add('header', 'badge', 'bg-secondary');
        logItemHeader.textContent = logData.logItem.type;
        logItemContainer.append(logItemHeader);

        const logItemText = document.createElement('div');
        logItemText.classList.add('text', 'mb-2');
        logItemContainer.append(logItemText);
        logData.logItem.messages.forEach(msg => {
            const msgContainer = document.createElement('div');
            msgContainer.textContent = msg;
            logItemText.append(msgContainer);
        });
    }
}