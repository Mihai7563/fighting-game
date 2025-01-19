import Log from "./log.js";

export class Duel {
    constructor(fighters) {
        this.displayLog = false;
        this.log = new Log();
        this.fighters = fighters;
        this.roundCounter = 0;
    }


    newRound(){
        if(!this.fighters[0].isAlive || !this.fighters[1].isAlive){
            console.error('One of the fighters collapsed. He requires medical interventions');
            return;
        }

        this.roundCounter++;
        this.log.addItem('New Round', `Round ${this.roundCounter} starts!`);
        
        
        if(this.displayLog){
            console.log(this.log.getLastItem());
        }
        
        const f1Initiative = this.fighters[0].initiative;
        const f2Initiative = this.fighters[1].initiative;

        if(f1Initiative == f2Initiative){
            this.log.addItem('Skip Round', `Both fighters feel awkward. Skip to the next round`);
            if(this.displayLog){
                console.log(this.log.getLastItem());
            }
            
            this.dispatchNewRoundEvent();
            return;   
        }
        
        const roundOrder = f1Initiative > f2Initiative ? [...this.fighters] : [...this.fighters].reverse();     
        
        this.log.addItem('Attack Phase', `${roundOrder[0].name} (${roundOrder[0].hp} hp, ${roundOrder[0].energy} energy) LAUNCHES AN ATTACK`);
        if(this.displayLog){
            console.log(this.log.getLastItem());
        }
        
        roundOrder[1].defend(roundOrder[0].attack);
        if(this.checkKO(roundOrder[1])){
            this.dispatchNewRoundEvent();
            return;
        };
        
        this.log.addItem('Counterattack Phase', `${roundOrder[1].name} (${roundOrder[1].hp} hp, ${roundOrder[1].energy} energy) LAUNCHES A COUNTERATTACK`);
        if(this.displayLog){
            console.log(this.log.getLastItem());
        }
        
        roundOrder[0].defend(roundOrder[1].attack);
        if(this.checkKO(roundOrder[0])){
            this.dispatchNewRoundEvent();
            return;
        };        
        
        this.log.addItem('Replenish Energy Phase', '🥤 FIGHTERS ARE MEDITATING...');
        if(this.displayLog){
            console.log(this.log.getLastItem());
        }
        
        roundOrder.forEach(fighter => {
            fighter.replenishEnergy();
        })
        
        this.log.addItem('Round End', '⌛ ROUND OVER');
        if(this.displayLog){
            console.log(this.log.getLastItem());
        }
        
        this.dispatchNewRoundEvent();
    }

    checkKO(fighter){
        const isKO = !fighter.isAlive;
        
        if(isKO){
            this.log.addItem('KO', `${fighter.name} is KO!!!☠️`);
            if(this.displayLog){
                console.log(this.log.getLastItem());
            }
        }
        
        return isKO;
    }


    dispatchNewRoundEvent(){
        const event = new CustomEvent("roundChange", {
            detail: {
                round: this.roundCounter,
                fighters: this.fighters 
            }
        });

        window.dispatchEvent(event);
    }
}