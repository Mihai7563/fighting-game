export class BarView {
    constructor(parentElem, maxValue, currentValue) {
        this.maxValue = maxValue;
        this.currentValue = currentValue === undefined ? maxValue : currentValue;

        this.parentElem = parentElem;
        this.barMaxValueSpan = null;
        this.barCurrentValueSpan = null;

        this.init();
    }

    init(){
        this.barFill = document.createElement('div');
        this.barFill.classList.add('bar-fill');
        this.parentElem.append(this.barFill);

        this.barCurrentValueSpan = document.createElement('span');
        this.barFill.append(this.barCurrentValueSpan);

        this.barFill.append(document.createTextNode(' / '));

        this.barMaxValueSpan = document.createElement('span');
        this.barMaxValueSpan.textContent = this.maxValue;
        this.barFill.append(this.barMaxValueSpan);

        this.updateCurrentValue(this.currentValue);
    }

    
    updateCurrentValue(newValue){
        this.currentValue = newValue;
        
        this.barCurrentValueSpan.textContent = this.currentValue;
        this.barFill.style.width = `${Math.round(this.currentValue / this.maxValue * 100)}%`;
    }
}