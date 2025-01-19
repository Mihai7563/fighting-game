import { BarView } from "./bar-view.js";

export class GameStateView {
    constructor(parentElem, fighters) {
        this.parentElem = parentElem;
        this.roundContainer = parentElem.querySelector('#round-counter');
        this.fighter1HpBar = new BarView(parentElem.querySelector('#player1 .health-bar'), fighters[0].hp);
        this.fighter1EnergyBar = new BarView(parentElem.querySelector('#player1 .energy-bar'), fighters[0].energy);
        this.fighter2HpBar = new BarView(parentElem.querySelector('#player2 .health-bar'), fighters[1].hp);
        this.fighter2EnergyBar = new BarView(parentElem.querySelector('#player2 .energy-bar'), fighters[1].energy);

        window.addEventListener('roundChange', (e) => {
            console.log(e.detail);
            this.updateRoundCounter(e.detail.round)
            this.updateBars(e.detail.fighters)
        }); 
    }

    updateRoundCounter(round){
        this.roundContainer.textContent = round;
    }

    updateBars(fighters){
        this.fighter1HpBar.updateCurrentValue(fighters[0].hp);
        this.fighter1EnergyBar.updateCurrentValue(fighters[0].energy);
        this.fighter2HpBar.updateCurrentValue(fighters[1].hp);
        this.fighter2EnergyBar.updateCurrentValue(fighters[1].energy);
    }
}