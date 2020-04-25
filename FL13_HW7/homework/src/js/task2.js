const MAX_PRIZE = 100;

function isEmptyOrWhitespcesOrNull(str) {
    if (str === null || str === '' || !str.trim()) {
        return true
    } else {
        return false
    }
}


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}