function isEmptyOrWhitespcesOrNull(str) {
    if (str === null || str === '' || !str.trim()) {
        return true
    } else {
        return false
    }
}


function getRandom(min = 0, max = 5) {
    console.log(`
    min = ${min} 
    max = ${max}`)

    let number = Math.floor(Math.random() * (max - min + 1)) + min
    console.log(number)
    return number;
}

function getAnswer(minNumber = 0, maxNumber = 5, attemptsLeft, totalPrize, posiblePrize = 100) {
    const userAnswer = prompt(`Choose a roulette pocket number from ${minNumber} to ${maxNumber}
    Attempts left: ${attemptsLeft}
    Total prize: ${totalPrize}$
    Possible prize on current attempt: ${posiblePrize}$ `);

    return userAnswer;
}

function startGame() {
    if (confirm(`Do you want to play a game?`)) {
        return game();
    } else {
        return alert(`You did not become a billionaire, but can.`)
    }

}

const MAX_NUMBER_OF_ATTEMPTS = 3;

const NUMBER_RANGE = {
    min: 0,
    max: 5
}

const MAX_PRIZE = 100;

function game(gameNumber = 1, attemptsLeft = MAX_NUMBER_OF_ATTEMPTS, maxPrize = MAX_PRIZE, pastPrize = 0) {

    let currentPrize = pastPrize;
    let curetntPosiblePrize = maxPrize;

    console.log(`maxPrize = ${maxPrize}`)

    const randomNumber = getRandom(NUMBER_RANGE.min * gameNumber, NUMBER_RANGE.max * gameNumber);

    if (!attemptsLeft) {
        currentPrize = 0;
        alert(`Thank you for your participation. Your prize is: ${currentPrize + pastPrize} $`)

        confirm(`Do you want to restart?`) ? game() : false;

    } else {
        let userAnswer = getAnswer(NUMBER_RANGE.min * gameNumber, 
            NUMBER_RANGE.max * gameNumber, 
            attemptsLeft, 
            pastPrize, 
            curetntPosiblePrize);

        if (parseInt(userAnswer) === randomNumber) {
            let lastPrize = curetntPosiblePrize;

            let finalPrize = currentPrize + lastPrize;

            console.log(`lastPrize = ${lastPrize}`)

            if (confirm(`Congratulation, you won!   Your prize is: ${finalPrize} $. Do you want to continue?`)){
                game(gameNumber + 1, MAX_NUMBER_OF_ATTEMPTS, MAX_PRIZE * gameNumber, currentPrize + lastPrize);
            } else{
                alert(`Thank you for your participation. Your prize is: ${finalPrize}$`)
            }

        } else {
            game(gameNumber, attemptsLeft - 1, curetntPosiblePrize / 2, currentPrize)
        }
    }

}

startGame();