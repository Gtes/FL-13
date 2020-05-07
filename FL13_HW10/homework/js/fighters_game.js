function Fighter(stats) {
    this.getName = () => stats.name
    this.getDamage = () => stats.damage
    this.getStrength = () => stats.strength
    this.getAgility = () => stats.agility
    this.getHealth = () => stats.hp

    let losses = 0
    let wins = 0

    this.currentHp = stats.hp

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max))
    }

    this.attack = function () {
        const MAX_AMOUTN_OF_STRENGTH_AND_AGILITY = 100;

        const chance = MAX_AMOUTN_OF_STRENGTH_AND_AGILITY - (this.getStrength() + this.getAgility())
        const randomNumber = getRandomInt(MAX_AMOUTN_OF_STRENGTH_AND_AGILITY)

        return randomNumber < chance
    }

    this.dealDamage = function (amount) {
        this.currentHp = this.currentHp - amount;
    }

    this.addWin = () => {
        wins = wins + 1;

        return wins;
    }

    this.addLoss = () => {
        losses = losses + 1;

        return losses
    }

    this.logCombatHistory = () => {
        return console.log(`Name: ${this.getName()}, wins: ${wins}, Losses: ${losses}`)
    }

    this.heal = (amount) => {
        if (amount >= stats.hp) {
            this.currentHp = this.getHealth;
        } else {
            this.currentHp += amount
        }
    }
}

const myFighter1 = new Fighter({
    name: 'Maximus',
    damage: 25,
    hp: 100,
    strength: 20,
    agility: 30
})

const myFighter2 = new Fighter({
    name: 'Valera',
    damage: 25,
    hp: 100,
    strength: 50,
    agility: 50
})

function battle(fighter1, fighter2) {
    const fighter1Attack = () => fighter1.dealDamage.call(fighter2, fighter1.getDamage())
    const fighter2Attack = () => fighter2.dealDamage.call(fighter1, fighter2.getDamage())

    while (fighter1.currentHp > 0 && fighter2.currentHp > 0) {
        console.log(`${fighter1.currentHp} vs ${fighter2.currentHp}`)

        if (fighter1.attack.call(fighter2)) {
            fighter1Attack()
            console.log(`${fighter1.getName()} makes ${fighter1.getDamage()} damage to ${fighter2.getName()}`)
        } else {
            console.log(`${fighter1.getName()} attack missed`)
        }

        if (fighter2.currentHp <= 0) {
            fighter2.currentHp = 0;
            fighter2.addLoss();
            fighter1.addWin()
            return console.log(`${fighter1.getName()} has won!`)
        }

        if (fighter2.attack.call(fighter1)) {
            fighter2Attack()
            console.log(`${fighter2.getName()} makes ${fighter2.getDamage()} damage to ${fighter1.getName()}`)
        } else {
            console.log(`${fighter2.getName()} attack missed`)
        }

        if (fighter1.currentHp <= 0) {
            fighter1.currentHp = 0;
            fighter1.addLoss();
            fighter2.addWin()
            return console.log(`${fighter2.getName()} has won!`)
        }
    }
}


console.log(battle(myFighter1, myFighter2))