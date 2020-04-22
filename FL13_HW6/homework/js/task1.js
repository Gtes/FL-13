'use strict'

function getMiddle(str) {
    if (isEmptyOrWhitespcesOrNull(str)) {
        return 'Invalid value';
    } 
    
    if (str.length % 2) {
        return str.substr(str.length / 2, 1);
    } else {
        return str.substr(str.length / 2 - 1, 2);
    }

}

function isEmptyOrWhitespcesOrNull(str) {
    if (str === null ||str === '' || !str.trim()) {
        return true
    } else {
        return false
    }
}

let userString = prompt('Gimme some word!');

alert(getMiddle(userString));