import Log from "./log.js";

export class Fighter {
    constructor(name, hp, initiative, attack, defense, energy, energyReplenishmentRate) {
        this.displayLog = false;
        this.name = name;
        this.hp = hp;
        this.energy = energy;
        this.stats = { initiative, attack, defense, energyReplenishmentRate };
        this.log = new Log();

        this.log.addItem(`${this.name} creation`,
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

        this.log.addItem(`${this.name} initiative`, [
             `Initiative for ${this.name}: ${initiative}`
        ])

        if (this.displayLog) {
            console.log(this.log.getLastItem());
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

        this.log.addItem('Replenish energy', [
            `${this.name} recovers ${energyReplenished} energy. Current energy level is: ${this.energy}`
       ])

        if (this.displayLog) {
            console.log(this.log.getLastItem());
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

        this.log.addItem(`${this.name} defense`, [
            `${this.name} (${initialHp} hp) receives an attack of ${attackValue} hitpoints`,
            `${this.name}'s energy level is ${this.energy + randomDefense} and generates a defense of ${randomDefense}`,
            `${this.name} consumes ${consumedEnergy} energy`,
            `${this.name} defends ${defense}`,
            `${this.name} receives ${damage} damage`,
            `${this.name} new health: ${this.hp}. New energy: ${this.energy}`
       ]);

        if (this.displayLog) {
            console.log(this.log.getLastItem());
        }
    }


    get attack() {
        const initialEnergy = this.energy;
        const randomAttack = Math.floor(Math.random() * this.stats.attack + 1);
        const attack = Math.min(randomAttack, this.energy);

        this.energy -= attack;

        this.log.addItem(`${this.name} attack`, [
            `${this.name}'s energy level is ${initialEnergy} and generates an attack of ${randomAttack}`,
            `${this.name} attacks with ${attack} damage`,
            `${this.name}'s new energy level: ${this.energy}`,
       ]);

        if (this.displayLog) {
            console.log(this.log.getLastItem());
        }

        return attack;
    }


    get isAlive() {
        return this.hp > 0;
    }
}