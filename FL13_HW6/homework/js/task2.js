'use strict'
const MAX_TIP_PERCENTAGE = 100;
const DECIMALS_PRECISION = 2;


function isEmptyOrWhitespcesOrNull(str) {
    if (str === null || str === '' || !str.trim()) {
        return true
    } else {
        return false
    }
}

function getValidNumber(numberAnswer) {
    if (isNaN(numberAnswer) ||
        isEmptyOrWhitespcesOrNull(numberAnswer) ||
        numberAnswer < 0
    ) {
        return false

    } else {
        return true;
    }
}

function getPercentageNumber() {
    let tipPercentageAnswer = prompt('Input Tip Percentage');
    
    tipPercentageAnswer = tipPercentageAnswer.replace(/,/g, '.')

    if (!getValidNumber(tipPercentageAnswer) || tipPercentageAnswer >= MAX_TIP_PERCENTAGE) {
        alert('Please input positive number lower than 100!');
        return getPercentageNumber();
    } else {
        return tipPercentageAnswer;
    }
}

function getCheckNumber() {
    let checkNumberAnswer = prompt('Input Check Nuber');

    checkNumberAnswer = checkNumberAnswer.replace(/,/g, '.')

    if (!getValidNumber(checkNumberAnswer)) {
        alert('Please input positive number!')
        return getCheckNumber()
    } else {
        return checkNumberAnswer;
    }
}

function calculateFinalCheck(checkNumber, tipPercentage) {
    const tipAmount = checkNumber / MAX_TIP_PERCENTAGE * tipPercentage;

    const totalSum = Number(tipAmount) + Number(checkNumber);

    return {
        checkNumber,
        tipPercentage,
        tipAmount,
        'totalSum': round(totalSum, DECIMALS_PRECISION)
    }
}

function round(value, decimalsPrecision) {
    if (value % 1) {
        return Number(Math.round(value + 'e' + decimalsPrecision) + 'e-' + decimalsPrecision);
    } else {
        return value;
    }
}


const checkNumber = getCheckNumber();
const tipPercentage = getPercentageNumber();
const finalCheck = calculateFinalCheck(checkNumber, tipPercentage);


alert(`
Check number: ${finalCheck.checkNumber}
Tip: ${finalCheck.tipPercentage}
Tip amount: ${finalCheck.tipAmount}
Total sum to pay:  ${finalCheck.totalSum}`)