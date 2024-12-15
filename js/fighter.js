import Log from "./log.js";

export class Fighter {
    constructor(name, hp, initiative, attack, defense, energy, energyReplenishmentRate) {
        this.displayLog = true;
        this.name = name;
        this.hp = hp;
        this.energy = energy;
        this.stats = { initiative, attack, defense, energyReplenishmentRate };
        this.log = new Log();

        this.log.addItem('Create fighter',
            [
                `Player ${this.name} created`,
                this
            ]);

        if (this.displayLog) {
            console.log(this.log.getLastItem());
        }
    }

    get initiative() {
        const initiative = Math.floor(Math.random() * (this.stats.initiative + 1));
        if (this.displayLog) {
            console.log(`Initiative for ${this.name}: ${initiative}`);
        }

        return initiative;

    }


    replenishEnergy() {
        if (!this.isAlive) {
            console.error(`${this.name} has collapsed. May God forgive him`);
            return;
        }

        const energyReplenished = Math.floor(Math.random() * this.stats.energyReplenishmentRate + 1);
        this.energy += energyReplenished;
        if (this.displayLog) {
            console.log(`${this.name} recovers ${energyReplenished} energy. Current energy level is: ${this.energy}`);
        }
    }


    defend(attackValue) {
        const initialHp = this.hp;
        const randomDefense = Math.floor(Math.random() * (this.stats.defense + 1));
        const defense = Math.min(randomDefense, this.energy);
        const consumedEnergy = Math.min(this.energy, randomDefense);
        let damage = 0;

        this.energy -= consumedEnergy;

        if (attackValue > defense) {
            damage = Math.min(this.hp, attackValue - defense);
            this.hp -= damage;
        }

        if (this.displayLog) {
            console.log('------------------');
            console.log('DEFENSE LOG: ');

            console.log(`${this.name} (${initialHp} hp) receives an attack of ${attackValue} hitpoints`);
            console.log(`${this.name}'s energy level is ${this.energy + randomDefense} and generates a defense of ${randomDefense}`);

            console.log(`${this.name} consumes ${consumedEnergy} energy`);
            console.log(`${this.name} defends ${defense}`);
            console.log(`${this.name} receives ${damage} damage`);

            console.log(`${this.name} new health: ${this.hp}. New energy: ${this.energy}`);
        }
    }


    get attack() {
        const initialEnergy = this.energy;
        const randomAttack = Math.floor(Math.random() * this.stats.attack + 1);
        const attack = Math.min(randomAttack, this.energy);

        this.energy -= attack;


        if (this.displayLog) {
            console.log('------------------');
            console.log('ATTACK LOG: ');

            console.log(`${this.name}'s energy level is ${initialEnergy} and generates an attack of ${randomAttack}`);
            console.log(`${this.name} attacks with ${attack} damage`);
            console.log(`${this.name}'s new energy level: ${this.energy}`);
        }
        return attack;
    }


    get isAlive() {
        return this.hp > 0;
    }
}