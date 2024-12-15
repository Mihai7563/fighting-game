export class Duel {
    constructor(fighters) {
        this.fighters = fighters;
        console.log(this);
        this.roundCounter = 0;
    }


    newRound(){
        if(!this.fighters[0].isAlive || !this.fighters[1].isAlive){
            console.error('One of the fighters collapsed. He requires medical interventions');
            return;
        }

        this.roundCounter++;
        console.log('');
        console.log('🥊🍿 🍿🥊 🥊🍿 🍿🥊 🥊🍿 🍿🥊');
        console.log(`Round ${this.roundCounter} starts!`);
        
        const f1Initiative = this.fighters[0].initiative;
        const f2Initiative = this.fighters[1].initiative;

        if(f1Initiative == f2Initiative){
            console.log(`Both fighters feel awkward. Skip to the next round`);
            return;   
        }

        const roundOrder = f1Initiative > f2Initiative ? [...this.fighters] : [...this.fighters].reverse();     
    
        console.log('');
        console.log(`⚔️ ${roundOrder[0].name} (${roundOrder[0].hp} hp, ${roundOrder[0].energy} energy) LAUNCHES AN ATTACK`);
        roundOrder[1].defend(roundOrder[0].attack);
        if(this.checkKO(roundOrder[1])){
            return;
        };
        
        console.log('');
        console.log(`⚔️ ${roundOrder[1].name} (${roundOrder[1].hp} hp, ${roundOrder[1].energy} energy) LAUNCHES A COUNTERATTACK`);
        roundOrder[0].defend(roundOrder[1].attack);
        if(this.checkKO(roundOrder[0])){
            return;
        };
        
        console.log('');
        console.log('🥤 ROUND OVER - FIGHTERS ARE MEDITATING...');
        roundOrder.forEach(fighter => {
            fighter.replenishEnergy();
        })
        
        
    }

    checkKO(fighter){
        !fighter.isAlive && console.log(`${fighter.name} is KO!!!☠️`); 
        return !fighter.isAlive;
    }
}