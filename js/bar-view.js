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

        const barTextContainer = document.createElement('div');
        barTextContainer.classList.add('bar-text-container', 'px-2');
        this.barFill.append(barTextContainer);

        this.barCurrentValueSpan = document.createElement('span');
        barTextContainer.append(this.barCurrentValueSpan);

        barTextContainer.append(document.createTextNode(' / '));

        this.barMaxValueSpan = document.createElement('span');
        this.barMaxValueSpan.textContent = this.maxValue;
        barTextContainer.append(this.barMaxValueSpan);

        this.updateCurrentValue(this.currentValue);
    }

    
    updateCurrentValue(newValue){
        this.currentValue = newValue;
        
        this.barCurrentValueSpan.textContent = this.currentValue;
        this.barFill.style.width = `${Math.round(this.currentValue / this.maxValue * 100)}%`;
    }
}