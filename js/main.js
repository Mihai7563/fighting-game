import { Duel } from "./duel.js";
import { Fighter } from "./fighter.js";
import { LogView } from "./log-view.js";
import { GameStateView } from "./game-state-view.js";

const p1Properties = {
    name: 'George Calinescu',
    hp: 90,
    initiative: 10,
    attack: 13,
    defense: 5,
    maxEnergy: 10,
    energyReplenishmentRate: 9
}

const p2Properties = {
    name: 'Michael Eminescu',
    hp: 80,
    initiative: 7,
    attack: 18,
    defense: 8,
    maxEnergy: 15,
    energyReplenishmentRate: 7
}

const players = [
    new Fighter(...Object.values(p1Properties)),
    new Fighter(...Object.values(p2Properties))
]


const duel = new Duel(players);
document.querySelector('#new-round-btn').addEventListener('click', () => duel.newRound());


const logView = new LogView(document.querySelector('#log-container'));

const gameStateView = new GameStateView(document.querySelector('.players-container'), duel.fighters)